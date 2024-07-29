import { Router } from "express";
import {
  getUserProfile,
  signInController,
  signupController,
} from "../../controller/user.cotroller.js";

const router = Router();

router.post("/register", signupController);
router.post("/signin", signInController);
router.get("/user/profile", getUserProfile);
export default router;
