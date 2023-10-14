const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reservationSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
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
        type: String,
        required: true
    },
    vehicle: {
        type: String,
        required: true
    },
    noofguests: {
        type: Number,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    amount: {
        type: String,
        required: true
    }
});

const Reservation = mongoose.model("Reservation", reservationSchema);

module.exports = Reservation;
