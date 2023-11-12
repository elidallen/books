// Import the 'express' framework, which simplifies the process of building web applications in Node.js.
const express = require('express');

// Import the 'body-parser' middleware, which helps parse incoming request bodies in middleware before your handlers.
const bodyParser = require('body-parser');

// Import 'ejs' for the template engine.
const ejs = require('ejs');

const cors = require('cors');

// Create an instance of the Express application.
const app = express();

// Specify the port number on which the server will listen for incoming requests.
const port = 3000;

app.use(cors());

// Middleware
// Use 'express.json()' middleware to parse JSON in the request body.
app.use(express.json());

// Set 'ejs' as the view engine.
app.set('view engine', 'ejs');

// Define a middleware function that logs the date, HTTP method, and URL of each incoming request.
app.use((req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] ${req.method} ${req.url}`);
    next(); // Call the next middleware in the stack.
});

// Sample Data
// Define an array of book objects as sample data.
let books = [
    { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
    { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee' }
];

// Routes
// Define a route to handle GET requests for retrieving all books.
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

// Start the server and listen on the specified port.
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});