"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables
dotenv_1.default.config();
// Create an Express app
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json()); // Parse JSON requests
// Define a simple route
app.get('/', (req, res) => {
    res.send('Welcome to the Crypto Trends Visualization Tool Backend!');
});
// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
