async function getMyProducts(email) {
    // Get the products passing the email as a query parameter
    // This could be a bad option as it doesn't check if the person is the real owner.
    const products = await fetch(`/products/myProducts?email=${email}`)
        .then(
        r => r.json()
    );

    // Get the container of the products and make sure it is empty
    const tableDOM = document.getElementById('myProducts');
    tableDOM.innerHTML = '';

    products.forEach(product => {
        // Start row - using forEach function to make a row etc. for each product.
        let row = '<tr>';
        // Print image
        row += `<td><img src="${product.picturePath}" style="width: 200px; height: 200px; object-fit: cover"/></td>`;
        // Print category
        row += `<td><p>${product.category}</p></td>`;
        // Print price
        row += `<td><p>${product.price}</p></td>`;
        // Print action link
        row += `<td><a href="./updateProduct.html?id=${product.id}">Update product</a></td>`;
        // End row
        row += '</tr>';

        // Add the row to the table
        tableDOM.innerHTML += row;
    });
}

document.addEventListener('DOMContentLoaded', event => {
    // Checks if user logged in
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
        location.href = '/login.html';
    }

    // Show my products table
    getMyProducts(user.email);
});
