document.addEventListener('DOMContentLoaded', () => {
    // Toggle mobile navigation menu
    const menuToggleButton = document.querySelector('.mobile-menu-toggle');
    const navigationMenu = document.querySelector('.main-nav');

    if (menuToggleButton && navigationMenu) {
        menuToggleButton.addEventListener('click', () => {
            const isActive = menuToggleButton.classList.toggle('active');
            navigationMenu.classList.toggle('active');

            const [barTop, barMiddle, barBottom] = menuToggleButton.querySelectorAll('.bar');

            if (isActive) {
                barTop.style.transform = 'rotate(-45deg) translate(-5px, 6px)';
                barMiddle.style.opacity = '0';
                barBottom.style.transform = 'rotate(45deg) translate(-5px, -6px)';
            } else {
                barTop.style.transform = 'none';
                barMiddle.style.opacity = '1';
                barBottom.style.transform = 'none';
            }
        });

        // Close menu when clicking outside of it
        document.addEventListener('click', (event) => {
            const clickedOutside = !event.target.closest('.mobile-menu-toggle') && 
                                   !event.target.closest('.main-nav');

            const isMenuOpen = navigationMenu.classList.contains('active');

            if (clickedOutside && isMenuOpen) {
                navigationMenu.classList.remove('active');
                menuToggleButton.classList.remove('active');

                const [barTop, barMiddle, barBottom] = menuToggleButton.querySelectorAll('.bar');
                barTop.style.transform = 'none';
                barMiddle.style.opacity = '1';
                barBottom.style.transform = 'none';
            }
        });
    }

    // Highlight active navigation link based on current page
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        const linkPath = new URL(link.href, window.location.origin).pathname;

        if (currentPath === linkPath || 
           (currentPath.includes(linkPath) && linkPath !== '/')) {
            link.classList.add('active');
        }
    });
});
