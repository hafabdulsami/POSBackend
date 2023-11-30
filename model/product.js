const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    stockalert: {
      type: Number, // Corrected 'Int' to 'Number'
      required: true,
    },
    companyId: {
      type: mongoose.Schema.Types.ObjectId, // Reference to the Company model
      ref: 'Company', // Name of the Company model
      required: true,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
