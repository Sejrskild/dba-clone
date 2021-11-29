const express = require('express');
const app = express();

// Package for image uploading
const fileUpload = require('express-fileupload');

// Routes
const userRoutes = require('./src/routes/user-routes');
const productRoutes = require('./src/routes/product-routes');

const PORT = process.env.PORT || 3000;

// Middleware - endnu et fedt term
app.use(express.static('./src/views'));
// Kommer som string -> JSON
app.use(express.json());
// Invoke fileUpload package function
app.use(fileUpload());

// Routes
app.use('/users', userRoutes);
app.use('/products', productRoutes);

// Start server
app.listen(PORT, console.log(`Server is running and listening on localhost:${PORT}`));

// It's not required to export the app, unless you're unit testing the API.
module.exports = app;