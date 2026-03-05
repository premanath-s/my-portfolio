document.addEventListener('DOMContentLoaded', () => {
  // Mobile nav toggle
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  function setNavOpen(open) {
    if (!navToggle || !navLinks) return;
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    if (open) navLinks.classList.add('show'); else navLinks.classList.remove('show');
  }

  if (navToggle) {
    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      setNavOpen(!expanded);
    });
  }

  // Smooth scrolling for anchor links and close mobile nav after click
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = link.getAttribute('href');
      if (target === '#') return;
      const el = document.querySelector(target);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setNavOpen(false);
      }
    });
  });

  // EmailJS contact form handling
  if (typeof emailjs !== 'undefined') {
    emailjs.init('S2Jw_tLs2eBqBJ-b-');

    const form = document.getElementById('contactForm');
    const status = document.querySelector('.form-status');
    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) submitBtn.disabled = true;
        if (status) { status.textContent = 'Sending...'; status.style.color = 'inherit'; }

        emailjs.sendForm('service_xt39fvi', 'template_y0zvh8o', this)
          .then(() => {
            if (status) { status.textContent = 'Message sent successfully!'; status.style.color = 'green'; }
            form.reset();
            if (submitBtn) submitBtn.disabled = false;
          })
          .catch(err => {
            console.error(err);
            if (status) { status.textContent = 'Failed to send message.'; status.style.color = 'crimson'; }
            if (submitBtn) submitBtn.disabled = false;
          });
      });
    }
  }

});
