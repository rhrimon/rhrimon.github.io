"use strict";
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and script is running');
    const nameIntro = document.getElementById('name-intro');
    const tabbedIntro = document.getElementById('tabbed-intro');
    console.log('Initial element states:');
    console.log('nameIntro:', nameIntro);
    console.log('tabbedIntro:', tabbedIntro);
    if (nameIntro && tabbedIntro) {
        console.log('Setting up animation sequence');
        nameIntro.classList.add('visible');
        setTimeout(() => {
            console.log('Starting fade transition');
            nameIntro.classList.remove('visible');
            nameIntro.classList.add('fade-out');
            nameIntro.addEventListener('animationend', function handler() {
                console.log('Fade out animation completed');
                nameIntro.classList.add('hidden');
                nameIntro.classList.remove('fade-out');
                nameIntro.removeEventListener('animationend', handler);
                tabbedIntro.classList.remove('hidden');
                tabbedIntro.classList.add('visible');
                initTabs();
            });
        }, 2000);
    }
    else {
        console.error('One or both elements not found');
        console.error('nameIntro:', nameIntro);
        console.error('tabbedIntro:', tabbedIntro);
    }
    function initTabs() {
        console.log('Initializing tabs');
        const tabButtons = document.querySelectorAll('.tab-btn');
        const tabContents = document.querySelectorAll('.tab-content');
        console.log('Tab buttons found:', tabButtons.length);
        console.log('Tab contents found:', tabContents.length);
        tabButtons.forEach((button) => {
            button.addEventListener('click', () => {
                const tabId = button.getAttribute('data-tab') || '';
                const targetContent = document.getElementById(`${tabId}-content`);
                if (button.classList.contains('active')) {
                    return;
                }
                tabButtons.forEach((btn) => {
                    btn.classList.remove('active');
                });
                const activeContent = document.querySelector('.tab-content.active');
                if (activeContent && targetContent) {
                    activeContent.classList.add('fade-out');
                    setTimeout(() => {
                        tabContents.forEach((content) => {
                            content.classList.remove('active');
                            content.classList.remove('fade-out');
                        });
                        button.classList.add('active');
                        targetContent.classList.add('active');
                    }, 300);
                }
                else if (targetContent) {
                    button.classList.add('active');
                    targetContent.classList.add('active');
                }
            });
        });
    }
    const allLinks = document.querySelectorAll('nav ul li a');
    allLinks.forEach((link) => {
        link.style.removeProperty('text-decoration');
        link.style.setProperty('text-decoration', 'none', 'important');
        if (link.hasAttribute('style')) {
            const currentStyle = link.getAttribute('style') || '';
            link.setAttribute('style', currentStyle.replace(/text-decoration:[^;]+;?/gi, ''));
        }
    });
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach((link) => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href') || '';
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const scrollOptions = {
                    top: targetSection.offsetTop,
                    behavior: 'smooth'
                };
                window.scrollTo(scrollOptions);
                this.style.setProperty('text-decoration', 'none', 'important');
            }
        });
    });
    const sections = document.querySelectorAll('.section');
    const navItems = document.querySelectorAll('nav ul li a');
    function highlightNavOnScroll() {
        const scrollPosition = window.scrollY;
        sections.forEach((section) => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight && sectionId) {
                navItems.forEach((item) => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === `#${sectionId}`) {
                        item.classList.add('active');
                        item.style.setProperty('text-decoration', 'none', 'important');
                    }
                });
            }
        });
    }
    const style = document.createElement('style');
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
    const valuesSection = document.getElementById('values');
    const valueItems = document.querySelectorAll('.values-item');
    let animationHasPlayed = false;
    function checkValuesVisibility() {
        if (!valuesSection)
            return;
        const rect = valuesSection.getBoundingClientRect();
        const isVisible = (rect.top <= window.innerHeight * 0.75 && rect.bottom >= 0);
        if (isVisible && !animationHasPlayed) {
            valueItems.forEach((item) => {
                item.style.animation = 'none';
                item.offsetHeight;
                item.style.animation = '';
            });
            animationHasPlayed = true;
        }
        else if (!isVisible) {
            animationHasPlayed = false;
        }
    }
    window.addEventListener('scroll', () => {
        highlightNavOnScroll();
        checkValuesVisibility();
    });
    highlightNavOnScroll();
    checkValuesVisibility();
});
//# sourceMappingURL=script.js.map