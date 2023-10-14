const express = require("express");
const router = express.Router();
const StaffSalary = require("../models/staffSalModel");

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
router.post("/addStaffSal", (req, res) => {
  const { element_id, bonus } = req.body;

  // Staff member's basic salaries

  // Salary Calculations
  const basicSal = 30000;
  const calculatedETF = basicSal * 0.12;
  const calculatedEPF = basicSal * 0.08;
  const netSal = (basicSal * bonus) / 100 + parseFloat(basicSal);

  // Validations
  if (!bonus) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  if (bonus <= 0 || bonus >= 100) {
    return res.status(400).json({
      message: "Bonus amount must be a positive number less than 100!",
    });
  }

  const newStaffSal = new StaffSalary({
    element_id,
    ETF: calculatedETF,
    EPF: calculatedEPF,
    basicSal,
    bonus,
    netSal,
  });

  newStaffSal
    .save()
    .then(() => {
      res.json("Staff Salary Added");
    })
    .catch((err) => {
      console.log("Staff Salary Not Added");
      res.status(500).send({ status: "Adding Error" });
    });
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

module.exports = router;
