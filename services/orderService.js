import { supabase } from "../config/supabase";

export const placeOrder = async (orderData, cartItems) => {
  try {
    // 1. Tạo đơn hàng
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert([
        {
          user_id: orderData.user_id,
          total_amount: orderData.total_amount,
          status: "pending", // mặc định chờ xử lý
          order_date: new Date(),
        },
      ])
      .select()
      .single();

    if (orderError) throw orderError;

    const orderId = order.order_id;

    // 2. Thêm các sản phẩm vào order_items
    const orderItems = cartItems.map((item) => ({
      order_id: orderId,
      product_id: item.id,
      quantity: item.quantity,
      price: item.price,
    }));

    const { error: orderItemsError } = await supabase
      .from("order_items")
      .insert(orderItems);

    if (orderItemsError) throw orderItemsError;

    // 3. Tạo record trong payments
    const { error: paymentError } = await supabase
      .from("payments")
      .insert([
        {
          order_id: orderId,
          status: "unpaid", // hoặc "paid" nếu thanh toán ngay
          payment_date: new Date(),
        },
      ]);

    if (paymentError) throw paymentError;

    return { success: true, orderId };
  } catch (error) {
    console.error("Lỗi khi tạo đơn hàng:", error);
    return { success: false, error };
  }
};
