const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(cors());
app.use(express.json());
app.set('view engine', 'ejs');

app.use((req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] ${req.method} ${req.url}`);
    next();
});

// Include your routes
const booksRoutes = require('./routes/books');
const publishersRoutes = require('./routes/publishers');
const reviewsRoutes = require('./routes/reviews');

app.use('/books', booksRoutes);
app.use('/publishers', publishersRoutes);
app.use('/reviews', reviewsRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});