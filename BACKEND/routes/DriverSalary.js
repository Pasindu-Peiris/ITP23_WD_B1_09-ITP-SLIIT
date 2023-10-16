const express = require("express");
const router = express.Router();
const DriverSalary = require("../models/driverSalModel");
const DriverSchema = require("../models/Driver");

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
router.post("/addDriverSal", async (req, res) => {
  const { driver_id, bonus } = req.body;

  // Salary Calculations
  let mileage = 0;
  const salaryPerKM = 50;
  const netSalary =
    (salaryPerKM * mileage * bonus) / 100 + salaryPerKM * mileage;

  if (!bonus) {
    return res.status(400).json({ message: "Bonus field is required!" });
  }

  try {
    // Update the driver's isSalaryAdded property
    await DriverSchema.findByIdAndUpdate({ _id: driver_id }, { isSalaryAdded: true });

    const newDriverSal = new DriverSalary({
      driver_id,
      salaryPerKM,
      bonus,
      netSalary,
    });

  
    await newDriverSal.save();
    res.json("Driver Salary Added");
  } catch (err) {
    console.log("Driver Salary Not Added");
    res.status(500).send({ status: "Adding Error" });
  }
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

// Update driver salary 
router.put("/updateDriverSal/:driverId", async (req, res) => {
  const driverId = req.params.driverId;
  const { bonus } = req.body;

  if (bonus === undefined) {
    return res.status(400).json({ message: "Bonus field is required for the update." });
  }

  try {
    // Find the driver's salary by driver ID and update the bonus field
    const updatedDriverSal = await DriverSalary.findOneAndUpdate(
      { driver_id: driverId },
      { bonus: bonus },
      { new: true } // To get the updated document
    );

    if (!updatedDriverSal) {
      return res.status(404).json({ message: "Driver salary not found." });
    }

    res.json(updatedDriverSal);
  } catch (err) {
    console.log("Failed to update driver salary bonus:", err);
    res.status(500).json({ status: "Update Error" });
  }
});



module.exports = router;
