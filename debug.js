// Debug script to manually trigger the tabbed interface
// Add this to your browser console to debug

function debugTabbedInterface() {
    console.log('Running debug script');
    
    // Get elements
    const nameIntro = document.getElementById('name-intro');
    const tabbedIntro = document.getElementById('tabbed-intro');
    
    console.log('nameIntro:', nameIntro);
    console.log('tabbedIntro:', tabbedIntro);
    
    if (nameIntro && tabbedIntro) {
        console.log('Elements found, manually triggering animation');
        
        // Hide name intro
        nameIntro.style.display = 'none';
        
        // Show tabbed intro
        tabbedIntro.classList.remove('hidden');
        tabbedIntro.style.display = 'flex';
        tabbedIntro.style.opacity = '1';
        tabbedIntro.classList.add('visible');
        
        // Initialize tabs
        const tabButtons = document.querySelectorAll('.tab-btn');
        const tabContents = document.querySelectorAll('.tab-content');
        
        console.log('Tab buttons:', tabButtons.length);
        console.log('Tab contents:', tabContents.length);
        
        tabButtons.forEach(function(button) {
            button.addEventListener('click', function() {
                console.log('Tab button clicked:', this.getAttribute('data-target'));
                
                // Remove active class from all buttons and contents
                tabButtons.forEach(function(btn) {
                    btn.classList.remove('active');
                });
                
                tabContents.forEach(function(content) {
                    content.classList.remove('active');
                });
                
                // Add active class to clicked button and corresponding content
                button.classList.add('active');
                const targetId = button.getAttribute('data-target');
                const targetContent = document.getElementById(targetId);
                
                if (targetContent) {
                    targetContent.classList.add('active');
                } else {
                    console.error('Target content not found:', targetId);
                }
            });
        });
        
        return 'Debug script executed successfully';
    } else {
        console.error('Elements not found');
        return 'Error: Elements not found';
    }
}

// Instructions:
// 1. Open your website in a browser
// 2. Open the browser console (F12 or right-click > Inspect > Console)
// 3. Copy and paste this entire script into the console
// 4. Run the function by typing: debugTabbedInterface()
// 5. Check the console for any errors or messages 