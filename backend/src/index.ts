import express from 'express';

const app = express();

// Test route
app.get('/', (req, res) => {
    res.send('Server is up and running!');
});

const PORT = 7000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});