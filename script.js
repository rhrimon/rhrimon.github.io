"use strict";
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and script is running');
    const nameIntro = document.getElementById('name-intro');
    const tabbedIntro = document.getElementById('tabbed-intro');
    console.log('Initial element states:');
    console.log('nameIntro:', nameIntro?.style.display, nameIntro?.style.opacity);
    console.log('tabbedIntro:', tabbedIntro?.style.display, tabbedIntro?.style.opacity);
    if (nameIntro && tabbedIntro) {
        console.log('Setting up initial animation states');
        nameIntro.style.opacity = '1';
        nameIntro.style.display = 'flex';
        nameIntro.style.animation = 'fadeIn 1s ease forwards';
        console.log('nameIntro styles set:', 'display:', nameIntro.style.display, 'opacity:', nameIntro.style.opacity, 'animation:', nameIntro.style.animation);
        setTimeout(() => {
            console.log('Starting fadeOut animation');
            nameIntro.style.animation = 'fadeOut 1s ease forwards';
            setTimeout(() => {
                console.log('Showing tabbed content');
                nameIntro.style.display = 'none';
                tabbedIntro.style.display = 'flex';
                tabbedIntro.style.opacity = '1';
                tabbedIntro.classList.remove('hidden');
                tabbedIntro.classList.add('visible');
                console.log('tabbedIntro styles set:', 'display:', tabbedIntro.style.display, 'opacity:', tabbedIntro.style.opacity, 'classes:', tabbedIntro.className);
                initTabs();
            }, 1000);
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
                tabButtons.forEach((btn) => {
                    btn.classList.remove('active');
                });
                tabContents.forEach((content) => {
                    content.classList.remove('active');
                });
                button.classList.add('active');
                const targetId = button.getAttribute('data-target') || '';
                const targetContent = document.getElementById(targetId);
                if (targetContent) {
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