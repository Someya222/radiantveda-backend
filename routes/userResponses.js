const express = require('express');
const UserResponse = require('../models/UserResponse');
const mongoose = require('mongoose');
const auth = require('../middleware/auth');  // Import the auth middleware
const router = express.Router();


// Create a new user response
router.post('/', auth, async (req, res) => {
    try {
        const response = new UserResponse(req.body); // Data from client
        await response.save(); // Save to DB
        res.status(201).json(response); // Send saved data as response
    } catch (error) {
        res.status(500).json({ message: 'Error saving response', error });
    }
});

// Get all user responses (unprotected, or protected as needed)
router.get('/', async (req, res) => {
    try {
        const responses = await UserResponse.find(); // Retrieve all data
        res.json(responses); // Send as JSON
    } catch (error) {
        res.status(500).json({ message: 'Error fetching responses', error });
    }
});

// Get a single user response by ID (unprotected, or protected as needed)
router.get('/:id', async (req, res) => {
    try {
        const response = await UserResponse.findById(req.params.id);
        if (!response) {
            return res.status(404).json({ message: 'Response not found' });
        }
        res.json(response);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching response', error });
    }
});

// Update a user response (protected)
router.put('/:id', auth, async (req, res) => {
    try {
        const updatedResponse = await UserResponse.findByIdAndUpdate(
            req.params.id, // ID from the URL
            req.body,      // Data to update
            { new: true }  // Return the updated document
        );
        if (!updatedResponse) {
            return res.status(404).json({ message: 'Response not found' });
        }
        res.json(updatedResponse);
    } catch (error) {
        console.error('Error updating response:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Delete a user response (protected)
router.delete('/:id', auth, async (req, res) => {
    try {
        const id = req.params.id.trim();

        // Validate the ObjectId
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }

        const deletedResponse = await UserResponse.findByIdAndDelete(id);
        if (!deletedResponse) {
            return res.status(404).json({ message: 'Response not found' });
        }
        res.json({ message: 'Response deleted successfully' });
    } catch (error) {
        console.error('Error deleting response:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
})

module.exports = router;
