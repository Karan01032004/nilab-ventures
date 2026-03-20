// public/js/animations.js
(function () {
    const initScrollAnimations = () => {
        const targets = document.querySelectorAll('[class*="slide-"]');

        const observerOptions = {
            threshold: 0.15, // Jab 15% element dikhe tab start ho
            rootMargin: "0px 0px -50px 0px" // Thoda screen ke andar aane par trigger
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal-now');
                    // Ek baar animate hone ke baad observe karna band kar dein (Performance)
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        targets.forEach(target => observer.observe(target));
    };

    // DOM ready hone par check karein
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initScrollAnimations);
    } else {
        initScrollAnimations();
    }
})();