const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  company: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  city: { type: String },
  businessType: { type: String },
  products: { type: [String] },
  volume: { type: String },
  message: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Form", formSchema);
