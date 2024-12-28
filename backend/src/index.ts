import express from 'express';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Create an Express app
const app = express();

// Middleware
app.use(express.json()); // Parse JSON requests

// Define a simple route
app.get('/', (req, res) => {
    res.send('Welcome to the Crypto Trends Visualization Tool Backend!');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
