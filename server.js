const express = require('express');
const app = express();

// Package for image uploading
const fileUpload = require('express-fileupload');

// Routes
const userRoutes = require('./src/routes/user-routes');


const PORT = process.env.PORT || 3000;

// Middleware - endnu et fedt term
app.use(express.static('./src/views'));
// Kommer som string -> JSON
app.use(express.json());
// Invoke fileUpload package function
app.use(fileUpload());

// Routes
app.use('/users', userRoutes);

// Start server
app.listen(PORT, console.log('Server is running'));

// app must be exported if you are running mocha tests. This is not necessary if you are not running tests to the API
module.exports = app;
