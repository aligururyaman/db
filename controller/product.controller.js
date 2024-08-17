// Import necessary modules
import Product from "../models/product.models.js";
import uploadImageToCloudinary from "../utils/fileUpload.js";
import toSlug from "../utils/helpers.js";

export const createProduct = async (req, res) => {
  try {
    const { name, price, description, category, quantity } = req.body;
    const slug = toSlug(name);
    const file = req.file;

    if (!file) {
      return NextResponse.json({ error: "File is required" }, { status: 400 });
    }

    const imageUrl = await uploadImageToCloudinary(file);

    console.log("Image URL:", imageUrl);

    const product = new Product({
      name,
      price,
      description,
      category,
      imageUrl,
      slug,
      quantity,
    });

    const resp = await product.save();

    console.log("Product saved:", resp);

    const newProduct = await Product.findById(resp._id).populate("category");

    console.log("New product:", newProduct);

    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ message: error.message });
  }
};
export const getAllProducts = async (req, res) => {
  try {
    const cid = req.query.cid || null;
    const query = {};
    if (cid) {
      query.category = cid;
    }

    const products = await Product.find({ ...query }).populate("category");

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const productId = req.params.id;

    const product = await Product.findById(productId).populate("category");

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    const file = req.file;

    let imageUrl = null;

    if (file) {
      imageUrl = await uploadImageToCloudinary(file);
    }

    if (imageUrl) {
      req.body.imageUrl = imageUrl;
    }
    req.body.slug = toSlug(req.body.name);

    const product = await Product.findByIdAndUpdate(productId, req.body, {
      new: true,
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const updatedProduct = await product.populate("category");
    res.status(201).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    const product = await Product.findByIdAndDelete(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
