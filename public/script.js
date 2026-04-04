// Contact form popup
document.getElementById('contactForm').addEventListener('submit', function(e){
    e.preventDefault();
    alert("✅ Message sent!");
    this.reset();
});

// Fade-up animations on scroll
const faders = document.querySelectorAll('.fade-up');

const appearOptions = { threshold: 0.2, rootMargin: "0px 0px -50px 0px" };

const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('show');
        observer.unobserve(entry.target);
    });
}, appearOptions);

faders.forEach(fader => appearOnScroll.observe(fader));