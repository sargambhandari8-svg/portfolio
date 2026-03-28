// Animation
const elements = document.querySelectorAll('.fade-up');
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('show');
    });
});
elements.forEach(el => observer.observe(el));

// Backend URL
const backendURL = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
    ? 'http://localhost:5000/send'
    : 'https://your-deployed-backend-url.onrender.com/send'; // Replace with deployed URL

// Contact form submit
document.getElementById('contactForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const data = {
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        message: document.getElementById('message').value.trim()
    };

    if (!data.name || !data.email || !data.message) {
        alert("⚠️ Please fill all fields");
        return;
    }

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
        console.error("Error sending message:", err);
        alert("⚠️ Could not connect to server. Make sure backend is running.");
    }
});