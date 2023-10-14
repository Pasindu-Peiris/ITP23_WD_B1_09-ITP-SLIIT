const router = require("express").Router();
const Driver = require("../models/Driver");
const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");

// Upload profile image directory
const IMAGE_DIR = "./images/";

// set multer disk storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, IMAGE_DIR);
  },
  filename: (req, file, cb) => {
    //generate random uuid
    const fileName = uuidv4() + path.extname(file.originalname);
    cb(null, fileName);
  },
});

// Limit file upload only to images
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format is allowed!"));
    }
  },
});

// Create Driver
router.post("/", upload.single("file"), async (req, res) => {
  const newDriver = new Driver(req.body);
  try {
    // save the generated filename in our MongoDB Atlas database
    newDriver.imagePic = req.file.path;
    const savedDriver = await newDriver.save();
    res.status(200).json(savedDriver);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Get Driver list or Search Driver by contact or licensenumber query parameters
router.get("/", async (req, res) => {
  const licenseNumber = req.query.licenseNumber;
  const contact = req.query.contact;

  // if either studenId or contact query parameters is present
  if (licenseNumber || contact) {
    try {
      let driver;
      if (licenseNumber && contact) {
        driver = await Driver.find({
          licenseNumber: licenseNumber,
          ContactNumber: contact,
        });
      } else if (licenseNumber) {
        driver = await Driver.find({ licenseNumber });
      } else if (contact) {
        driver = await Driver.find({ ContactNumber: contact });
      }
      return res.status(200).json(driver);
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  }
  // else return the whole Driver list
  try {
    const driverList = await Driver.find();
    res.status(200).json(driverList);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Get Driver by ID
router.get("/:id", async (req, res) => {
  try {
    const driver = await Driver.findById(req.params.id);
    res.status(200).json(driver);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Update Driver
router.put("/:id", upload.single("file"), async (req, res, next) => {
  //If a new profile pic is uploaded then process it first by deleting the old image file from disk
  if (req.file) {
    try {
      //find by id
      const oldDriverDetails = await Driver.findById(req.params.id);
      if (!oldDriverDetails) {
        throw new Error("Driver not found!");
      }

      //if old image file exist then the delete file from directory
      if (fs.existsSync(oldDriverDetails.imagePic)) {
        fs.unlink(oldDriverDetails.imagePic, (err) => {
          if (err) {
            throw new Error("Failed to delete file..");
          } else {
            console.log("file deleted");
          }
        });
      }
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
  // Update the database with new details
  try {
    const updatedDriver = await Driver.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
        imagePic: req.file?.path,
      },
      { new: true }
    );
    res.status(200).json(updatedDriver);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Delete Driver
router.delete("/:id", async (req, res) => {
  try {
    await Driver.findByIdAndDelete(req.params.id);
    res.status(200).json("Driver has been deleted...");
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
