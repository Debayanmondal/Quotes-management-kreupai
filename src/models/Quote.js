import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  product_name: { type: String, required: true },
  quantity: { type: Number, required: true },
  unit_price: { type: Number, required: true },
  total_price: { type: Number, required: true },
});

const quoteSchema = new mongoose.Schema({
  quote_title: { type: String, required: true },
  quote_date: { type: Date, required: true },
  associated_account: {
    account_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
    },
    account_name: { type: String, required: true },
  },
  associated_contact: {
    contact_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Contact",
    },
    contact_name: { type: String, required: true },
    contact_email: { type: String, required: true },
  },
  products: [productSchema],
  total_price: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  final_price: { type: Number, required: true },
  quote_description: { type: String },
  status: {
    type: String,
    enum: ["Draft", "Sent", "Approved", "Rejected"],
    default: "Draft",
  },
  created_by: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const Quote = mongoose.model("Quote", quoteSchema);

export default Quote;
