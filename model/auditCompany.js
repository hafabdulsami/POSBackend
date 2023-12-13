const mongoose = require("mongoose");

const auditSchema = new mongoose.Schema(
  {
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
    },
    operationType: {
      type: String,
      enum: ["create", "update", "delete"],
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
    updatedFields: {
      type: Object,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // If you have a User schema for user information
    },
  },
  { timestamps: true }
);

const companyAudit = mongoose.model("Audit", auditSchema);

module.exports = companyAudit;
