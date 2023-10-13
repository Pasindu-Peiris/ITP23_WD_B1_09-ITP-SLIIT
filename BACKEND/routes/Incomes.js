const express = require("express");
const router = express.Router();
const incomes = require("../models/incomes");

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
router.post("/addIncome", (req, res) => {
  const { name, nic, email, date, amount } = req.body;

  if (!name || !nic || !email || !date || !amount) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  const newIncome = new incomes({
    name,
    nic,
    email,
    date,
    amount,
  });

  newIncome
    .save()
    .then(() => {
      res.json("Income Added");
    })
    .catch((err) => {
      console.log("Income Not Added");
      res.status(500).send({ status: "Adding Error" });
    });
});

// Get driver salary
router.route("/getIncomes").get((req, res) => {
  incomes.find()
    .populate("booking_id")
    .then((incomes) => {
      res.json(incomes);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
