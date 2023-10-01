const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

router.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', true);
    next();
  });

router.use(express.json());
router.post('/createBookings', (req, res) => {
    const bookingData = req.body;
    const newBooking = new Booking(bookingData);
    newBooking.save()
        .then((savedBooking) => {
            console.log('Booking saved:', savedBooking);
            res.json(savedBooking);
        })
        .catch((error) => {
            console.error('Error saving booking:', error);
            res.status(500).json({ error: 'Failed to save booking' });
        });
});


module.exports = router;
