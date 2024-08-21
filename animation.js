document.addEventListener('DOMContentLoaded', function () {
    const imageElements = document.querySelectorAll('.slide-up-image');
    const textElements = document.querySelectorAll('.slide-up');

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
        imageElements.forEach((el) => {
            if (isInView(el)) {
                el.classList.add('in-view');
            }
        });

        textElements.forEach((el) => {
            if (isInView(el)) {
                el.classList.add('in-view');
            }
        });
    };

    window.addEventListener('scroll', checkAnimation);
    checkAnimation(); // Initial check on page load
});