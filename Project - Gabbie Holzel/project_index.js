function sendEmail() {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const help = document.getElementById("help").value.trim();

    // Some validation
    if (!name || !email || !subject || !help) {
        alert("Please fill in all required fields marked with *.");
        return;
    }

    // Basic email format check
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert("Please enter a valid email address.");
        return;
    }


    const body = 
    `Hello,

    You have received a new contact form submission.

    Name: ${name}
    Email: ${email}
    Phone: ${phone || "Not provided"}
    Subject: ${subject}

    Message:
    ${help}

    ------------------
    This email was sent via the contact form.
    `;


    window.location.href = `mailto:gabriela.holzel@version1.com?subject=Contact Form&body=${encodeURIComponent(body)}`;
    document.getElementById("contactForm").reset();
};
