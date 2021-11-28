const express = require('express');
const router = express.Router();

const {
    login,
    createUser,
    deleteUser,
    updateUserPassword,
} = require('../controllers/user-controller');
// Follwing the MVC folder structure I have all of the routes here, the routes then makes a call to the user controller.
router.post('/create', createUser);
router.delete('/delete', deleteUser);
router.post('/login', login);
router.patch('/updatePassword', updateUserPassword);

module.exports = router;
