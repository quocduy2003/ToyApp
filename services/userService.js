import { supabase } from '../config/supabase';

// Kiểm tra xem user đã tồn tạ// Cập nhật thông tin user
// import { supabase } from '../config/supabase';

// Kiểm tra xem user đã tồn tại trong bảng users chưa (theo ID)
export const checkUserExists = async (userId) => {
    try {
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('id', userId)
            .single();

        if (error && error.code !== 'PGRST116') {
            throw error;
        }

        return data;
    } catch (error) {
        console.error('Error checking user existence:', error);
        return null;
    }
};

// Kiểm tra xem user đã tồn tại trong bảng users chưa (theo email)
export const checkUserExistsByEmail = async (email) => {
    try {
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('email', email)
            .single();

        if (error && error.code !== 'PGRST116') {
            throw error;
        }

        return data;
    } catch (error) {
        console.error('Error checking user existence by email:', error);
        return null;
    }
};

// Thêm user mới vào bảng users
export const createUser = async (userData) => {
    try {
        const { data, error } = await supabase
            .from('users')
            .insert([userData])
            .select()
            .single();

        if (error) throw error;

        return data;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};

// Lấy thông tin user theo ID
export const getUserById = async (userId) => {
    try {
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('id', userId)
            .single();

        if (error) throw error;

        return data;
    } catch (error) {
        console.error('Error getting user by ID:', error);
        throw error;
    }
};

// Cập nhật thông tin user
export const updateUser = async (userId, updateData) => {
    try {
        const { data, error } = await supabase
            .from('users')
            .update(updateData)
            .eq('id', userId)
            .select()
            .single();

        if (error) throw error;

        return data;
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
};

// Kiểm tra và tạo user nếu chưa tồn tại
export const ensureUserExists = async (authUser) => {
    try {
        console.log('=== ensureUserExists called ===');
        console.log('authUser:', { id: authUser.id, email: authUser.email });

        // Trước tiên kiểm tra theo ID (auth user ID)
        let existingUser = await checkUserExists(authUser.id);
        console.log('existingUser by ID:', existingUser);

        if (existingUser) {
            return existingUser;
        }

        // Nếu không tìm thấy theo ID, kiểm tra theo email
        existingUser = await checkUserExistsByEmail(authUser.email);
        console.log('existingUser by email:', existingUser);

        if (existingUser) {
            // Nếu tìm thấy user với email này nhưng ID khác, 
            // cập nhật ID để đồng bộ với auth
            console.log('Updating existing user with new auth ID');
            const updatedUser = await supabase
                .from('users')
                .update({ 
                    id: authUser.id, 
                    updated_at: new Date().toISOString() 
                })
                .eq('email', authUser.email)
                .select()
                .single();

            if (updatedUser.error) {
                console.error('Error updating user ID:', updatedUser.error);
                return existingUser; // Trả về user cũ nếu không update được
            }

            return updatedUser.data;
        }

        // Nếu hoàn toàn chưa tồn tại, tạo user mới
        console.log('Creating new user');
        const newUserData = {
            id: authUser.id,
            email: authUser.email,
            full_name: authUser.user_metadata?.full_name || authUser.email.split('@')[0],
            phone: authUser.user_metadata?.phone || '',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        };

        existingUser = await createUser(newUserData);
        console.log('Created new user:', existingUser);
        return existingUser;

    } catch (error) {
        console.error('Error ensuring user exists:', error);
        
        // Nếu vẫn lỗi duplicate key, thử lấy user existing
        if (error.message && error.message.includes('duplicate key')) {
            console.log('Handling duplicate key error, trying to fetch existing user');
            try {
                const existingUser = await checkUserExistsByEmail(authUser.email);
                if (existingUser) {
                    console.log('Found existing user by email:', existingUser);
                    return existingUser;
                }
            } catch (fallbackError) {
                console.error('Fallback error:', fallbackError);
            }
        }
        
        throw error;
    }
};
