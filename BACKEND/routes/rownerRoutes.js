const express = require('express');
const router = express.Router();
const OwnerModel = require('../models/ROwner');

router.use(express.json());
router.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', true);
    next();
  });

router.post('/createowners', async (req, res) => {
    try {
        const { name } = req.body;
        const newOwner = new OwnerModel({ name });
        const savedOwner = await newOwner.save();
        res.json(savedOwner);
    } catch (error) {
        res.status(500).json({ error: 'Unable to create owner' });
    }
});

// Get all Owners
router.get('/getowners', async (req, res) => {
    try {
        const owners = await OwnerModel.find();
        res.json(owners);
    } catch (error) {
        res.status(500).json({ error: 'Unable to fetch owners' });
    }
});

// Get an Owner by ID
router.get('/owners/:id', async (req, res) => {
    try {
        const owner = await OwnerModel.findById(req.params.id);
        if (!owner) {
            return res.status(404).json({ error: 'Owner not found' });
        }
        res.json(owner);
    } catch (error) {
        res.status(500).json({ error: 'Unable to fetch owner' });
    }
});

// Update an Owner by ID
router.put('/owners/:id', async (req, res) => {
    try {
        const { name } = req.body;
        const updatedOwner = await OwnerModel.findByIdAndUpdate(
            req.params.id,
            { name },
            { new: true }
        );
        if (!updatedOwner) {
            return res.status(404).json({ error: 'Owner not found' });
        }
        res.json(updatedOwner);
    } catch (error) {
        res.status(500).json({ error: 'Unable to update owner' });
    }
});

// Delete an Owner by ID
router.delete('/owners/:id', async (req, res) => {
    try {
        const deletedOwner = await OwnerModel.findByIdAndDelete(req.params.id);
        if (!deletedOwner) {
            return res.status(404).json({ error: 'Owner not found' });
        }
        res.json(deletedOwner);
    } catch (error) {
        res.status(500).json({ error: 'Unable to delete owner' });
    }
});

module.exports = router;
