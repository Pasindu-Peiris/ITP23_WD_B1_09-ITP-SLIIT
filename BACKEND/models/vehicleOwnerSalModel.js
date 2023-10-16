const mongoose = require("mongoose");

const VehicleOwnerSalary = new mongoose.Schema(
  {
    owner_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "VehicleOwner",
    },
    // Vehicle_id: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Vehicles",
    // },
    bonus: {
      type: Number,
      required: true,
      maxLength: 3,
      trim: true,
    },
    netSal: {
      type: Number,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("vehicleOwnerSal", VehicleOwnerSalary);
