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

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
