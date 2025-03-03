document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetSection.offsetTop,
                behavior: 'smooth'
            });
        });
    });
    
    // Highlight active section in navigation
    const sections = document.querySelectorAll('.section');
    const navItems = document.querySelectorAll('nav ul li a');
    
    function highlightNavOnScroll() {
        let scrollPosition = window.scrollY;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === `#${sectionId}`) {
                        item.classList.add('active');
                    }
                });
            }
        });
    }
    
    // Add active class style in CSS
    const style = document.createElement('style');
    style.textContent = `
        nav ul li a.active {
            opacity: 1;
            font-weight: 600;
            text-decoration: underline;
        }
    `;
    document.head.appendChild(style);
    
    window.addEventListener('scroll', highlightNavOnScroll);
    
    // Initial call to highlight the current section
    highlightNavOnScroll();
}); 