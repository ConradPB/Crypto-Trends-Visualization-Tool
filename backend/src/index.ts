import express from 'express';
import { getCryptoPrices } from './controllers/cryptoController';

const app = express();

app.get('/api/crypto/prices', getCryptoPrices);

const PORT = 7000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
