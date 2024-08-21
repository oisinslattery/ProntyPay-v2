document.addEventListener('DOMContentLoaded', function () {
    const elements = document.querySelectorAll('.slide-up');

    const isInView = (el) => {
        const rect = el.getBoundingClientRect();
        const windowHeight = (window.innerHeight || document.documentElement.clientHeight);
        const triggerPoint = windowHeight / 2;

        return (
            rect.top <= triggerPoint && 
            rect.bottom >= 0
        );
    };

    const checkAnimation = () => {
        elements.forEach((el) => {
            if (isInView(el)) {
                el.classList.add('in-view');
            }
        });
    };

    window.addEventListener('scroll', checkAnimation);
    checkAnimation(); // Initial check on page load
});