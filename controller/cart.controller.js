import mongoose from "mongoose";
import Cart from "../models/cart.model.js";

export const fetchCart = async (req, res) => {
  const { userId } = req.params;
  try {
    const cart = await Cart.findOne({ user: userId }).populate("items.product");
    if (!cart) return res.status(404).json({ message: "Cart not found" });
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addToCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;

  console.log("addToCart called with:", { userId, productId, quantity });

  if (!userId || !productId || !quantity) {
    return res
      .status(400)
      .json({ error: "User ID, Product ID and quantity are required" });
  }

  try {
    const objectIdProductId = new mongoose.Types.ObjectId(productId);

    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    const cartItem = cart.items.find(
      (item) => item.product.toString() === objectIdProductId.toString()
    );
    if (cartItem) {
      cartItem.quantity += quantity;
    } else {
      cart.items.push({ product: objectIdProductId, quantity });
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ error: error.message });
  }
};

export const getAllCartsByUserId = async (req, res) => {
  const userId = req.userId;

  try {
    const cart = await Cart.findOne({ user: userId }).populate("items.product");
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateCart = async (req, res) => {
  const { id } = req.params;
  const { items } = req.body;

  try {
    const cart = await Cart.findByIdAndUpdate(
      id,
      { items },
      { new: true }
    ).populate("items.product");
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteCartItem = async (req, res) => {
  const { userId, itemId } = req.params;

  try {
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item._id.toString() === itemId
    );

    if (itemIndex === -1) {
      return res.status(404).json({ error: "Item not found in cart" });
    }

    cart.items.splice(itemIndex, 1);
    await cart.save();

    res.status(200).json({ message: "Item removed from cart successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Kullanıcıya ait tüm sepetleri silme
export const deleteAllCartsByUserId = async (req, res) => {
  const { userId } = req.params;

  try {
    await Cart.deleteMany({ user: userId });
    res.status(200).json({ message: "All carts deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
