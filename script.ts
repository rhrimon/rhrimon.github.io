document.addEventListener('DOMContentLoaded', (): void => {
    console.log('DOM fully loaded and script is running');
    // Type definitions
    type ScrollBehavior = 'auto' | 'smooth';
    
    interface ScrollOptions {
        top: number;
        behavior: ScrollBehavior;
    }
    
    // Intro section animation
    const nameIntro: HTMLElement | null = document.getElementById('name-intro');
    const tabbedIntro: HTMLElement | null = document.getElementById('tabbed-intro');
    
    console.log('Initial element states:');
    console.log('nameIntro:', nameIntro);
    console.log('tabbedIntro:', tabbedIntro);
    
    if (nameIntro && tabbedIntro) {
        console.log('Setting up animation sequence');
        
        // Start with name intro visible
        nameIntro.classList.add('visible');
        
        // After 2 seconds, start the transition
        setTimeout(() => {
            console.log('Starting fade transition');
            nameIntro.classList.remove('visible');
            nameIntro.classList.add('fade-out');
            
            // Listen for the animation end
            nameIntro.addEventListener('animationend', function handler() {
                console.log('Fade out animation completed');
                nameIntro.classList.add('hidden');
                nameIntro.classList.remove('fade-out');
                nameIntro.removeEventListener('animationend', handler);
                
                // Show tabbed intro
                tabbedIntro.classList.remove('hidden');
                tabbedIntro.classList.add('visible');
                
                // Initialize tab functionality
                initTabs();
            });
        }, 2000);
    } else {
        console.error('One or both elements not found');
        console.error('nameIntro:', nameIntro);
        console.error('tabbedIntro:', tabbedIntro);
    }
    
    // Tab functionality
    function initTabs(): void {
        console.log('Initializing tabs');
        const tabButtons: NodeListOf<HTMLButtonElement> = document.querySelectorAll('.tab-btn');
        const tabContents: NodeListOf<HTMLElement> = document.querySelectorAll('.tab-content');
        
        console.log('Tab buttons found:', tabButtons.length);
        console.log('Tab contents found:', tabContents.length);
        
        tabButtons.forEach((button: HTMLButtonElement): void => {
            button.addEventListener('click', (): void => {
                // Remove active class from all buttons
                tabButtons.forEach((btn: HTMLButtonElement): void => {
                    btn.classList.remove('active');
                });
                
                // Get the currently active content
                const currentActive = document.querySelector('.tab-content.active');
                
                // Add active class to clicked button
                button.classList.add('active');
                const targetId: string = button.getAttribute('data-target') || '';
                const targetContent: HTMLElement | null = document.getElementById(targetId);
                
                if (currentActive && targetContent) {
                    // Add fade-out to current content
                    currentActive.classList.add('fade-out');
                    
                    // After fade-out animation
                    setTimeout(() => {
                        currentActive.classList.remove('active', 'fade-out');
                        targetContent.classList.add('active');
                    }, 300); // Match this with the CSS animation duration
                } else if (targetContent) {
                    targetContent.classList.add('active');
                }
            });
        });
    }
    
    // Remove any potential inline styles from all navigation links
    const allLinks: NodeListOf<HTMLAnchorElement> = document.querySelectorAll('nav ul li a');
    allLinks.forEach((link: HTMLAnchorElement): void => {
        // Remove any inline styles that might be causing underlines
        link.style.removeProperty('text-decoration');
        link.style.setProperty('text-decoration', 'none', 'important');
        
        // Remove any attributes that might be causing styling issues
        if (link.hasAttribute('style')) {
            const currentStyle = link.getAttribute('style') || '';
            link.setAttribute('style', currentStyle.replace(/text-decoration:[^;]+;?/gi, ''));
        }
    });
    
    // Smooth scrolling for navigation links
    const navLinks: NodeListOf<HTMLAnchorElement> = document.querySelectorAll('nav a');
    
    navLinks.forEach((link: HTMLAnchorElement): void => {
        link.addEventListener('click', function(e: MouseEvent): void {
            e.preventDefault();
            
            const targetId: string = this.getAttribute('href') || '';
            const targetSection: HTMLElement | null = document.querySelector(targetId);
            
            if (targetSection) {
                const scrollOptions: ScrollOptions = {
                    top: targetSection.offsetTop,
                    behavior: 'smooth'
                };
                
                window.scrollTo(scrollOptions);
                
                // Ensure no text-decoration after click
                this.style.setProperty('text-decoration', 'none', 'important');
            }
        });
    });
    
    // Highlight active section in navigation
    const sections: NodeListOf<HTMLElement> = document.querySelectorAll('.section');
    const navItems: NodeListOf<HTMLAnchorElement> = document.querySelectorAll('nav ul li a');
    
    function highlightNavOnScroll(): void {
        const scrollPosition: number = window.scrollY;
        
        sections.forEach((section: HTMLElement): void => {
            const sectionTop: number = section.offsetTop - 100;
            const sectionHeight: number = section.offsetHeight;
            const sectionId: string | null = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight && sectionId) {
                navItems.forEach((item: HTMLAnchorElement): void => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === `#${sectionId}`) {
                        item.classList.add('active');
                        // Ensure no text-decoration when active class is added
                        item.style.setProperty('text-decoration', 'none', 'important');
                    }
                });
            }
        });
    }
    
    // Add active class style in CSS with !important to override any other styles
    const style: HTMLStyleElement = document.createElement('style');
    style.textContent = `
        nav ul li a.active {
            color: #fff !important;
            opacity: 1 !important;
            font-weight: 600 !important;
            text-decoration: none !important;
        }
        
        /* Additional rules to ensure no underlines */
        nav ul li a, 
        nav ul li a:hover, 
        nav ul li a:active, 
        nav ul li a:focus,
        nav ul li a.active {
            text-decoration: none !important;
            border-bottom: none !important;
            box-shadow: none !important;
        }
    `;
    document.head.appendChild(style);
    
    // Values section animation reset
    const valuesSection: HTMLElement | null = document.getElementById('values');
    const valueItems: NodeListOf<HTMLElement> = document.querySelectorAll('.values-item');
    let animationHasPlayed: boolean = false;
    
    function checkValuesVisibility(): void {
        if (!valuesSection) return;
        
        const rect: DOMRect = valuesSection.getBoundingClientRect();
        const isVisible: boolean = (rect.top <= window.innerHeight * 0.75 && rect.bottom >= 0);
        
        if (isVisible && !animationHasPlayed) {
            // Reset animations by removing and re-adding the elements
            valueItems.forEach((item: HTMLElement): void => {
                item.style.animation = 'none';
                item.offsetHeight; // Trigger reflow
                item.style.animation = '';
            });
            animationHasPlayed = true;
        } else if (!isVisible) {
            animationHasPlayed = false;
        }
    }
    
    // Combined event listener for both functions
    window.addEventListener('scroll', (): void => {
        highlightNavOnScroll();
        checkValuesVisibility();
    });
    
    // Initial calls
    highlightNavOnScroll();
    checkValuesVisibility();
}); 