import User from "../models/user.model.js";

export const verifyAdmin = async (req, res, next) => {
  try {
    const userId = req.headers.userid; // Header'dan userId alıyoruz
    if (!userId) {
      return res.status(403).json({ message: "No user ID provided" });
    }
    const user = await User.findById(userId);

    req.user = user; // User bilgisini req objesine ekliyoruz
    next();
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
