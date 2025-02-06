// --------------------------------------------

document.addEventListener('scroll', function() {
    if (window.scrollY <= 0) {
        // Disable any scroll events when at the top
        window.scrollTo(0, 0);  // Prevent the page from scrolling up further
    }
});

// --------------------------------------------

let lastScrollY = 0; // Track the last known scroll position
const navbar = document.querySelector('.navbar'); // Replace with your navbar selector
const scrollContainers = document.querySelectorAll('.scroll-container, .desktop-container'); // Select both containers

scrollContainers.forEach(scrollContainer => {
    if (scrollContainer) {

        scrollContainer.addEventListener('scroll', () => {
            let currentScrollY = scrollContainer.scrollTop; // Get the current scroll position

            // Treat anything ≤ 20 as "at the top"
            if (currentScrollY <= 20) {
                currentScrollY = 0; // Normalize to 0
            }

            // Force navbar visible at the top
            if (currentScrollY === 0) {
                navbar.classList.remove('hidden'); // Show navbar
                lastScrollY = 0; // Reset lastScrollY to avoid false detections
                return; // Exit early
            }

            // Handle scrolling down
            if (currentScrollY > lastScrollY) {
                navbar.classList.add('hidden'); // Hide navbar
            } 
            // Handle scrolling up
            else if (currentScrollY < lastScrollY) {
                navbar.classList.remove('hidden'); // Show navbar
            }

            lastScrollY = currentScrollY; // Update the last scroll position
        });
    } else {
        console.error('Scroll container not found! Please check your selector.');
    }
});

// --------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
const statElements = document.querySelectorAll('.stat-value');

// Function to animate the count
function countUp(element, target, suffix) {
const startValue = parseInt(element.textContent, 10);
const endValue = parseInt(target, 10);
const duration = 2000; // Duration in milliseconds
const stepTime = 50;
const steps = duration / stepTime;
const increment = Math.abs(endValue - startValue) / steps;
const isCountdown = startValue > endValue;

let currentValue = startValue;
const interval = setInterval(() => {
currentValue += isCountdown ? -increment : increment;
if ((isCountdown && currentValue <= endValue) || (!isCountdown && currentValue >= endValue)) {
    currentValue = endValue;
    clearInterval(interval);
}
element.textContent = Math.floor(currentValue) + suffix;
}, stepTime);
}

// Function to handle the intersection observer
function handleIntersection(entries) {
entries.forEach(entry => {
if (entry.isIntersecting) {
    const target = entry.target.getAttribute('data-target');
    const suffix = entry.target.getAttribute('data-suffix');
    countUp(entry.target, target, suffix);
    observer.unobserve(entry.target);
}
});
}

// Create an intersection observer
const observer = new IntersectionObserver(handleIntersection, {
threshold: 0.5 // Adjust this value to determine when the element is considered in view
});

// Observe each stat element
statElements.forEach(stat => {
observer.observe(stat);
});
});

// --------------------------------------------

const mainContent = document.querySelector('main'); // Assuming <main> is the tag

// Function to determine if the navbar is visible
function isNavbarVisible() {
    return !navbar.classList.contains('hidden'); // Adjust based on your hidden class
}

// Add event listeners for hover on navbar items
const navItems = document.querySelectorAll('.nav-item');

navItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        if (isNavbarVisible()) {
            mainContent.classList.add('blur-content'); // Add blur on hover if navbar is visible
        }
    });

    item.addEventListener('mouseleave', () => {
        mainContent.classList.remove('blur-content'); // Remove blur when not hovering
    });
});

// Also apply blur when dropdown is shown
const dropdowns = document.querySelectorAll('.full-width-dropdown');

dropdowns.forEach(dropdown => {
    dropdown.addEventListener('mouseenter', () => {
        if (isNavbarVisible()) {
            mainContent.classList.add('blur-content'); // Add blur when hovering over dropdown if navbar is visible
        }
    });

    dropdown.addEventListener('mouseleave', () => {
        mainContent.classList.remove('blur-content'); // Remove blur when not hovering
    });
});

// --------------------------------------------

function expandInfo(card) {
    // Get the replacement div and arrow for the specified card
    const replacement = document.getElementById(`${card}-replacement`);
    const arrow = document.getElementById(`arrow-${card}`);

    // If the replacement div is already visible, hide it
    if (replacement.style.display === 'block') {
        replacement.style.display = 'none';
        replacement.classList.remove('active');
        arrow.classList.add('d-none'); // Hide the arrow
    } else {
        // Hide all other replacements and reset arrows
        document.querySelectorAll('.mobile-replacement').forEach((el) => {
            el.style.display = 'none';
            el.classList.remove('active');
        });
        document.querySelectorAll('.arrow').forEach((el) => el.classList.add('d-none'));

        // Show the current replacement div
        replacement.style.display = 'block';
        replacement.classList.add('active');
        arrow.classList.remove('d-none'); // Show the arrow
    }
}

// ------------------------------------------
