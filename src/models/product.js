class Product {
    constructor(id, userEmail, picturePath, category, price) {
        // Unique ID is given to distinguish between the products.
        this.id = id;
        this.userEmail = userEmail;
        this.picturePath = picturePath;
        this.category = category;
        this.price = price;
    }
}

module.exports = Product;
