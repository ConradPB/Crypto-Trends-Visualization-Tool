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

// Force console to flush immediately
if (process.env.NODE_ENV !== 'production') {
    const originalConsoleError = console.error;
    const originalConsoleLog = console.log;
    
    console.error = (...args) => {
        originalConsoleError(...args);
        if (process.stdout.write) {
            process.stdout.write('');
        }
    };
    
    console.log = (...args) => {
        originalConsoleLog(...args);
        if (process.stdout.write) {
            process.stdout.write('');
        }
    };
}

// Routes
app.use('/api/crypto', cryptoRoutes);

// Global error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error('Global error handler caught:', err);
    res.status(500).json({
        error: 'Internal server error',
        message: err.message || 'An unexpected error occurred'
    });
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