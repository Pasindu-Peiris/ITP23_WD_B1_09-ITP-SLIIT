const mongoose = require("mongoose");

const DriverSalary = new mongoose.Schema(
    {
      driver_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "driverList",
      },
      salaryPerKM: {
        type: Number,
        required: true,
      },
      bonus: {
        type: Number,
        required: true,
        maxLength: 3,
        trim: true,
      },
      netSalary: {
        type: Number,
        required: true,
      },
    },
    { timestamps: true }
  );
  
  module.exports = mongoose.model("DriverSalary", DriverSalary);
  