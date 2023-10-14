const express = require("express");
const router = express.Router();
const VehicleOwnerSalary = require("../models/vehicleOwnerSalModel");

// Middleware for CORS configuration
router.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

router.use(express.json());

// Add vehicle owner salary
router.post("/addVehicleOwnerSal", (req, res) => {
  const { owner_id, Vehicle_id, bonus, type } = req.body;

  // Salary Calculations based on the type of vehicle
  let payment;

  if (type === "Car") {
    payment = 20000;
  } else if (type === "Motorcycle") {
    payment = 10000;
  } else if (type === "Bus") {
    payment = 30000;
  } else if (type === "Van") {
    payment = 20000;
  } else if (type === "Truck") {
    payment = 30000;
  } else if (type === "ThreeWheeler") {
    payment = 15000;
  }

  const netSal = (payment * bonus) / 100 + payment;

  const newVehicleOwnerSal = new VehicleOwnerSalary({
    owner_id,
    Vehicle_id,
    payment,
    bonus,
    netSal,
  });

  newVehicleOwnerSal
    .save()
    .then(() => {
      res.json("Vehicle Owner Salary Added");
    })
    .catch((err) => {
      console.log("Salary Not Added");
      res.status(500).send({ status: "Adding Error" });
    });
});

// Get vehicle owner salary
router.route("/getVehicleOwnerSal").get((req, res) => {
  VehicleOwnerSalary.find()
    .populate("owner_id,Vehicle_id")
    .then((vehicleOwnerSalary) => {
      res.json(vehicleOwnerSalary);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
