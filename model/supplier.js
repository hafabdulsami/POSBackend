const mongoose = require("mongoose");

// card with auto-increament id
const supplierSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    shopName: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    city: {
        type: String,
        required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Supplier", supplierSchema);
