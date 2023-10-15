const router = require("express").Router();
let Booking = require("../models/Booking");

router.route("/addBookings").post((req, res) => {
    const {
        name,
        email,
        address,
        phone,
        nic,
        vehicletype,
        pickupdate,
        returndate,
        driver,
        amount
    } = req.body;

    const newBooking = new Booking({
        name,
        email,
        address,
        phone,
        nic,
        vehicletype,
        pickupdate,
        returndate,
        driver,
        amount
    });

    newBooking
        .save()
        .then(() => {
            res.json("Booking Success");
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: err.message });
        });
});

router.route("/AllBookings").get((req, res) => {
    Booking.find()
        .then((bookings) => {
            res.json(bookings);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: err.message });
        });
});

router.route("/update/:id").put(async (req, res) => {
    let bookId = req.params.id;
    const {
        name,
        email,
        address,
        phone,
        nic,
        vehicletype,
        pickupdate,
        returndate,
        driver,
        amount
    } = req.body;

    const updateBooking = {
        name,
        email,
        address,
        phone,
        nic,
        vehicletype,
        pickupdate,
        returndate,
        driver,
        amount
    };

    try {
        await Booking.findByIdAndUpdate(bookId, updateBooking);
        res.status(200).send({ status: "Booking updated" });
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "Error with updating data", error: err.message });
    }
});

router.route("/delete/:id").delete(async (req, res) => {
    let bookId = req.params.id;

    try {
        await Booking.findByIdAndDelete(bookId);
        res.status(200).send({ status: "Booking deleted" });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ status: "Error with delete booking", error: err.message });
    }
});

router.route("/getBooking/:id").get(async (req, res) => {
    let bookId = req.params.id;

    try {
        const booking = await Booking.findById(bookId);
        res.status(200).send({ status: "Booking fetched", booking });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ status: "Error with get booking", error: err.message });
    }
});

module.exports = router;
