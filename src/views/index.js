document.addEventListener('DOMContentLoaded', event => {
    // Check if user logged in, if not redirects to login page
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
        location.href = '/login.html';
    }
});
