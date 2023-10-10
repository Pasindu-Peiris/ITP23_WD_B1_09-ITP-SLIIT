const mongoose = require('mongoose');

const VehicleSchema = new mongoose.Schema({
  // owner_id: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'ROwner',
  // },
  owner_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'VehicleOwner',
  },
  type: {
    type: String,
    required: true,
  },
  license: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  model: String,
  year: {
    type: Number,
    required: true,
    min: 1900, 
  },
  mileage: Number,
  transmission: String,
  fuel: Number,
  image: String,
  perks: [String],
  photos: [String],
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  description: {
    type: String,
    maxlength: 10000,
  },
  seat: Number,
  bookedTimeSlots: [
    {
      from: String,
      to: String,
    },
  ],
  status: String,
},
{
  timestamps: true,
});

const VehicleModel = mongoose.model('Vehicles', VehicleSchema);

module.exports = VehicleModel;
