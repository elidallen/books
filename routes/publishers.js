const express = require('express');
const router = express.Router();

let publishers = [
    { id: 1, name: 'Random House', location: 'New York', yearEstablished: 1927, contact: 'contact@randomhouse.com' },
    { id: 2, name: 'HarperCollins', location: 'New York', yearEstablished: 1989, contact: 'contact@harpercollins.com' }
];

app.get('/publishers', (req, res) => {
    res.json(publishers);
});

// GET route for fetching a specific publisher by ID
app.get('/publishers/:id', (req, res) => {
    const publisherId = parseInt(req.params.id);
    const publisher = publishers.find(p => p.id === publisherId);

    if (publisher) {
        res.json(publisher);
    } else {
        res.status(404).json({ message: 'Publisher not found' });
    }
});


module.exports = router;