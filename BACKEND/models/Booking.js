const mongoose = require('mongoose');

const Schema = mongoose.Schema;



const bookingSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    nic: {
        type: String, // Add NIC field
        required: true
    },
    vehicletype: {
        type: String, // Add Vehicle Type field
        required: true
    },
    pickupdate: {
        type: String,
        required: true
    },
    returndate: {
        type: String,
        required: true
    },
    driver: {
        type: String, // Add Driver field
        // required: true
    },
    amount: {
        type: String,
        required: true
    }
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;