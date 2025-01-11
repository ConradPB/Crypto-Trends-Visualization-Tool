import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cryptoRoutes from './routes/cryptoRoutes';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/crypto', cryptoRoutes);

// Global error handler
// Add underscore prefix to unused parameters to satisfy TypeScript
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    console.error('Global error handler caught:', err);
    res.status(500).json({
        error: 'Internal server error',
        message: err.message || 'An unexpected error occurred'
    });
});

app.use((req, _res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

app.use('*', (req, res) => {
    res.status(404).send('Route not found');
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
    process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

const server = app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

// Handle server errors
server.on('error', (error) => {
    console.error('Server error:', error);
});

export default app;