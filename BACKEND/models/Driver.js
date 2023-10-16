const mongoose = require("mongoose");

const DriverSchema = new mongoose.Schema(
  {
    licenseNumber: {
      type: String,
      required: true,
    },

   
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    
    },
    mileage: {
      type: String,
    
    },
    vehicle: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
      maxlength: 100, // Max length of 100 characters
    },
    ContactNumber: {
      type: String,
      required: true,
    },
    imagePic: {
      type: String,
      required: true,
    },
    isSalaryAdded : {
      type : Boolean,
      default : false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Driver", DriverSchema);
