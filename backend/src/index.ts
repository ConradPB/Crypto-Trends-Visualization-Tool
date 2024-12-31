import express from 'express';
import axios from 'axios';

import { getCryptoPrices } from './controllers/cryptoController';
import { Request, Response } from 'express-serve-static-core';

const app = express();

app.get('/api/crypto/prices', getCryptoPrices);



const PORT = 7000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
