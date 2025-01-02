import express, { Request, Response } from 'express';

const app = express();

app.get('/api/crypto/prices', (req: Request, res: Response) => {
    res.json({ message: 'Prices route is working!' });
});

const PORT = 7000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
