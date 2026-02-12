// Smooth scrolling
document.querySelectorAll("nav a").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    document.querySelector(link.getAttribute("href"))
      .scrollIntoView({ behavior: "smooth" });
  });
});

// EmailJS setup
emailjs.init("YOUR_USER_ID");

const form = document.getElementById("contactForm");
const status = document.querySelector(".form-status");

form.addEventListener("submit", e => {
  e.preventDefault();

  const formData = {
    from_name: form.name.value,
    from_email: form.email.value,
    message: form.message.value
  };

  emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", formData)
    .then(() => {
      status.textContent = "Message sent successfully!";
      form.reset();
    })
    .catch(() => {
      status.textContent = "Something went wrong!";
    });
});
