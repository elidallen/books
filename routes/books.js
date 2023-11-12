const express = require('express');
const router = express.Router();

let books = [
    { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
    { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee' }
];



app.get('/books', (req, res) => {
    // Render the 'books' view and pass the 'books' data to it.
    res.render('books', { books });
});

// Define a route to handle GET requests for retrieving a specific book by its ID.
app.get('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const book = books.find(book => book.id === bookId);

    if (book) {
        // Render the 'book' view and pass the 'book' data to it.
        res.render('book', { book });
    } else {
        res.status(404).json({ message: 'Book not found' });
    }
});

// Define a route to handle POST requests for adding a new book.
app.post('/books', (req, res) => {
    const newBook = req.body; // Extract the new book data from the request body.
    newBook.id = books.length + 1; // Assign a new ID to the new book.
    books.push(newBook); // Add the new book to the array of books.

    res.status(201).json({ book: newBook }); // Respond with the new book in JSON format and a 201 status (Created).
});

// Define a route to handle PUT requests for updating a book by its ID.
app.put('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id); // Extract the book ID from the request parameters.
    const updatedBook = req.body; // Extract the updated book data from the request body.

    // Update the array of books by mapping over it and replacing the book with the specified ID.
    books = books.map(book => (book.id === bookId ? { ...book, ...updatedBook } : book));

    res.json({ books }); // Respond with the updated array of books in JSON format.
});

// Define a route to handle DELETE requests for deleting a book by its ID.
app.delete('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id); // Extract the book ID from the request parameters.
    books = books.filter(book => book.id !== bookId); // Filter out the book with the specified ID.

    res.json({ books }); // Respond with the updated array of books in JSON format.
});


module.exports = router;