import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import { configDotenv } from "dotenv";
import categories from "./Routes/categoriesRoute/route.js";
import others from "./Routes/otherRoute/route.js";
import products from "./Routes/productsRoute/route.js";
import users from "./Routes/userRoute/route.js";
import carts from "./Routes/cartRoute/route.js";
import cloudinary from "cloudinary";

const app = express();

configDotenv();
const PORT = process.env.PORT || 2000;
const MONGODBURI = process.env.MONGODB_URI;

app.use(bodyParser.json());

app.use(cors());

//cloudinary Bağlantısı

cloudinary.config({
  cloud_name: `${process.env.CLOUDINARY_NAME}`,
  api_key: `${process.env.CLOUDINARY_KEY}`,
  api_secret: `${process.env.CLOUDINARY_SECRET}`,
});

// Mongo DB bağlantısı

mongoose
  .connect(MONGODBURI)
  .then(() => {
    console.log("Database Bağlantısı Başarılı");
    app.listen(PORT, () => {
      console.log(`Server Şu An ${PORT} Portunda çalışıyor`);
    });
  })
  .catch((error) => console.log(error));

// apiler

app.use("/api", categories);
app.use("/api", others);
app.use("/api", products);
app.use("/api", users);
app.use("/api", carts);
