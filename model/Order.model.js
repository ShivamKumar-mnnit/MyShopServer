import mongoose from "mongoose";

export const OrderSchema = new mongoose.Schema({
  id: {
    type: String,
    required: [true, "Please provide a unique id"],
    unique: [true, "id exists"],
  },
  customer_name: {
    type: String,
    required: [true, "Please provide a customer name"],
    unique: false,
  },
  customer_email: {
    type: String,
    required: [true, "This Email already exists"],
  },
  product: { 
    type: String,
    required:[true,"Enter the Price of each product"]
  },
  quantity: { 
    type: Number,
    min: [1, "Quantity must be greater than 0"],
    required:[true,"Enter the quantity"]
 },
  order_value: { type: Number },
  
});

export default mongoose.model('order', OrderSchema);
