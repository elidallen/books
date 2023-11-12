const express = require('express');
const router = express.Router();

// Sample data
let reviews = [
    { id: 1, bookId: 1, userId: 123, rating: 4, text: 'A classic novel with a captivating story.', datePosted: '2023-01-15' },
    { id: 2, bookId: 2, userId: 456, rating: 5, text: 'An important and thought-provoking book.', datePosted: '2023-02-20' }
];

// Define a route to handle GET requests for retrieving all reviews.
router.get('/', (req, res) => {
    res.json(reviews);
});

// Define a route to handle GET requests for retrieving reviews for a specific book by ID.
router.get('/:bookId', (req, res) => {
    const bookId = parseInt(req.params.bookId);
    const bookReviews = reviews.filter(review => review.bookId === bookId);

    if (bookReviews.length > 0) {
        res.json(bookReviews);
    } else {
        res.status(404).json({ message: 'Reviews for the specified book not found' });
    }
});

module.exports = router;