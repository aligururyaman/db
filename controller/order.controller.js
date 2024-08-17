import Order from "../models/order.model.js";
import User from "../models/user.model.js";

// Sipariş oluşturma
export const createOrder = async (req, res) => {
  const { userId, number, address, cartItems, totalAmount } = req.body;

  try {
    const newOrder = new Order({
      user: userId,
      number,
      address,
      cartItems,
      totalAmount,
    });

    await newOrder.save();

    res
      .status(201)
      .json({ message: "Order created successfully", order: newOrder });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Tüm siparişleri getirme
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user")
      .populate("cartItems.product");
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
