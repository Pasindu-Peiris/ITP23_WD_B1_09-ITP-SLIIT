const express = require('express');
const router = express.Router();
const VehicleModel = require('../models/Vehicles');
const OwnerModel = require('../models/ROwner');
const multer = require('multer')
const path = require('path')
const fs = require('fs');
router.use(express.json());

router.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', true);
    next();
  });

router.get('/getVehicles', (req, res) => {
    VehicleModel.find()
        .populate('owner_id')
        .then(vehicles => res.json(vehicles))
        .catch(err => res.json(err))
});

router.get('/getVehicles/:ownerId', (req, res) => {
    const ownerId = req.params.ownerId;
    VehicleModel.find({ owner_id: ownerId })
        .populate('owner_id')
        .exec()
        .then(vehicles => res.json(vehicles))
        .catch(err => res.json(err));
});

router.post('/createVehicles', (req, res) => {
    const { owner_id, ...vehicleData } = req.body;
    const newVehicle = new VehicleModel({
        owner_id,
        ...vehicleData
    });
    newVehicle.save()
        .then(result => res.json(result))
        .catch(err => res.json(err));
});

router.get('/upVehicles/:id', (req, res) => {
    const id = req.params.id;
    VehicleModel.findById({ _id: id })
        .populate('owner_id')
        .then(vehicles => res.json(vehicles))
        .catch(err => res.json(err));
});

router.put('/updateVehicles/:id', (req, res) => {
    const id = req.params.id;
    VehicleModel.findByIdAndUpdate({ _id: id }, {
        type: req.body.type,
        license: req.body.license,
        model: req.body.model,
        location: req.body.location,
        year: req.body.year,
        seat: req.body.seat,
        mileage: req.body.mileage,
        transmission: req.body.transmission,
        fuel: req.body.fuel,
        perks: req.body.perks,
        photos: req.body.photos,
        price: req.body.price,
        description: req.body.description,
        status: req.body.status,
    })
        .then(vehicles => res.json(vehicles))
        .catch(err => res.json(err));
});

router.put('/addTime/:id', (req, res) => {
    const id = req.params.id;

    VehicleModel.findById(id)
        .then(vehicle => {
            if (!vehicle) {
                return res.status(404).json({ message: 'Vehicle not found' });
            }
            vehicle.bookedTimeSlots.push(req.body.bookedTimeSlots);
            vehicle.totalamount = req.body.totalamount;

            return vehicle.save();
        })
        .then(updatedVehicle => {
            res.status(201).json(updatedVehicle);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});



router.delete('/deleteVehicle/:id', (req, res) => {
    const id = req.params.id;
    VehicleModel.findByIdAndDelete({ _id: id })
        .then(vehicles => res.json(vehicles))
        .catch(err => res.json(err));
});

const photosMiddleware = multer({ dest: 'VehicleImg/' });
router.post('/upload', photosMiddleware.array('photos', 100), async (req, res) => {

    const uploadedFiles = [];

    for (let i = 0; i < req.files.length; i++) {

        const { path, originalname } = req.files[i];
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        const newPath = path + '.' + ext;
        fs.renameSync(path, newPath);
        uploadedFiles.push(newPath.replace('VehicleImg/', ''));
    }
    res.json(uploadedFiles);
});

module.exports = router;
