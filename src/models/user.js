class User {
  constructor(email, password) {
    // No unique is given here, but would be a good choice if the project should be scaleable. 
    // This would be good to seperate users if more than one would register with the same email.
    // as the code right now, doesn't check if theres already a user with the email
    this.email = email;
    this.password = password;
  }
}

module.exports = User;
