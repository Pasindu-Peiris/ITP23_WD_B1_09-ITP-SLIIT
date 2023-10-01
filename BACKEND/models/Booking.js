// Import necessary modules
const mongoose = require('mongoose');

// Define the Booking schema
const bookingSchema = new mongoose.Schema({
  bookedTimeSlots: [
    {
      from: String,
      to: String,
    },
  ],
  Vehicle_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vehicles', 
  },
  
  price: Number,
  
});


const Booking = mongoose.model('Booking', bookingSchema);


module.exports = Booking;
