// Import Mongoose
const mongoose = require('mongoose');

// Define the schema
const featuresSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  // Add other fields as needed
});

// Create a model based on the schema
const Features = mongoose.model('features', featuresSchema);

// Export the model to use it in other files
module.exports = Features;
