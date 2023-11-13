// app.js

const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const cors = require('cors');
const booksRouter = require('./routes/books');
const publishersRouter = require('./routes/publishers');
const reviewsRouter = require('./routes/reviews');
const errorMiddleware = require('./api/errorMiddleware'); // Import the error middleware

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

// Use the error middleware
app.use('/api/error', errorMiddleware);

app.use('/api/books', booksRouter);
app.use('/api/publishers', publishersRouter);
app.use('/api/reviews', reviewsRouter);

app.use('/books', booksRouter);
app.use('/publishers', publishersRouter);
app.use('/reviews', reviewsRouter);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});