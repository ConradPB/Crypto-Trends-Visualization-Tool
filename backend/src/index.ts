import express from 'express';
import dotenv from 'dotenv';
import cryptoRoutes from './routes/cryptoRoutes';
import cors from 'cors';

dotenv.config();

const app = express();

app.use((req, res, next) => {
    console.log('\n--- Request Details ---');
    console.log('Method:', req.method);
    console.log('URL:', req.url);
    console.log('Query:', req.query);
    console.log('Headers:', req.headers);
    next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Add error handling to route registration
try {
    app.use('/api/crypto', cryptoRoutes);
    console.log('Routes registered successfully');
} catch (error) {
    console.error('Failed to register routes:', error);
}

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

server.on('error', (error) => {
    console.error('Server error:', error);
});