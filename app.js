// app.js

const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const cors = require('cors');
const booksRouter = require('./routes/books');
const publishersRouter = require('./routes/publishers');
const reviewsRouter = require('./routes/reviews');

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(cors());
app.use(express.json());
app.set('view engine', 'ejs');

// Middleware for logging requests
app.use((req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] ${req.method} ${req.url}`);
    next();
});

// API Routes
app.use('/api/books', booksRouter);
app.use('/api/publishers', publishersRouter);
app.use('/api/reviews', reviewsRouter);

// HTML Routes
app.use('/books', booksRouter);
app.use('/publishers', publishersRouter);
app.use('/reviews', reviewsRouter);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});