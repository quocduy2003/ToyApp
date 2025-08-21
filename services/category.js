import { supabase } from "../config/supabase"; // chỗ bạn config supabase

export const getCategories = async () => {
  try {
    const { data, error } = await supabase.from("categories").select("*");
    if (error) throw error;
    return data;
  } catch (err) {
    console.error("Lỗi fetch categories:", err.message);
    throw err;
  }
};


export const getNewestToys = async () => {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false }) // sắp xếp mới nhất
    .limit(6); // lấy 6 sản phẩm

  if (error) {
    console.error("Lỗi fetch sản phẩm:", error.message);
    throw error;
  }
  return data;
};

// 🟡 Lấy sản phẩm nổi bật theo id 1,2,3,4,5,6
export const fetchFeaturedProducts = async () => {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .in("id", [1, 2, 3, 4, 5, 6]); // lọc theo danh sách id

  if (error) throw error;
  return data;
};

// 📌 Lấy 5 sản phẩm bán chạy + chi tiết từ bảng products
export const getBestSellerProducts = async () => {
  // Lấy dữ liệu order_items
  const { data, error } = await supabase
    .from("order_items")
    .select("product_id, quantity");

  if (error) {
    console.error("Error fetching order_items:", error.message);
    throw error;
  }

  // Gom nhóm theo product_id và tính tổng quantity
  const aggregated = data.reduce((acc, item) => {
    const { product_id, quantity } = item;
    if (!acc[product_id]) {
      acc[product_id] = 0;
    }
    acc[product_id] += quantity;
    return acc;
  }, {});

  // Sắp xếp và lấy top 5
  const sorted = Object.entries(aggregated)
    .map(([product_id, totalQuantity]) => ({
      product_id,
      totalQuantity,
    }))
    .sort((a, b) => b.totalQuantity - a.totalQuantity)
    .slice(0, 5);

  // 📌 Lấy chi tiết từ bảng products theo product_id
  const { data: products, error: productError } = await supabase
    .from("products")
    .select("id, name, price, image")
    .in(
      "id",
      sorted.map((item) => item.product_id)
    );

  if (productError) {
    console.error("Error fetching products:", productError.message);
    throw productError;
  }

  // Merge quantity vào product
  const merged = sorted.map((item) => {
    const product = products.find((p) => p.id === parseInt(item.product_id));
    return {
      ...product,
      totalQuantity: item.totalQuantity,
    };
  });

  return merged;
};