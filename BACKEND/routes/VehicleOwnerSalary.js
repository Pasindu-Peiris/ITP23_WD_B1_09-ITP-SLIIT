const express = require("express");
const router = express.Router();
const VehicleOwnerSalary = require("../models/vehicleOwnerSalModel");
const VOwnerSchema = require("../models/VehicleOwner");

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
router.post("/addVehicleOwnerSal", async (req, res) => {
  const { owner_id, bonus } = req.body;

  // Salary Calculations based on the type of vehicle
  let payment = 20000;

  // switch (type) {
  //   case "Car":
  //     payment = 20000;
  //     break;
  //   case "Motorcycle":
  //     payment = 10000;
  //     break;
  //   case "Bus":
  //     payment = 30000;
  //     break;
  //   case "Van":
  //     payment = 20000;
  //     break;
  //   case "Truck":
  //     payment = 30000;
  //     break;
  //   case "ThreeWheeler":
  //     payment = 15000;
  //     break;
  //   default:
  //     return res.status(400).json({ error: "Invalid vehicle type" });
  // }

  // Check if bonus is a valid number
  if (!bonus) {
    return res.status(400).json({ error: "Invalid bonus value" });
  }

  // Calculate netSal
  const netSal = (payment * bonus) / 100 + payment;

  // const newVehicleOwnerSal = new VehicleOwnerSalary({

  //   Vehicle_id,
  //   payment,
  //   bonus,
  //   netSal,
  // });

  // newVehicleOwnerSal
  //   .save()
  //   .then(() => {
  //     res.json("Vehicle Owner Salary Added");
  //   })
  //   .catch((err) => {
  //     console.error("Salary Not Added", err);
  //     res.status(500).json({ status: "Adding Error", error: err.message });
  //   });

  try {
    await VOwnerSchema.findByIdAndUpdate(
      { _id: owner_id },
      { isSalaryAdded: true }
    );

    const newVehicleOwnerSal = new VehicleOwnerSalary({
      owner_id,
      payment,
      bonus,
      netSal,
    });

    await newVehicleOwnerSal.save();
    res.json("Vehicle Owner Salary Added");
  } catch (err) {
    console.log("Salary Not Added");
    res.status(500).send({ status: "Adding Error" });
  }
});

// Get vehicle owner salary
router.route("/getVehicleOwnerSal").get((req, res) => {
  VehicleOwnerSalary.find()
    .populate("owner_id") // Fixed the syntax here
    .then((vehicleOwnerSalary) => {
      res.json(vehicleOwnerSalary);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Error fetching vehicle owner salary" });
    });
});

// Update Owner salary 
router.put("/updateOwnerSal/:ownerId", async (req, res) => {
  const ownerId = req.params.ownerId;
  const { bonus } = req.body;

  if (bonus === undefined) {
    return res.status(400).json({ message: "Bonus field is required for the update." });
  }

  try {
    // Find the driver's salary by driver ID and update the bonus field
    const updatedOwnerSal = await VehicleOwnerSalary.findOneAndUpdate(
      { owner_id: ownerId },
      { bonus: bonus },
      { new: true } // To get the updated document
    );

    if (!updatedOwnerSal) {
      return res.status(404).json({ message: "Owner salary not found." });
    }

    res.json(updatedOwnerSal);
  } catch (err) {
    console.log("Failed to update owner salary bonus:", err);
    res.status(500).json({ status: "Update Error" });
  }
});

module.exports = router;
