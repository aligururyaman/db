import express from "express";
import {
  createOther,
  deleteOtherById,
  getAllOther,
  updateOtherById,
} from "../../controller/other.controller.js";

const router = express.Router();

router.post("/others", createOther);
router.get("/others", getAllOther);
router.put("/others/:id", updateOtherById);
router.delete("/others/:id", deleteOtherById);
export default router;
