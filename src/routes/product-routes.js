const express = require('express');
const router = express.Router();

const {
    getMyProducts,
    getAllProducts,
    createProduct,
    deleteProduct,
    updateProductPrice,
    uploadImage,
} = require('../controllers/product-controller');


// Follwing the MVC folder structure I have all of the routes here, the routes then makes a call to the product controller.
router.post('/uploadImage', uploadImage);
router.post('/create', createProduct);
router.delete('/delete', deleteProduct);
router.patch('/updatePrice', updateProductPrice);
router.get('/myProducts', getMyProducts);
router.get('/', getAllProducts);

module.exports = router;
