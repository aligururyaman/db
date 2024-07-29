import { Router } from "express";
const router = Router();
import {
  addToCart,
  deleteCartItem,
  fetchCart,
  updateCart,
} from "../../controller/cart.controller.js";

router.get("/carts/user/:userId", fetchCart);
router.post("/carts", addToCart);
router.put("/carts", updateCart);
router.delete("/carts/user/:userId/item/:itemId", deleteCartItem);

export default router;
