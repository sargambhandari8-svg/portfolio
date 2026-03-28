// Animation
const elements = document.querySelectorAll('.fade-up');

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('show');
    });
});
elements.forEach(el => observer.observe(el));

// Backend URL (put your Render or Railway URL)
const backendURL = 'https://myportfolio-backend.onrender.com/send'; // <-- change this

// Form submit
document.getElementById('contactForm').addEventListener('submit', async function(e) {
    e.preventDefault();

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
            alert("✅ Message Sent!");
            document.getElementById('contactForm').reset();
        } else {
            alert("⚠️ Error sending message: " + result.error);
        }
    } catch (err) {
        console.error(err);
        alert("⚠️ Could not connect to server.");
    }
});