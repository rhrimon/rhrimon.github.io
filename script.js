document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM fully loaded and script is running');
    // Intro section animation
    var nameIntro = document.getElementById('name-intro');
    var tabbedIntro = document.getElementById('tabbed-intro');
    console.log('Initial element states:');
    console.log('nameIntro:', nameIntro);
    console.log('tabbedIntro:', tabbedIntro);
    if (nameIntro && tabbedIntro) {
        console.log('Setting up animation sequence');
        // Start with name intro visible
        nameIntro.classList.add('visible');
        // After 2 seconds, start the transition
        setTimeout(function () {
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
    }
    else {
        console.error('One or both elements not found');
        console.error('nameIntro:', nameIntro);
        console.error('tabbedIntro:', tabbedIntro);
    }
    // Tab functionality
    function initTabs() {
        console.log('Initializing tabs');
        var tabButtons = document.querySelectorAll('.tab-btn');
        var tabContents = document.querySelectorAll('.tab-content');
        console.log('Tab buttons found:', tabButtons.length);
        console.log('Tab contents found:', tabContents.length);
        tabButtons.forEach(function (button) {
            button.addEventListener('click', function () {
                var tabId = button.getAttribute('data-tab') || '';
                var targetContent = document.getElementById("".concat(tabId, "-content"));
                // If already active, do nothing
                if (button.classList.contains('active')) {
                    return;
                }
                // Remove active class from all buttons
                tabButtons.forEach(function (btn) {
                    btn.classList.remove('active');
                });
                // Find currently active content
                var activeContent = document.querySelector('.tab-content.active');
                if (activeContent && targetContent) {
                    activeContent.classList.add('fade-out');
                    // Wait for animation to complete before switching content
                    setTimeout(function () {
                        tabContents.forEach(function (content) {
                            content.classList.remove('active');
                            content.classList.remove('fade-out');
                        });
                        // Add active class to clicked button and corresponding content
                        button.classList.add('active');
                        targetContent.classList.add('active');
                    }, 300); // Match this to the CSS animation duration
                }
                else if (targetContent) {
                    // If no active content (first load), just activate the new content
                    button.classList.add('active');
                    targetContent.classList.add('active');
                }
            });
        });
    }
    // Remove any potential inline styles from all navigation links
    var allLinks = document.querySelectorAll('nav ul li a');
    allLinks.forEach(function (link) {
        // Remove any inline styles that might be causing underlines
        link.style.removeProperty('text-decoration');
        link.style.setProperty('text-decoration', 'none', 'important');
        // Remove any attributes that might be causing styling issues
        if (link.hasAttribute('style')) {
            var currentStyle = link.getAttribute('style') || '';
            link.setAttribute('style', currentStyle.replace(/text-decoration:[^;]+;?/gi, ''));
        }
    });
    // Smooth scrolling for navigation links
    var navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(function (link) {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            var targetId = link.getAttribute('href') || '';
            var targetElement = document.querySelector(targetId);
            if (targetElement) {
                var offsetTop = targetElement.offsetTop;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                // Update URL hash without scrolling
                history.pushState(null, '', targetId);
                // Update active state in navigation
                navLinks.forEach(function (navLink) {
                    navLink.classList.remove('active');
                });
                link.classList.add('active');
            }
        });
    });
    var sections = document.querySelectorAll('.section');
    var navItems = document.querySelectorAll('nav ul li a');
    function highlightNavOnScroll() {
        var scrollPosition = window.scrollY;
        sections.forEach(function (section) {
            var sectionTop = section.offsetTop - 100;
            var sectionHeight = section.offsetHeight;
            var sectionId = section.getAttribute('id');
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight && sectionId) {
                navItems.forEach(function (item) {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === "#".concat(sectionId)) {
                        item.classList.add('active');
                        // Ensure no text-decoration when active class is added
                        item.style.setProperty('text-decoration', 'none', 'important');
                    }
                });
            }
        });
    }
    // Add active class style in CSS with !important to override any other styles
    var style = document.createElement('style');
    style.textContent = "\n        nav ul li a.active {\n            color: #fff !important;\n            opacity: 1 !important;\n            font-weight: 600 !important;\n            text-decoration: none !important;\n        }\n        \n        /* Additional rules to ensure no underlines */\n        nav ul li a, \n        nav ul li a:hover, \n        nav ul li a:active, \n        nav ul li a:focus,\n        nav ul li a.active {\n            text-decoration: none !important;\n            border-bottom: none !important;\n            box-shadow: none !important;\n        }\n    ";
    document.head.appendChild(style);
    // Values section animation reset
    var valuesSection = document.getElementById('values');
    var valueItems = document.querySelectorAll('.values-item');
    var animationHasPlayed = false;
    function checkValuesVisibility() {
        if (!valuesSection)
            return;
        var rect = valuesSection.getBoundingClientRect();
        var isVisible = (rect.top <= window.innerHeight * 0.75 && rect.bottom >= 0);
        if (isVisible && !animationHasPlayed) {
            // Reset animations by removing and re-adding the elements
            valueItems.forEach(function (item) {
                item.style.animation = 'none';
                item.offsetHeight; // Trigger reflow
                item.style.animation = '';
            });
            animationHasPlayed = true;
        }
        else if (!isVisible) {
            animationHasPlayed = false;
        }
    }
    // Scroll animation for sections
    // Track last scroll position to determine scroll direction
    var lastScrollTop = 0;
    // Get the sections we want to animate
    var workSection = document.getElementById('work');
    var aboutSection = document.getElementById('about');
    var contactSection = document.getElementById('contact');
    // For values section, we'll only animate the right side content to preserve the existing animations
    var valuesRightContent = valuesSection ? valuesSection.querySelector('.values-right') : null;
    // Store sections in an array for easier processing
    var sectionsToAnimate = [];
    // Add sections to the array if they exist
    if (workSection)
        sectionsToAnimate.push({ element: workSection, hasAnimated: false });
    if (valuesRightContent)
        sectionsToAnimate.push({ element: valuesRightContent, hasAnimated: false });
    if (aboutSection)
        sectionsToAnimate.push({ element: aboutSection, hasAnimated: false });
    if (contactSection)
        sectionsToAnimate.push({ element: contactSection, hasAnimated: false });
    function handleScrollAnimations() {
        // Get current scroll position
        var scrollTop = window.scrollY || document.documentElement.scrollTop;
        // Determine scroll direction
        var scrollDirection = scrollTop > lastScrollTop ? 'down' : 'up';
        // Update last scroll position
        lastScrollTop = scrollTop;
        // Process each section
        sectionsToAnimate.forEach(function (section) {
            var rect = section.element.getBoundingClientRect();
            var isVisible = (rect.top <= window.innerHeight * 0.8 && rect.bottom >= 0);
            // If section is visible and hasn't been animated yet
            if (isVisible && !section.hasAnimated) {
                // Add the scroll-animate class
                section.element.classList.add('scroll-animate');
                // Add the appropriate animation class based on scroll direction
                if (scrollDirection === 'down') {
                    section.element.classList.add('fade-from-bottom');
                }
                else {
                    section.element.classList.add('fade-from-top');
                }
                // Mark as animated
                section.hasAnimated = true;
                // Remove animation classes after animation completes
                setTimeout(function () {
                    section.element.classList.remove('scroll-animate', 'fade-from-bottom', 'fade-from-top');
                }, 600); // Match this to the CSS animation duration
            }
            // Reset animation state when section is no longer visible
            else if (!isVisible) {
                section.hasAnimated = false;
            }
        });
    }
    // Combined event listener for all scroll functions
    window.addEventListener('scroll', function () {
        highlightNavOnScroll();
        checkValuesVisibility();
        handleScrollAnimations();
    });
    // Initial calls
    highlightNavOnScroll();
    checkValuesVisibility();
    handleScrollAnimations();
});
