import express from 'express';
import dotenv from 'dotenv';
import cryptoRoutes from './routes/cryptoRoutes';

// Load environment variables
dotenv.config();

// Create an Express app
const app = express();

// Middleware
app.use(express.json()); // Parse JSON requests

app.use('/api/crypto', cryptoRoutes);

//app.use((req, res, next) => {
  //  console.log(`Incoming request: ${req.method} ${req.url}`);
  //  next();
//});


// Define a simple route
app.get('/', (req, res) => {
    res.send('Welcome to the Crypto Trends Visualization Tool Backend!');
});

app.get('/test', (req, res) => {
    res.send('Test route works!');
});


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
