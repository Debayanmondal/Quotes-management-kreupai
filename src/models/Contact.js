import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  contact_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  mobile: { type: String },
  department: { type: String },
  account_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account",
  },
  created_by: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const Contact = mongoose.model("Contact", contactSchema);

export default Contact;
