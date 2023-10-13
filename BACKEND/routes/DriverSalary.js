const express = require("express");
const router = express.Router();
const DriverSalary = require("../models/driverSalModel");


// Middleware for CORS configuration
router.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

router.use(express.json());

// Add driver salary
router.post("/addDriverSal", (req, res) => {
  const { driver_id, bonus, mileage } = req.body;

  // Salary Calculations
  const salaryPerKM = 50;
  const netSalary =
    (salaryPerKM * mileage * bonus) / 100 + salaryPerKM * mileage;

  if (!bonus) {
    return res.status(400).json({ message: "Bonus field is required!" });
  }

  const newDriverSal = new DriverSalary({
    driver_id,
    salaryPerKM,
    bonus,
    mileage,
    netSalary,
  });

  newDriverSal
    .save()
    .then(() => {
      res.json("Driver Salary Added");
    })
    .catch((err) => {
      console.log("Driver Salary Not Added");
      res.status(500).send({ status: "Adding Error" });
    });
});

// Get driver salary
router.route("/getDriverSal").get((req, res) => {
  DriverSalary.find()
    .populate("driver_id")
    .then((driverSalary) => {
      res.json(driverSalary);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
