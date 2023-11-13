// api/errorMiddleware.js

const express = require('express');
const router = express.Router();

// Simulated error middleware
router.use((req, res, next) => {
    const err = new Error('This is a simulated error.');
    err.status = 500;
    next(err);
});

// Error-handling middleware
router.use((err, req, res, next) => {
    console.error('Internal Server Error:', err.message);
    res.status(err.status || 500).send('Internal Server Error'); // Sending a response for demonstration
});

module.exports = router;
