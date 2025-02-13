// database.js

const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        // MongoDB URI from the environment variables
        const mongoURI = process.env.MONGO_URI;

        // Connect to MongoDB Atlas
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('MongoDB Connected!');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1); // Exit the process with failure
    }
};

module.exports = connectDB;


