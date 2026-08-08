/* ============================================================
   ANIKET SIDHU — PORTFOLIO INTERACTIVITY
   Neural canvas, scroll-reveal, navbar, contact form, AI chat
   ============================================================ */

(function () {
  'use strict';

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* =================== LUCIDE ICONS =================== */
  document.addEventListener('DOMContentLoaded', () => {
    if (window.lucide) lucide.createIcons();
  });

  /* =================== NEURAL NETWORK CANVAS =================== */
  const canvas = document.getElementById('neural-canvas');
  if (canvas && !reducedMotion) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;
    let isVisible = true;
    const PARTICLE_COUNT = 70;
    const CONNECTION_DIST = 140;
    const PARTICLE_SPEED = 0.3;

    function resize() {
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    }

    function createParticles() {
      particles = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * PARTICLE_SPEED,
          vy: (Math.random() - 0.5) * PARTICLE_SPEED,
          radius: Math.random() * 1.5 + 0.5,
        });
      }
    }

    function drawParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DIST) {
            const opacity = (1 - dist / CONNECTION_DIST) * 0.15;
            ctx.strokeStyle = `rgba(0, 212, 255, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw particles
      for (const p of particles) {
        ctx.fillStyle = `rgba(0, 212, 255, 0.4)`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        // Update position
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around edges
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
      }
    }

    function animate() {
      if (!isVisible) return;
      drawParticles();
      animationId = requestAnimationFrame(animate);
    }

    // Pause when off-screen
    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible && !animationId) animate();
        else if (!isVisible && animationId) {
          cancelAnimationFrame(animationId);
          animationId = null;
        }
      },
      { threshold: 0.1 }
    );

    resize();
    createParticles();
    animate();
    heroObserver.observe(canvas.parentElement);

    window.addEventListener('resize', () => {
      resize();
      createParticles();
    });

    // Pause when tab is hidden
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        isVisible = false;
        if (animationId) { cancelAnimationFrame(animationId); animationId = null; }
      } else {
        const rect = canvas.parentElement.getBoundingClientRect();
        const inView = rect.bottom > 0 && rect.top < window.innerHeight;
        if (inView) { isVisible = true; animate(); }
      }
    });
  }

  /* =================== SCROLL REVEAL =================== */
  if (!reducedMotion) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    document.querySelectorAll('.reveal, .reveal-children').forEach((el) => {
      revealObserver.observe(el);
    });
  } else {
    // Show everything immediately
    document.querySelectorAll('.reveal, .reveal-children').forEach((el) => {
      el.classList.add('revealed');
    });
  }

  /* =================== NAVBAR =================== */
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Scroll effect — add glass blur when scrolled
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
        updateActiveNav();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  // Active section highlighting
  function updateActiveNav() {
    const sections = document.querySelectorAll('main > section[id]');
    const scrollPos = window.scrollY + 120;

    let currentSection = '';
    sections.forEach((section) => {
      if (section.offsetTop <= scrollPos) {
        currentSection = section.id;
      }
    });

    navLinks.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === `#${currentSection}`);
    });
  }

  // Hamburger toggle
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      hamburger.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when a link is clicked
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });

    // Close menu on outside click
    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('open') && !navMenu.contains(e.target) && !hamburger.contains(e.target)) {
        navMenu.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* =================== SMOOTH SCROLL =================== */
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* =================== CONTACT FORM =================== */
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const name = document.getElementById('contact-name').value.trim();
      const email = document.getElementById('contact-email').value.trim();
      const message = document.getElementById('contact-message').value.trim();

      if (!name || !email || !message) {
        showFormStatus('Please fill in all fields.', 'error');
        return;
      }

      if (!email.includes('@')) {
        showFormStatus('Please enter a valid email address.', 'error');
        return;
      }

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';

      try {
        // Try to get endpoint from server config, fall back to direct Formspree
        let endpoint;
        try {
          const configResp = await fetch('/api/config');
          if (configResp.ok) {
            const config = await configResp.json();
            endpoint = config.formspree_endpoint;
          }
        } catch {
          // Server not available, no endpoint
        }

        if (!endpoint) {
          showFormStatus('Contact form is not configured yet. Please email me directly at aniketsidhu425@gmail.com', 'error');
          submitBtn.disabled = false;
          submitBtn.textContent = 'Send Message →';
          return;
        }

        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({ name, email, message, _subject: 'Portfolio website enquiry' }),
        });

        if (response.ok) {
          showFormStatus('Message sent successfully! I\'ll get back to you soon.', 'success');
          contactForm.reset();
        } else {
          showFormStatus('Failed to send. Please email me directly.', 'error');
        }
      } catch {
        showFormStatus('Connection error. Please email me directly at aniketsidhu425@gmail.com', 'error');
      }

      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Message →';
    });
  }

  function showFormStatus(msg, type) {
    if (!formStatus) return;
    formStatus.textContent = msg;
    formStatus.className = `form-status ${type}`;
    formStatus.style.display = 'block';
    setTimeout(() => { formStatus.style.display = 'none'; }, 6000);
  }

  /* =================== AI CHAT =================== */
  const chatInput = document.getElementById('chat-input');
  const chatSend = document.getElementById('chat-send');
  const chatMessages = document.getElementById('chat-messages');
  const chatSuggestions = document.getElementById('chat-suggestions');
  const chatStatus = document.getElementById('chat-status');
  let chatHistory = [];

  // Check if server is available
  async function checkChatServer() {
    try {
      const resp = await fetch('/api/health');
      if (resp.ok) {
        if (chatStatus) { chatStatus.textContent = 'Online'; chatStatus.style.color = 'var(--accent-green)'; }
        return true;
      }
    } catch { /* server not running */ }
    if (chatStatus) { chatStatus.textContent = 'Offline — start server.py'; chatStatus.style.color = 'var(--text-secondary)'; }
    return false;
  }
  checkChatServer();

  async function sendChatMessage(question) {
    if (!question.trim()) return;

    // Add user message to UI
    appendChatMessage(question, 'user');
    chatHistory.push({ role: 'user', content: question });
    if (chatInput) chatInput.value = '';

    // Check server
    const serverOnline = await checkChatServer();
    if (!serverOnline) {
      const offline = 'The AI assistant requires the backend server. Run `python server.py` to enable it.';
      appendChatMessage(offline, 'assistant');
      chatHistory.push({ role: 'assistant', content: offline });
      return;
    }

    // Show typing indicator
    const typingEl = appendChatMessage('Thinking...', 'assistant');
    typingEl.style.opacity = '0.6';

    try {
      const resp = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: question, history: chatHistory.slice(-6) }),
      });

      if (resp.ok) {
        const data = await resp.json();
        typingEl.textContent = data.response || 'No response received.';
        typingEl.style.opacity = '1';
        chatHistory.push({ role: 'assistant', content: data.response });
      } else {
        typingEl.textContent = 'Something went wrong. Please try again.';
        typingEl.style.opacity = '1';
      }
    } catch {
      typingEl.textContent = 'Connection error. Make sure server.py is running.';
      typingEl.style.opacity = '1';
    }
  }

  function appendChatMessage(text, role) {
    const div = document.createElement('div');
    div.className = `chat-message ${role}`;
    div.textContent = text;
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return div;
  }

  if (chatSend) {
    chatSend.addEventListener('click', () => sendChatMessage(chatInput.value));
  }

  if (chatInput) {
    chatInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') sendChatMessage(chatInput.value);
    });
  }

  if (chatSuggestions) {
    chatSuggestions.addEventListener('click', (e) => {
      const btn = e.target.closest('.chat-suggestion-btn');
      if (btn) sendChatMessage(btn.dataset.question);
    });
  }

})();
