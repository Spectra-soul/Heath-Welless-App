document.addEventListener('DOMContentLoaded', function() {
    // Get all navigation elements
    const navElements = document.querySelectorAll('nav ul li a[href="dashboard.html"]');
    
    // Check if user is logged in
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    
    navElements.forEach(navElement => {
        // Create dropdown container
        const dropdownContainer = document.createElement('div');
        dropdownContainer.className = 'nav-dropdown';
        
        // Create dashboard link
        const dashboardLink = document.createElement('a');
        dashboardLink.href = 'cart.html';
        dashboardLink.textContent = 'Dashboard';
        dashboardLink.className = 'btn-primary';
        
        // Create logout button
        const logoutButton = document.createElement('button');
        logoutButton.textContent = 'Logout';
        logoutButton.className = 'logout-btn';
        
        // Add click event to logout button
        logoutButton.addEventListener('click', function() {
            // Clear session storage
            sessionStorage.clear();
            // Redirect to dashboard page
            window.location.href = 'dashboard.html';
        });
        
        // Add elements to dropdown
        dropdownContainer.appendChild(dashboardLink);
        dropdownContainer.appendChild(logoutButton);
        
        // Replace original dashboard link with dropdown
        if (isLoggedIn) {
            navElement.parentNode.replaceChild(dropdownContainer, navElement);
        }
    });
}); 