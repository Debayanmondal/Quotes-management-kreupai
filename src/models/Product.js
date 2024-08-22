import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  product_name: { type: String, required: true, unique: true },
  sku: { type: String, required: true, unique: true },
  description: { type: String },
  unit_price: { type: Number, required: true },
  inventory_count: { type: Number, required: true },
  created_by: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
