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
