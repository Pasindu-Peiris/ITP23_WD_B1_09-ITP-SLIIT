const express = require("express");
const router = express.Router();
const StaffSalary = require("../models/staffSalModel");
const users = require("../models/usersSchema");

// Middleware for CORS configuration
router.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

router.use(express.json());

// Add staff salary
router.post("/addStaffSal", async (req, res) => {
  const { element_id, bonus } = req.body;

  // Salary Calculations
  const basicSal = 38200;
  const calculatedETF = basicSal * 0.12;
  const calculatedEPF = basicSal * 0.08;
  const netSal = (basicSal * bonus) / 100 + parseFloat(basicSal);

  // Validations
  if (!bonus) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  // if (bonus <= 0 || bonus >= 100) {
  //   return res.status(400).json({
  //     message: "Bonus amount must be a positive number less than 100!",
  //   });
  // }
  try {
    // Update the driver's isSalaryAdded property
    await users.findByIdAndUpdate({ _id: element_id }, { isSalaryAdded: true });

    const newStaffSal = new StaffSalary({
      element_id,
      ETF: calculatedETF,
      EPF: calculatedEPF,
      basicSal,
      bonus,
      netSal,
    });

    await newStaffSal.save();
    res.json("Staff Salary Added");
  } catch (error) {
    console.error("Error adding staff salary:", error);
    res.status(500).send({ status: "Adding Error" });
  }
});

// Get staff salary
router.get("/getStaffSal", (req, res) => {
  StaffSalary.find()
    .populate("element_id")
    .then((staffSalary) => {
      res.json(staffSalary);
    })
    .catch((err) => {
      console.log(err);
    });
});

// Get all users
router.get("/users", async (req, res) => {
  try {
    const allUsers = await users.find();
    res.status(200).json(allUsers);
  } catch (error) {
    console.error("Error retrieving users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update Owner salary
router.put("/updateStaffSal/:elementId", async (req, res) => {
  const elementId = req.params.elementId;
  const { bonus } = req.body;

  if (bonus === undefined) {
    return res
      .status(400)
      .json({ message: "Bonus field is required for the update." });
  }

  try {
    // Find the driver's salary by driver ID and update the bonus field
    const updatedStaffSal = await StaffSalary.findOneAndUpdate(
      { element_id: elementId },
      { bonus: bonus },
      { new: true } // To get the updated document
    );

    if (!updatedStaffSal) {
      return res.status(404).json({ message: "Staff salary not found." });
    }

    res.json(updatedStaffSal);
  } catch (err) {
    console.log("Failed to update Staff salary bonus:", err);
    res.status(500).json({ status: "Update Error" });
  }
});

module.exports = router;
