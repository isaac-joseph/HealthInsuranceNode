const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// CORS condition + failure when modified
app.use(cors());

// Allow the server to receive JSON information.
app.use(express.json());

// Serve files from the static folder.
app.use(express.static(path.join(__dirname, 'static')));

// Wake
app.get('/api/wake', (req, res) => {
    res.json({
        message: 'Health Insurance Risk Calculator server is awake!'
    });
});

// Receive calculator information
app.post('/api/calculate', (req, res) => {
    const bloodPressure = req.body.bloodPressure;
    const age = req.body.age;
    const heightFeet = req.body.heightFeet;
    const heightInches = req.body.heightInches;
    const weight = req.body.weight;
    const familyHistory = req.body.familyHistory;

    // We will add the calculations here.

    res.json({
        message: 'Calculator information received successfully.'
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});