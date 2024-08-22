import mongoose from "mongoose";

const accountSchema = new mongoose.Schema({
  account_name: { type: String, required: true, unique: true },
  industry: { type: String },
  employees: { type: Number },
  annual_revenue: { type: Number },
  phone: { type: String },
  website: { type: String },
  address: {
    street: { type: String },
    city: { type: String },
    state: { type: String },
    zip_code: { type: String },
    country: { type: String },
  },
  created_by: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const Account = mongoose.model("Account", accountSchema);

export default Account;
