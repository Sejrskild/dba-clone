// Importing Node.js file server module
var fs = require('fs');

// Defining paths to make is easier throughout the developing.
const ABSOLUTE_PATH = __dirname + '/../../data';
const UPLOADS_PATH = __dirname + '/../views';
const USER_FILE = '/users.json';



class db {
    constructor() {
        this.users = this.openFile(USER_FILE);

    }
    
    // Save the database file
    saveFile(fileName, contentString) {
        fs.writeFileSync(ABSOLUTE_PATH + fileName, contentString);
    }

    // Open file the database file
    openFile(fileName) {
        const file = fs.readFileSync(ABSOLUTE_PATH + fileName);
        return JSON.parse(file);
    }

    // Save the user as a JSON object.
    saveUser(user) {
        this.users.push(user);
        this.saveFile(USER_FILE, JSON.stringify(this.users));
    }
    // Deletes the user.
    deleteUser(user) {
        this.users = this.users.filter(x => x.email != user.email);
        this.saveFile(USER_FILE, JSON.stringify(this.users));
    }
    // Finds the user, used for eg. checking "My products listed for sale".
    findUser(user) {
        return this.users.find(x => user.email == x.email);
    }
    // Update password
    updateUserPassword(user, newPassword) {
        // Modify the password of the matching user only
        this.users = this.users.map(x => {
            if (x.email === user.email) {
                x.password = newPassword;
            }
            return x;
        });

        this.saveFile(USER_FILE, JSON.stringify(this.users));
    }

}

module.exports = new db();
