// checks if user is logged in
document.addEventListener("DOMContentLoaded", (event) => {
  const user = localStorage.getItem("user");
  if (user) {
    location.href = "/";
  }

  // Takes the input from the html and using fetch to make a communication between the API.
  // The fetch makes a call to the login function in user-controller to check if the password and email is equal to the input.
  document.getElementById("form").addEventListener("submit", (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const user = {
      email: email,
      password: password,
    };

    fetch("http://localhost:3000/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response) {
          localStorage.setItem("user", JSON.stringify(user));
          location.href = "/";
        } else {
          window.alert('Wrong email or password.');
        }
      })
      .catch(() => {
        window.alert('Error - please contact adminstrator.');
      });
  });
});
