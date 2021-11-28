const userModel = require('./../models/user');
const db = require('./../helpers/db');

// Creates account with e-mail and password
const createUser = (req, res) => {
    const user = new userModel(req.body.email, req.body.password);
    db.saveUser(user);
    res.status(200).send(true);
};

// Deletes the user from database
const deleteUser = (req, res) => {
    const user = new userModel(req.body.email, req.body.password);
    db.deleteUser(user);
    res.status(200).send(true);
};

// Login and checks if password is equal to the one in the database.
// if password is wrong send a unauthorized error. If something goes wrong send 404 error.
const login = (req, res) => {
    const user = new userModel(req.body.email, req.body.password);
    const found = db.findUser(user);
    if (found) {
        if (user.password == found.password) {
            res.status(200).send(true);
        } else {
            res.status(401).send(false);
        }
    } else {
        res.status(404).send(false);
    }
};

// Update user password. 
// The reason I am using PATCH instead of PUT is because is only one parameter that needs to be changed.
const updateUserPassword = (req, res) => {
    // Create the user model
    const user = new userModel(req.body.user.email, req.body.user.password);
    // If current password provided does not match the password in the User model, return Bad Request and end function (return)
    if (req.body.currentPassword !== user.password) {
        return res.status(400).send(false);
    }
    // If passes the previous check, update User to new password
    db.updateUserPassword(user, req.body.newPassword);
    res.status(200).send(true);
};

module.exports = {
    login,
    createUser,
    deleteUser,
    updateUserPassword,
};
