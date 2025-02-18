import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cryptoRoutes from './routes/cryptoRoutes';
import morgan from 'morgan';
import logger from './utils/logger';

dotenv.config();


const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

const allowedOrigins = [
    "https://crypto-trends-visualization-tool-8njfshscg-conrad-p-bs-projects.vercel.app", 
    "http://localhost:5173" 
];

app.use(cors({
    origin: allowedOrigins, 
    methods: ["GET", "POST", "PUT", "DELETE"], 
    credentials: true, 
}));
app.use('/api/crypto', cryptoRoutes);

// Use Morgan for HTTP request logging
app.use(
    morgan('combined', {
        stream: {
            write: (message) => logger.info(message.trim()),
        },
    })
);



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
