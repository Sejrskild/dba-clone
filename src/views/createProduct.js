document.addEventListener('DOMContentLoaded', event => {
    // Check if user logged in
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
        location.href = '/login.html';
    }

    // Create a product function
    document
        .getElementById('createProduct')
        .addEventListener('submit', async event => {
            event.preventDefault();

            // Get product values
            const image = document.getElementById('image').files[0];
            const category = document.getElementById('category').value;
            const price = document.getElementById('price').value;

            // Image has to be uploaded through Form Data ( can't be uploaded through JSON ).
            const formData = new FormData();
            formData.append('image', image);
            // Upload Image and get the picture path returned by the API for the next request
            const { picturePath } = await fetch(
                'http://localhost:3000/products/uploadImage',
                {
                    method: 'POST',
                    body: formData,
                }
            ).then(response => response.json());

            // Create Product
            fetch('http://localhost:3000/products/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: user.email,
                    picturePath,
                    category,
                    price,
                }),
            })
                .then(response => response.json())
                .then(response => {
                    if (response) {
                        alert('Product is now for sale!');
                        location.href = '/';
                    }
                })
                .catch(() => {
                    window.alert('Error - please contact adminstrator.');
                });
        });
});
