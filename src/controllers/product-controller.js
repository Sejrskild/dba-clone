const productModel = require('../models/product');
const db = require('../helpers/db');
// Using uuid to give each products a individual ID
const { v4: uuidv4 } = require('uuid');
// 'path' is used to define where pictures are uploaded to.
const path = require('path');

// Controller to upload image before uploading product. 
// Async function, to make sure the picture is fully uplaoded before making a request.
const uploadImage = async (req, res) => {
    // Using express-fileupload module to store files instead the request object.
    const productImage = req.files.image;
    // Image path, where image is being uploaded.
    const imagePath = path.join(
        __dirname,
        `../views/uploads/${productImage.name}`
    );
    // This is the await part of the function, uploadImage doesn't run till the image has been moved to ../views/uploads/.
    await productImage.mv(imagePath);
    // Send back the path where the image has been uploaded
    res.status(200).json({ picturePath: `/uploads/${productImage.name}` });
};

// Creates product with the picture path
const createProduct = (req, res) => {
    const product = new productModel(
        uuidv4(), // Makes a unique ID for each products using UUID.
        req.body.email,
        req.body.picturePath,
        req.body.category,
        req.body.price
    );
    db.saveProduct(product);
    res.status(200).send(true);
};

// Deletes the product from database
const deleteProduct = (req, res) => {
    const product = db.findProduct(req.body.productId);

    // If user is not the owner of the product, return Not Found (404), if return runs in a function it doesn't run the rest of the function.
    if (req.body.user.email !== product.userEmail) {
        return res.status(404).send(false);
    }

    db.deleteProduct(product);
    res.status(200).send(true);
};

// Update product price
const updateProductPrice = (req, res) => {
    const product = db.findProduct(req.body.productId);

    // If user is not the owner of the product, return Not Found
    if (req.body.user.email !== product.userEmail) {
        return res.status(404).send(false);
    }

    db.updateProductPrice(product, req.body.newPrice);
    res.status(200).send(true);
};

// Get specified users products. As this is a GET request, user email is passed as a query parameter in the URL ( .../products/myProducts?email=noeremil@gmail.com
// This is usally a very bad approach as everyone can access each other code, if they have your email by changing the URL. 
const getMyProducts = (req, res) => {
    // Get the email in the query parameters
    const email = req.query.email;

    // Get all products created by that email from the database
    const myProducts = db.findMyProducts(email);
    // Return the products to the website
    res.status(200).json(myProducts);
};

// Get all products, with filtering option. To filter by category, pass 'category' as a query parameter in the URL.
const getAllProducts = (req, res) => {
    const filterCategory = req.query.category;

    let allProducts = db.findAllProducts();

    // If there is a category specified, filter the products. 
    if (filterCategory) {
        // Filter the products to only the specified category
        allProducts = allProducts.filter(x => x.category === filterCategory);
    }

    res.status(200).json(allProducts);
};

module.exports = {
    getMyProducts,
    getAllProducts,
    createProduct,
    deleteProduct,
    updateProductPrice,
    uploadImage,
};

