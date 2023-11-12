document.getElementById('bookForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Get form data
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;

    // Create a new book object
    const newBook = { title, author };

    // Make a POST request to the API
    fetch('http://localhost:3000/api/books', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBook),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('Server Response:', data);
    
        // Update the UI dynamically by adding the new book to the list
        const booksList = document.querySelector('ul');
        const newBookItem = document.createElement('li');
    
        newBookItem.textContent = `${title} by ${author}`; 
        booksList.appendChild(newBookItem);
    
       
    })
    .catch(error => {
        console.error('Error:', error);
        // Display an error message
        document.getElementById('result').innerHTML = '<p>Error adding the book. Please try again later.</p>';
    });
});