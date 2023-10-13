const mongoose = require("mongoose");

const StaffSalary = new mongoose.Schema(
  {
    element_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    ETF: {
      type: Number,
      required: true,
    },
    EPF: {
      type: Number,
      required: true,
    },
    basicSal: {
      type: Number,
      required: true,
    },
    bonus: {
      type: Number,
      required: true,
    },
    netSal: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("staffSalary", StaffSalary);

