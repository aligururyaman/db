import express from "express";
import { createOrder, getOrders } from "../../controller/order.controller.js";

const router = express.Router();

router.post("/order", createOrder);
router.get("/orders", getOrders);

export default router;
