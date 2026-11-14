/* Resume details and the existing Flask/Gemini + Formspree integrations. */
(() => {
  'use strict';

  const email = 'aniketsidhu425@gmail.com';
  const dialog = document.createElement('dialog');
  dialog.className = 'detail-dialog';
  dialog.id = 'details-dialog';
  dialog.setAttribute('aria-labelledby', 'detail-title');
  dialog.innerHTML = `
    <div class="detail-header">
      <div><p class="detail-kicker">ANIKET SIDHU / MORE TO EXPLORE</p><h2 id="detail-title">The details.</h2></div>
      <button class="detail-close" type="button" aria-label="Close portfolio details" autofocus>×</button>
    </div>
    <div class="detail-tabs" role="tablist" aria-label="Portfolio details">
      <button type="button" role="tab" id="detail-tab-resume" aria-controls="detail-panel-resume" aria-selected="true" data-detail-tab="resume">Resume</button>
      <button type="button" role="tab" id="detail-tab-assistant" aria-controls="detail-panel-assistant" aria-selected="false" tabindex="-1" data-detail-tab="assistant">Ask my AI</button>
      <button type="button" role="tab" id="detail-tab-contact" aria-controls="detail-panel-contact" aria-selected="false" tabindex="-1" data-detail-tab="contact">Contact</button>
    </div>
    <div class="detail-content">
      <section class="detail-panel" role="tabpanel" id="detail-panel-resume" aria-labelledby="detail-tab-resume" tabindex="0">
        <p class="detail-lede">Information Technology undergraduate at MSIT, GGSIPU, focused on applied AI, computer vision, generative AI, full-stack engineering, and data science.</p>
        <section class="detail-section"><h3>Education</h3><ul class="detail-list"><li><strong>B.Tech · Information Technology</strong><span>Maharaja Surajmal Institute of Technology, GGSIPU, New Delhi · 2024–2028</span><span>CGPA 8.73 / 10 through Semester 4</span><span>SGPA · Semesters 1–4: 9.08 · 7.96 · 9.19 · 8.65</span></li></ul></section>
        <section class="detail-section"><h3>Experience</h3><ul class="detail-list"><li><strong>Machine Learning Intern · CodeAlpha</strong><span>Remote · 10 August–10 September 2026</span><p>Built MedPredict AI for disease prediction using React/Vite and FastAPI, and an explainable German Credit risk-scoring pipeline with SHAP explanations and a Streamlit analytics dashboard. Used Docker and GitHub Actions for delivery.</p></li></ul></section>
        <section class="detail-section"><h3>Selected resume projects</h3><ul class="detail-list detail-projects">
          <li><a href="https://github.com/aniketsidhu123/Planetary_Biosignature" target="_blank" rel="noopener noreferrer"><strong>ExoScope ↗</strong></a><span>Exoplanet habitability and biosignature-likelihood analysis · Python · XGBoost · SHAP</span></li>
          <li><a href="https://github.com/Arpitgit06/NSUT-Finance" target="_blank" rel="noopener noreferrer"><strong>KAVACH Risk Command Center ↗</strong></a><span>Team project · Fintech risk platform with 3D analyst visualizations · React · Three.js</span></li>
          <li><a href="https://github.com/aniketsidhu123/CodeCubicle" target="_blank" rel="noopener noreferrer"><strong>Tracelight ↗</strong></a><span>AI data-intelligence platform and structured web research · Python · PyTorch · Playwright</span></li>
          <li><a href="https://github.com/aniketsidhu123/Teach-Chhota" target="_blank" rel="noopener noreferrer"><strong>Teach Chhota ↗</strong></a><span>Team Recursive Bytes · Offline-first AI learning companion · React · TypeScript · Gemini · RAG</span></li>
          <li><a href="https://github.com/aniketsidhu123/ISRO_Hackathon_IR_Enhancement" target="_blank" rel="noopener noreferrer"><strong>TESSERACTZ ↗</strong></a><span>Team project · Satellite image enhancement for Bharatiya Antariksh Hackathon · Python · PyTorch · YOLOv8</span></li>
          <li><a href="https://github.com/aniketsidhu123/GrandPrixGeekRoom" target="_blank" rel="noopener noreferrer"><strong>Crowd Flow Optimiser ↗</strong></a><span>Computer-vision crowd digital twin with forecasting and rerouting · Python · YOLOv8 · MiDaS</span></li>
        </ul></section>
        <section class="detail-section"><h3>Skills</h3><ul class="detail-list">
          <li><strong>AI & machine learning</strong><p>PyTorch · TensorFlow / Keras · Scikit-learn · XGBoost · SHAP · OpenCV · YOLOv8 · Generative AI · RAG</p></li>
          <li><strong>Web & backend</strong><p>React · Vite · Node.js / Express · FastAPI · Flask · Streamlit · Tailwind CSS · Three.js · REST APIs</p></li>
          <li><strong>Data & languages</strong><p>Python · JavaScript / TypeScript · HTML / CSS · Pandas · NumPy · BeautifulSoup4 · Jupyter</p></li>
          <li><strong>Tools & delivery</strong><p>Docker · Git / GitHub · GitHub Actions / CI/CD · Playwright · Gemini API · Claude API</p></li>
        </ul></section>
        <section class="detail-section"><h3>Hackathons & recognition</h3><ul class="detail-list">
          <li><strong>Horizon by Hoollow</strong><span>1st Runner-Up · Team Recursive Bytes · National-level AI in Education · October 2026</span></li>
          <li><strong>Fintechstico V7.0</strong><span>Finalist · Top 10 teams · October 2026</span></li>
          <li><strong>Smart India Hackathon 2025</strong><span>Nominated · Team CODEFORGE</span></li>
          <li><strong>IEEE MSIT Decode Dilemma</strong><span>Finalist · August 2024</span></li>
          <li><strong>Hack Vortex</strong><span>Top 50 participating teams · September 2024</span></li>
          <li><strong>BVP HEX</strong><span>Hackathon participant · October 2024</span></li>
          <li><strong>DTU STEP</strong><span>Certificate of Merit · Sustainability poster · October 2023</span></li>
        </ul></section>
        <section class="detail-section"><h3>Certifications</h3><ul class="detail-list detail-certificates">
          <li><strong>GenAI Powered Data Analytics Job Simulation</strong><span>Forage · Tata · June 2026</span></li>
          <li><strong>Advanced Software Engineering Job Simulation</strong><span>Forage · Walmart Global Tech</span></li>
          <li><strong>Introduction to Generative AI</strong><span>Google Cloud Skills Boost · January 2026</span></li>
          <li><strong>Introduction to Generative AI</strong><span>SkillUp by Simplilearn</span></li>
          <li><strong>What Is Generative AI?</strong><span>LinkedIn Learning</span></li>
          <li><strong>Claude Code 101</strong><span>Anthropic · July 2026</span></li>
          <li><strong>AI for Beginners</strong><span>HP LIFE · HP Foundation · February 2026</span></li>
          <li><strong>Critical Thinking in the AI Era</strong><span>HP LIFE · HP Foundation</span></li>
          <li><strong>Data Science & Analytics</strong><span>HP LIFE · HP Foundation · June 2026</span></li>
          <li><strong>Introduction to Cybersecurity Awareness</strong><span>HP LIFE · HP Foundation</span></li>
          <li><strong>Technology Job Simulation</strong><span>Forage · Deloitte Australia · July 2025</span></li>
        </ul></section>
        <section class="detail-section"><h3>Additional projects</h3><p class="detail-muted">AI Portfolio · AmbitionBox Company Scraper · Eye-Controlled Mouse · VoiceGuard</p></section>
        <p class="detail-muted"><a href="https://www.linkedin.com/in/aniket-sidhu-9bb180373" target="_blank" rel="noopener noreferrer">Explore my professional experience and credentials on LinkedIn ↗</a></p>
      </section>
      <section class="detail-panel" role="tabpanel" id="detail-panel-assistant" aria-labelledby="detail-tab-assistant" tabindex="0" hidden>
        <p class="detail-lede">Ask about my projects, technical skills, internship, or education.</p>
        <div class="detail-chat">
          <div class="detail-chat-header"><strong>Portfolio assistant</strong><span id="detail-chat-status" role="status">Checking availability…</span></div>
          <div class="detail-chat-messages" id="detail-chat-messages" role="log" aria-live="polite" aria-label="Conversation"><div class="detail-message assistant">Hi, I'm Aniket's AI assistant. What would you like to know about his work?</div></div>
          <div class="detail-chat-suggestions" id="detail-chat-suggestions"><button type="button" data-question="What are your strongest technical skills?">Technical skills ↗</button><button type="button" data-question="Tell me about your projects.">Projects ↗</button><button type="button" data-question="What are your semester grades?">Semester grades ↗</button></div>
          <form class="detail-chat-form" id="detail-chat-form"><label class="sr-only" for="detail-chat-input">Your question</label><input id="detail-chat-input" maxlength="2000" placeholder="Ask about my work…" autocomplete="off" required><button id="detail-chat-send" type="submit" aria-label="Send question">↗</button></form>
        </div><p class="detail-muted">Powered by Google Gemini. If the assistant is unavailable, <a href="mailto:${email}">email me directly ↗</a>.</p>
      </section>
      <section class="detail-panel" role="tabpanel" id="detail-panel-contact" aria-labelledby="detail-tab-contact" tabindex="0" hidden>
        <p class="detail-lede">New ideas. Ambitious projects. A conversation is a good start.</p>
        <div class="detail-contact-links"><a href="mailto:${email}">${email} ↗</a><a href="https://www.linkedin.com/in/aniket-sidhu-9bb180373" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a></div><p class="detail-muted">New Delhi, India</p>
        <form class="detail-form" id="detail-contact-form">
          <label for="detail-contact-name">Your name</label><input id="detail-contact-name" name="name" autocomplete="name" required maxlength="120" placeholder="Your name">
          <label for="detail-contact-email">Email address</label><input id="detail-contact-email" name="email" type="email" autocomplete="email" required maxlength="254" placeholder="you@example.com">
          <label for="detail-contact-message">What are you thinking?</label><textarea id="detail-contact-message" name="message" required maxlength="5000" rows="5" placeholder="Tell me a little about your idea…"></textarea>
          <button type="submit">Send message ↗</button><p id="detail-form-status" role="status" aria-live="polite"></p>
        </form>
      </section>
    </div>`;
  document.body.append(dialog);

  const get = (id) => document.getElementById(id);
  const tabs = [...dialog.querySelectorAll('[data-detail-tab]')];
  let opener = null;
  let healthRequest = null;
  let chatReady = false;
  let chatBusy = false;
  const chatHistory = [];

  async function fetchJSON(url, options = {}, timeoutMs = 20000) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const response = await fetch(url, { ...options, signal: controller.signal });
      const body = response.status === 204 ? {} : await response.json().catch(() => ({}));
      if (!response.ok) {
        const error = new Error(`Request failed (${response.status})`);
        error.publicMessage = typeof body.error === 'string' ? body.error : null;
        error.status = response.status;
        error.code = body.code;
        throw error;
      }
      return body;
    } finally { clearTimeout(timeout); }
  }

  function checkHealth() {
    if (healthRequest) return healthRequest;
    const status = get('detail-chat-status');
    status.textContent = 'Checking availability…';
    healthRequest = fetchJSON('/api/health').then((health) => {
      chatReady = health.gemini_ready === true;
      const labels = { configured: 'Ready', available: 'Available', quota_exceeded: 'Usage limit reached', temporarily_unavailable: 'Connection issue' };
      status.textContent = labels[health.gemini_status] || (chatReady ? 'Ready' : 'Currently unavailable');
    }).catch(() => {
      chatReady = false;
      status.textContent = 'Currently unavailable';
    }).finally(() => { healthRequest = null; });
    return healthRequest;
  }

  function selectPanel(name, focusTab = false) {
    if (!['resume', 'assistant', 'contact'].includes(name)) name = 'resume';
    tabs.forEach((tab) => {
      const selected = tab.dataset.detailTab === name;
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
      get(`detail-panel-${tab.dataset.detailTab}`).hidden = !selected;
      if (selected && focusTab) tab.focus();
    });
    get('detail-title').textContent = { resume: 'The details.', assistant: 'Ask away.', contact: 'Let’s talk.' }[name];
    dialog.querySelector('.detail-content').scrollTop = 0;
    if (name === 'assistant') void checkHealth();
  }

  document.addEventListener('click', (event) => {
    const trigger = event.target.closest('[data-panel]');
    if (!trigger || !['resume', 'assistant', 'contact'].includes(trigger.dataset.panel)) return;
    event.preventDefault();
    opener = trigger;
    selectPanel(trigger.dataset.panel);
    if (!dialog.open) dialog.showModal();
    document.documentElement.classList.add('details-open');
    dialog.querySelector('.detail-close').focus();
  });
  dialog.querySelector('.detail-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => {
    document.documentElement.classList.remove('details-open');
    if (opener?.isConnected) opener.focus({ preventScroll: true });
  });
  dialog.addEventListener('click', (event) => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  });
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => selectPanel(tab.dataset.detailTab));
    tab.addEventListener('keydown', (event) => {
      let next;
      if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
      if (event.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = tabs.length - 1;
      if (next === undefined) return;
      event.preventDefault();
      selectPanel(tabs[next].dataset.detailTab, true);
    });
  });

  function appendMessage(message, role) {
    const item = document.createElement('div');
    item.className = `detail-message ${role}`;
    item.textContent = message;
    const messages = get('detail-chat-messages');
    messages.append(item);
    messages.scrollTop = messages.scrollHeight;
    return item;
  }

  async function sendChat(question) {
    question = question.trim();
    if (!question || chatBusy) return;
    chatBusy = true;
    get('detail-chat-send').disabled = true;
    dialog.querySelectorAll('[data-question]').forEach((button) => { button.disabled = true; });
    appendMessage(question, 'user');
    get('detail-chat-input').value = '';
    const reply = appendMessage('Thinking…', 'assistant');
    try {
      if (healthRequest) await healthRequest;
      if (!chatReady) {
        reply.textContent = `The assistant is currently unavailable. Explore my public projects or email ${email}.`;
        return;
      }
      const history = [...chatHistory, { role: 'user', content: question }].slice(-6);
      const result = await fetchJSON('/api/chat', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: question, history })
      }, 60000);
      reply.textContent = typeof result.response === 'string' && result.response.trim() ? result.response : 'I could not answer that just now. Please try again.';
      get('detail-chat-status').textContent = 'Available';
      chatHistory.push({ role: 'user', content: question }, { role: 'assistant', content: reply.textContent });
      if (chatHistory.length > 12) chatHistory.splice(0, chatHistory.length - 12);
    } catch (error) {
      reply.textContent = error.publicMessage || `The assistant could not respond just now. Please try again or email ${email}.`;
      get('detail-chat-status').textContent = error.status === 429 ? 'Usage limit reached' : 'Connection issue';
      if ([401, 403, 404].includes(error.status)) chatReady = false;
    }
    finally {
      chatBusy = false;
      get('detail-chat-send').disabled = false;
      dialog.querySelectorAll('[data-question]').forEach((button) => { button.disabled = false; });
      const messages = get('detail-chat-messages');
      messages.scrollTop = messages.scrollHeight;
    }
  }
  get('detail-chat-form').addEventListener('submit', (event) => {
    event.preventDefault();
    if (event.currentTarget.reportValidity()) void sendChat(get('detail-chat-input').value);
  });
  get('detail-chat-suggestions').addEventListener('click', (event) => {
    const button = event.target.closest('[data-question]');
    if (button) void sendChat(button.dataset.question);
  });

  const contactForm = get('detail-contact-form');
  contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!contactForm.reportValidity()) return;
    const name = get('detail-contact-name').value.trim();
    const fromEmail = get('detail-contact-email').value.trim();
    const message = get('detail-contact-message').value.trim();
    const status = get('detail-form-status');
    const submit = contactForm.querySelector('[type="submit"]');
    if (!name || !fromEmail || !message) {
      status.textContent = 'Please complete all three fields.';
      return;
    }
    submit.disabled = true;
    status.textContent = 'Preparing your message…';
    try {
      let config;
      try { config = await fetchJSON('/api/config'); } catch { config = {}; }
      if (!config.formspree_endpoint) {
        status.textContent = `Message delivery is currently unavailable. Your message has not been sent. Please email ${email} directly using the link above.`;
        return;
      }
      status.textContent = 'Sending your message…';
      await fetchJSON(config.formspree_endpoint, {
        method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name, email: fromEmail, message, _subject: 'Portfolio enquiry' })
      });
      status.textContent = 'Message sent. Thanks for reaching out!';
      contactForm.reset();
    } catch { status.textContent = `Your message could not be sent. Please try again or email ${email}.`; }
    finally { submit.disabled = false; }
  });
})();
