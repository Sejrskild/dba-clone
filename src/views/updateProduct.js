async function getMyProduct(email, productId) {
    const products = await fetch(`/products/myProducts?email=${email}`).then(
        r => r.json()
    );
    // If trying to edit a product it will find the product by ID.
    // if there is no ID equal to the one trying to edit it will throw an alert and send you to index.html
    const product = products.find(product => product.id === productId);

    if (!product) {
        alert('No product found for specified ID.');
        window.location.href = 'index.html';
    }
    // show the product in HTML.
    document.getElementById('product').innerHTML = `
        <img src="${product.picturePath}" style="width: 200px; height: 200px; object-fit: cover"/>
        <p>Category: ${product.category}</p>
        <p>Price: ${product.price}</p>
    `;
}

document.addEventListener('DOMContentLoaded', () => {
    // Checks if user logged in
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
        location.href = '/login.html';
    }

    // Get product ID from URL query parameters
    const params = window.location.search;
    const productId = new URLSearchParams(params).get('id');

    // Display product. Pass both the product to show and the email of the user that makes the request
    getMyProduct(user.email, productId);

    // Update product price function
    document.getElementById('updatePrice').addEventListener('submit', e => {
        e.preventDefault();

        // Get new price value
        const newPrice = document.getElementById('price').value;

        // Make PATCH request to update price. Pass the user that makes the request, the new price and the ID of the product to update
        fetch('/products/updatePrice', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user, newPrice, productId }),
        })
            .then(response => response.json())
            .then(response => {
                if (response) {
                    alert('Product price successfully updated.');
                    window.location.reload();
                }
            })
            .catch(() => {
                window.alert('Error - please contact adminstrator.');
            });
    });

    // Delete product function
    document.getElementById('delete').addEventListener('submit', e => {
        e.preventDefault();

        // Make DELETE request. Pass both the user that makes the request as well as the ID of the product to delete
        fetch('/products/delete', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user, productId }),
        })
            .then(response => response.json())
            .then(response => {
                if (response) {
                    alert('Product successfully removed');
                    window.location.href = 'index.html';
                }
            })
            .catch(() => {
                window.alert('Error - please contact adminstrator.');
            });
    });
});
