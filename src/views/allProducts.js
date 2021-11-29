async function getProducts(filterCategory) {
    let queryString = '';

    // If the dropdown (select) is set to something else than all, it has to set the queryString to the given category.
    // by default (meaning all is chosen) it wont pass a query and therefore show all.
    if (filterCategory !== 'all') {
        queryString = `?category=${filterCategory}`;
    }

    // Get the products
    const products = await fetch(`/products${queryString}`).then(r => r.json());

    // Get the container of the products and make sure it is empty
    const tableDOM = document.getElementById('allProducts');
    tableDOM.innerHTML = '';

    products.forEach(product => {
        // Start row
        let row = '<tr>';
        // Print image
        row += `<td><img src="${product.picturePath}" style="width: 200px; height: 200px; object-fit: cover"/></td>`;
        // Print category
        row += `<td><p>${product.category}</p></td>`;
        // Print price
        row += `<td><p>${product.price}</p></td>`;
        // End row
        row += '</tr>';

        // Add the row to the table
        tableDOM.innerHTML += row;
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // Check if user logged in
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
        location.href = '/login.html';
    }

    // Display all products
    getProducts('all');

    // When the select value changes
    document.getElementById('category').addEventListener('change', e => {
        // Get the value of the selected option
        const filterCategory = e.target.value;

        // Display products that match the category selected
        getProducts(filterCategory);
    });
});
