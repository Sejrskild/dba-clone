document.addEventListener("DOMContentLoaded", (event) => {
  // Check if user logged in
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    location.href = "/login.html";
  }

  // Delete user function
  document.getElementById("delete").addEventListener("submit", (event) => {
    event.preventDefault();

    fetch("http://localhost:3000/users/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response) {
          localStorage.removeItem("user");
          location.href = "/login.html";
        }
      })
      .catch(() => {
        window.alert('Error - please contact adminstrator.');
      });
  });

  // Logout function
  document.getElementById("logout").addEventListener("click", () => {
    // Remove item from local storage and redirect to login page
    localStorage.removeItem("user");
    window.location.href = "login.html";
  });

  // Update password function
  document
    .getElementById("updatePassword")
    .addEventListener("submit", (event) => {
      event.preventDefault();

      // Get input boxes values
      const currentPassword = document.getElementById("currentPassword").value;
      const newPassword = document.getElementById("newPassword").value;

      // Make PATCH request and send the user, as well as the passwords in the input boxes
      fetch("http://localhost:3000/users/updatePassword", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user, newPassword, currentPassword }),
      })
        .then((response) => response.json())
        .then((response) => {
          if (response) {
            alert("Password successfully updated.");
            // Once password is updated, make sure to update the password in local storage too
            let updatedUser = {
              email: user.email,
              password: newPassword,
            };
            localStorage.setItem("user", JSON.stringify(updatedUser));
            window.location.reload();
          } else {
            window.alert("Invalid current password");
          }
        })
        .catch(() => {
          window.alert('Error - please contact adminstrator.');
        });
    });
});
