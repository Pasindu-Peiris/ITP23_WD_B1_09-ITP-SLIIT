const mongoose = require("mongoose");

const AllIncomes = new mongoose.Schema(
  {
    userData_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
    },
    name: {
      type: String,
      required: true,
      maxLength: 20,
    },
    nic: {
      type: String,
      required: true,
      maxLength: 12,
      trim: true,
    },
    email: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("incomes", AllIncomes);
