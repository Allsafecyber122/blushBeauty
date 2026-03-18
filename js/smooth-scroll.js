// Lenis Smooth Scroll Initialization
document.addEventListener("DOMContentLoaded", function() {
    // Check if Lenis is available
    if (typeof Lenis === 'undefined') {
        console.error('Lenis is not defined. Make sure the CDN is loaded.');
        return;
    }

    const lenis = new Lenis({
        duration: 1.8, // Increased for more "delay" and smoothness
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        wheelMultiplier: 1.1, // Slightly better sensitivity
        smoothWheel: true,
        smoothTouch: false,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Global access
    window.lenis = lenis;

    // Optional: Sync ScrollTrigger if available later
    if (typeof ScrollTrigger !== 'undefined') {
        lenis.on('scroll', ScrollTrigger.update);
    }

    // Handle internal links smoothly
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                lenis.scrollTo(target);
            }
        });
    });
});
