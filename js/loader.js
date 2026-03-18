document.addEventListener("DOMContentLoaded", function() {
    const loader = document.getElementById('custom-loader');
    const oldLoader = document.getElementById('ftco-loader');
    
    // Counter removed - animation now runs on every reload as requested
    // sessionStorage check removed

    // Safety fallback: Force enable scroll after 5 seconds if animation hangs
    setTimeout(() => {
        if (loader) loader.style.display = 'none';
        document.body.classList.remove('loading');
    }, 5000);

    // Register GSAP plugins
    gsap.registerPlugin(TextPlugin);

    const tl = gsap.timeline({
        onComplete: function() {
            // Animation finished - slide the entire loader upward
            gsap.to(loader, {
                y: "-100%",
                duration: 1.2,
                ease: "expo.inOut",
                onComplete: function() {
                    loader.style.display = 'none';
                    document.body.classList.remove('loading');
                }
            });
        }
    });

    // Initial state: hide and position elements for "fade up"
    gsap.set("#loader-text", { opacity: 0, y: 30 });

    // 1. Fade up and Typewriter effect for Blush Beauty
    tl.to("#loader-text", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out"
    })
    .to("#loader-text", {
        duration: 1.5,
        text: "Blush Beauty",
        ease: "none"
    }, "-=0.2");

    // 2. Final fade up exit for content within the loader
    tl.to(".loader-content", {
        opacity: 0,
        y: -40,
        duration: 0.8,
        ease: "power2.in"
    }, "+=0.3");

    // Ensure legacy loader is hidden
    if (oldLoader) {
        oldLoader.classList.remove('show');
    }
});
