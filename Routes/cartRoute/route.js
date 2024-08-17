import express from "express";
import {
  addToCart,
  deleteCartItem,
  fetchCart,
  updateCart,
  deleteAllCartsByUserId,
} from "../../controller/cart.controller.js";

const router = express.Router();

router.get("/carts/user/:userId", fetchCart);
router.post("/carts", addToCart);
router.put("/carts", updateCart);
router.delete("/carts/user/:userId/item/:itemId", deleteCartItem);
router.delete("/carts/user/:userId", deleteAllCartsByUserId);

export default router;
