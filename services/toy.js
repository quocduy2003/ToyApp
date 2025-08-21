import { supabase } from '../config/supabase';

// get all toys
export const getToys = async () => {
  const { data, error } = await supabase.from('products').select('*');
  if (error) throw error;
  return data;

};

// get toy by id
export const getToyById = async (id) => {
  const { data, error } = await supabase.from('toys').select('*').eq('id', id).single();
  if (error) throw error;
  return data;
};

export const fetchProducts = async () => {
  const { data, error } = await supabase.from("products").select("*");
  if (error) throw error;
  return data;
};

// lấy sản phẩm theo id
export const fetchProductById = async (id) => {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();
  if (error) throw error;
  return data;
};



export const searchToys = async (keyword) => {
  const trimmedKeyword = keyword.trim().toLowerCase();
  if (!trimmedKeyword) {
    return [];
  }

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .or(`name.ilike.*${trimmedKeyword}*`)
    .limit(8);

  if (error) {
    console.error('Error searching toys:', error);
    throw error;
  }
  // console.log('searchToys results:', data);
  return data;
};
