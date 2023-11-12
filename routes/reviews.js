const express = require('express');
const router = express.Router();

let reviews = [
    { id: 1, bookId: 1, userId: 123, rating: 4, text: 'A classic novel with a captivating story.', datePosted: '2023-01-15' },
    { id: 2, bookId: 2, userId: 456, rating: 5, text: 'An important and thought-provoking book.', datePosted: '2023-02-20' }
];



// GET route for fetching all reviews
app.get('/reviews', (req, res) => {
    res.json(reviews);
});

// GET route for fetching reviews for a specific book by ID
app.get('/reviews/:bookId', (req, res) => {
    const bookId = parseInt(req.params.bookId);
    const bookReviews = reviews.filter(review => review.bookId === bookId);

    if (bookReviews.length > 0) {
        res.json(bookReviews);
    } else {
        res.status(404).json({ message: 'Reviews for the specified book not found' });
    }
});e

module.exports = router;