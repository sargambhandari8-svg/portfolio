// Backend URL (Render deployment)
const backendURL = 'https://portfolio-x23d.onrender.com/send'; // <-- change to your Render URL

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