const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./database');
const userResponseRoutes = require('./routes/userResponses');
const authRoutes = require('./routes/auth');
const routineRoute = require("./routes/routine");
const questionaire = require("./routes/questionaire");

// Initialize dotenv for environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB()
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => {
        console.error("Failed to connect to MongoDB:", error.message);
        process.exit(1); // Exit process on critical failure
    });

// Routes
app.use('/api/responses', userResponseRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/routine', routineRoute);
app.use('/api/questionaire',questionaire)

// Root route (health check)
app.get('/', (req, res) => {
    res.send('RadiantVedaAI Backend is running');
});

app.get('/test', (req, res) => {
    res.send('Test route is working!');
});

// 404 Handler for undefined routes
app.use((req, res) => {
    res.status(404).json({ error: "Route asdfnot found" });
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Internal Server Error hgv" });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
