import mongoose from "mongoose";
const { Schema } = mongoose;

const orderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  number: {
    type: String, // Burayı string yapıyoruz
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  cartItems: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  totalAmount: {
    type: Number,
    required: true,
  },
});

const Order = mongoose.model("Order", orderSchema);
export default Order;
