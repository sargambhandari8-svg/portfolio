// Animation
const elements = document.querySelectorAll('.fade-up');

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
});

elements.forEach(el => observer.observe(el));

// Backend URL (LOCAL)
const backendURL = 'https://sargam-portfolio.onrender.com/send';
// Form submit
document.getElementById('contactForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    alert("⏳ Sending message..."); // instant feedback

    const data = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };

    try {
        const res = await fetch(backendURL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        const result = await res.json();

        if (result.success) {
            alert("✅ Message Sent Successfully!");
            document.getElementById('contactForm').reset();
        } else {
            alert("❌ Email failed");
        }

    } catch (err) {
        console.error(err);
        alert("⚠️ Server not running!");
    }
});