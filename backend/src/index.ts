import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cryptoRoutes from './routes/cryptoRoutes';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.use('/api/crypto', cryptoRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
