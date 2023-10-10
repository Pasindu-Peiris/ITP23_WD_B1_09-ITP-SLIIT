const express = require('express');
const router = express.Router();
const VehicleOwner = require('../models/VehicleOwner'); // Import the VehicleOwner model

// Create a new VehicleOwner
router.post('/add', async (req, res) => {
    try {
        const { name, location, email, contact, password, nic } = req.body;

        const newVehicleOwner = new VehicleOwner({ name, location, email, contact, password, nic });

        await newVehicleOwner.save();

        res.json('Vehicle Owner added');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Sign In a VehicleOwner
router.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body;

        const existingOwner = await VehicleOwner.findOne({ email });

        if (!existingOwner || existingOwner.password !== password) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        res.json({ message: 'Sign in successful', owner: existingOwner });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Get all VehicleOwners
router.get('/', async (req, res) => {
    try {
        const vehicleOwners = await VehicleOwner.find();
        res.json(vehicleOwners);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Update a VehicleOwner by ID
router.put('/update/:id', async (req, res) => {
    try {
        const ownerId = req.params.id;
        const { name, location, email, contact, password, nic } = req.body;
        const updatedVehicleOwner = { name, location, email, contact, password, nic };
        const result = await VehicleOwner.findByIdAndUpdate(ownerId, updatedVehicleOwner, { new: true });
        if (!result) {
            return res.status(404).json({ error: 'Vehicle Owner not found' });
        }
        res.json({ status: 'Vehicle Owner Updated', vehicleOwner: result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Delete a VehicleOwner by ID
router.delete('/delete/:id', async (req, res) => {
    try {
        const ownerId = req.params.id;
        const deletedVehicleOwner = await VehicleOwner.findByIdAndRemove(ownerId);
        if (!deletedVehicleOwner) {
            return res.status(404).json({ error: 'Vehicle Owner not found' });
        }
        res.json({ status: 'Vehicle Owner Deleted', vehicleOwner: deletedVehicleOwner });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Get a VehicleOwner by ID
router.get('/get/:id', async (req, res) => {
    try {
        const ownerId = req.params.id;
        const vehicleOwner = await VehicleOwner.findById(ownerId);
        if (!vehicleOwner) {
            return res.status(404).json({ error: 'Vehicle Owner not found' });
        }
        res.json(vehicleOwner);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
