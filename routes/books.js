// routes/books.js

const express = require('express');
const router = express.Router();

let books = [
    { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
    { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee' }
];

// Endpoint for getting all books
router.get('/', (req, res) => {
    res.render('books', { books });
});

// Endpoint for adding a new book
router.post('/', (req, res) => {
    const newBook = req.body;
    newBook.id = books.length + 1;
    books.push(newBook);
    res.status(201).json({ book: newBook });
});

// Endpoint for updating a book by ID
router.put('/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const updatedBook = req.body;
    books = books.map(book => (book.id === bookId ? { ...book, ...updatedBook } : book));
    res.json({ books });
});

// Endpoint for deleting a book by ID
router.delete('/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    books = books.filter(book => book.id !== bookId);
    res.json({ books });
});

module.exports = router;