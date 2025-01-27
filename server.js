const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

// Use CORS middleware
app.use(cors());

// Dummy endpoint
app.get('/api/data', (req, res) => {
    res.json({ message: 'Hello from the backend!' });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});