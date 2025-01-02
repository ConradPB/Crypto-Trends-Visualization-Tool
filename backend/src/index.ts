import express, { Request, Response } from 'express';
import axios from 'axios';

const app = express();

app.get('/api/crypto/prices', async (req: Request, res: Response) => {
    try {
        const { ids = 'bitcoin,ethereum', vs_currencies = 'usd' } = req.query;

        const response = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
            params: { ids, vs_currencies },
        });

        res.json(response.data);
    } catch (error) {
        console.error('Error fetching prices:', error instanceof Error ? error.message : error);
        res.status(500).json({ error: 'Failed to fetch crypto prices' });
    }
});

const PORT = 7000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
