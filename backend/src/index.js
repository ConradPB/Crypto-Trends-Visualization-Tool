"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cryptoRoutes_1 = __importDefault(require("./routes/cryptoRoutes"));
// Load environment variables
dotenv_1.default.config();
// Create an Express app
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json()); // Parse JSON requests
app.use('/api/crypto', cryptoRoutes_1.default);
// Global Error Handler
app.use((err, req, res, next) => {
    console.error(`[Error] ${err.message}`);
    res.status(err.status || 500).json({
        error: err.message || 'Internal Server Error',
    });
});
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
