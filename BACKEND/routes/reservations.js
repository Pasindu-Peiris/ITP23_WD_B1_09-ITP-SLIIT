const router = require("express").Router();
const Reservation = require("../models/reservation");

router.route("/addReservations").post((req, res) => {
    const {
        name,
        email,
        address,
        phone,
        nic,
        vehicle,
        noofguests,
        date,
        amount
    } = req.body;

    const newReservation = new Reservation({
        name,
        email,
        address,
        phone,
        nic,
        vehicle,
        noofguests,
        date,
        amount
    });

    newReservation
        .save()
        .then(() => {
            res.json("Reservation Success");
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: err.message });
        });
});

router.route("/AllReservations").get((req, res) => {
    Reservation.find()
        .then((reservations) => {
            res.json(reservations);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: err.message });
        });
});

router.route("/update/:id").put(async (req, res) => {
    let resId = req.params.id;
    const {
        name,
        email,
        address,
        phone,
        nic,
        vehicle,
        noofguests,
        date,
        amount
    } = req.body;

    const updateReservation = {
        name,
        email,
        address,
        phone,
        nic,
        vehicle,
        noofguests,
        date,
        amount
    };

    try {
        await Reservation.findByIdAndUpdate(resId, updateReservation);
        res.status(200).send({ status: "Reservation updated" });
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "Error with updating data", error: err.message });
    }
});

router.route("/delete/:id").delete(async (req, res) => {
    let resId = req.params.id;

    try {
        await Reservation.findByIdAndDelete(resId);
        res.status(200).send({ status: "Reservation deleted" });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ status: "Error with delete reservation", error: err.message });
    }
});

router.route("/getReservation/:id").get(async (req, res) => {
    let resId = req.params.id;

    try {
        const reservation = await Reservation.findById(resId);
        res.status(200).send({ status: "Reservation fetched", reservation });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ status: "Error with get reservation", error: err.message });
    }
});

module.exports = router;
