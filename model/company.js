const mongoose = require("mongoose");
const audit = require('./auditCompany');
// card with auto-increament id
const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Middleware to create audit records before updating a company
companySchema.pre("findOneAndUpdate", async function () {
  const original = await this.model.findOne(this.getFilter());
  this._update = this._update || {};
  const updatedFields = { ...original.toObject(), ...this._update.$set };

  const auditTrail = new audit({
    company: original._id,
    operationType: "update",
    updatedFields,
    // Add userId if available
    // userId: req.user._id,
  });

  await auditTrail.save();
  
});

companySchema.pre("save", async function (next) {
  if (this.isNew) { // Checks if this is a new document being added
    const auditTrail = new audit({
      company: this._id,
      operationType: "create",
      updatedFields: this.toObject(),
      // Add userId if available
      // userId: req.user._id,
    });

    await auditTrail.save();
  }
  next();
});

module.exports = mongoose.model("Company", companySchema);
