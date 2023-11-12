document.getElementById('bookForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Get form data
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;

    // Create a new book object
    const newBook = { title, author };

      // Make a POST request to the API
      fetch('http://localhost:3000/books', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBook),
    })
    .then(response => response.json())
    .then(data => {
        // Display the result
        document.getElementById('result').innerHTML = `<p>Book added successfully:</p><pre>${JSON.stringify(data, null, 2)}</pre>`;
    })
    .catch(error => {
        console.error('Error:', error);
        // Display an error message
        document.getElementById('result').innerHTML = '<p>Error adding the book. Please try again later.</p>';
    });
}); 