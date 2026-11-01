(() => {
  'use strict';
  const $ = (id) => document.getElementById(id);
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const mobile = matchMedia('(max-width: 760px)');
  document.documentElement.classList.add('js');
  try {
    if (sessionStorage.getItem('portfolio-intro')) document.querySelector('.intro').classList.add('seen');
    sessionStorage.setItem('portfolio-intro', '1');
  } catch { /* Storage may be unavailable in a private browser. */ }

  const menu = document.querySelector('.menu-toggle');
  const navigation = $('navigation');
  function closeMenu() {
    navigation.classList.remove('open');
    menu.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-label', 'Open menu');
  }
  menu.addEventListener('click', () => {
    const open = navigation.classList.toggle('open');
    menu.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });
  navigation.addEventListener('click', (event) => { if (event.target.closest('a')) closeMenu(); });
  document.addEventListener('click', (event) => { if (!event.target.closest('.header')) closeMenu(); });
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape') { closeMenu(); } });
  mobile.addEventListener('change', closeMenu);
  const clock = () => { $('local-time').textContent = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit' }).format(new Date()) + ' IST'; };
  clock();
  setInterval(clock, 60000);
  $('year').textContent = new Date().getFullYear();

  /* Scroll-bound expansion and horizontal journey, with natural document flow
     on smaller screens and for reduced-motion visitors. */
  const about = $('about');
  const art = document.querySelector('.about-art');
  const experience = $('experience');
  const track = document.querySelector('.experience-track');
  const progress = document.querySelector('.journey-progress > span');
  const clamp = (n, min, max) => Math.min(max, Math.max(min, n));
  let scrollFrame = 0;
  function renderScroll() {
    scrollFrame = 0;
    if (motion.matches || mobile.matches) { art.style.transform = ''; track.style.transform = ''; return; }
    const aboutRect = about.getBoundingClientRect();
    const aboutProgress = clamp(-aboutRect.top / Math.max(1, about.offsetHeight - innerHeight), 0, 1);
    art.style.transform = `scale(${1 + aboutProgress * .48})`;
    const rect = experience.getBoundingClientRect();
    const journeyProgress = clamp(-rect.top / Math.max(1, experience.offsetHeight - innerHeight), 0, 1);
    track.style.transform = `translate3d(${-journeyProgress * (track.scrollWidth - track.clientWidth)}px,0,0)`;
    progress.style.transform = `translateX(${journeyProgress * 200}%)`;
  }
  function queueScroll() { if (!scrollFrame) scrollFrame = requestAnimationFrame(renderScroll); }
  addEventListener('scroll', queueScroll, { passive: true });
  addEventListener('resize', queueScroll, { passive: true });
  motion.addEventListener('change', queueScroll);
  renderScroll();

  /* Cylindrical project reel: actual 3D faces, pointer drag, bounded inertia,
     explicit controls, keyboard navigation, and native dialog inspection. */
  const projects = window.PORTFOLIO_PROJECTS;
  const stage = $('works-stage');
  const drum = $('works-drum');
  const dialog = $('project-dialog');
  let selected = 0;
  let target = 0;
  let rotation = 0;
  let reelFrame = 0;
  let dragging = false;
  let startY = 0;
  let startX = 0;
  let touchDrag = false;
  let startTarget = 0;
  let lastY = 0;
  let velocity = 0;
  let lastTime = 0;
  let moved = false;
  const step = 360 / projects.length;
  function cover(project) {
    const result = document.createElement('div');
    result.className = `card-art art-${project.art}`;
    const top = document.createElement('div'); top.className = 'art-top';
    const brand = document.createElement('span'); brand.textContent = 'AS / Selected work';
    const label = document.createElement('span'); label.textContent = 'Project study';
    top.append(brand, label);
    const title = document.createElement('span'); title.className = 'art-title'; title.textContent = project.cover; title.style.whiteSpace = 'pre-line';
    const symbol = document.createElement('span'); symbol.className = 'art-symbol'; symbol.textContent = project.symbol;
    const bottom = document.createElement('div'); bottom.className = 'art-bottom';
    const category = document.createElement('span'); category.textContent = project.category;
    const arrow = document.createElement('b'); arrow.textContent = '↗';
    bottom.append(category, arrow); result.append(top, title, symbol, bottom);
    return result;
  }
  const cards = projects.map((project, index) => {
    const card = document.createElement('button');
    card.className = 'work-card';
    card.setAttribute('aria-label', `Explore ${project.title}`);
    card.append(cover(project));
    card.addEventListener('click', () => { if (!moved) { if (index === selected) openProject(index); else select(index); } });
    drum.append(card);
    return card;
  });
  function tagsInto(element, tags) {
    element.replaceChildren(...tags.map((tag) => { const span = document.createElement('span'); span.textContent = tag; return span; }));
  }
  function updateInfo() {
    selected = ((Math.round(target / step) % projects.length) + projects.length) % projects.length;
    const project = projects[selected];
    $('work-index').textContent = `${String(selected + 1).padStart(2, '0')} / ${String(projects.length).padStart(2, '0')}`;
    $('work-title').textContent = project.title;
    $('work-description').textContent = project.description;
    tagsInto($('work-tags'), project.tags);
    cards.forEach((card, index) => {
      card.tabIndex = index === selected ? 0 : -1;
      card.setAttribute('aria-hidden', String(index !== selected));
    });
  }
  function drawReel() {
    reelFrame = 0;
    rotation = motion.matches ? target : rotation + (target - rotation) * .12;
    if (Math.abs(target - rotation) < .03) rotation = target;
    const radius = mobile.matches ? 205 : innerWidth <= 1050 ? 230 : 260;
    cards.forEach((card, index) => {
      card.style.transform = `rotateX(${index * step - rotation}deg) translateZ(${radius}px)`;
      const distance = Math.abs(((index * step - rotation + 540) % 360 + 360) % 360 - 180);
      card.style.opacity = String(distance > 100 ? 0 : 1);
      card.style.pointerEvents = distance < 75 ? 'auto' : 'none';
    });
    if (rotation !== target) reelFrame = requestAnimationFrame(drawReel);
  }
  function animateReel() { if (!reelFrame) reelFrame = requestAnimationFrame(drawReel); }
  function move(direction) { target = Math.round(target / step) * step + direction * step; updateInfo(); animateReel(); }
  function select(index) { let delta = index - selected; if (delta > projects.length / 2) delta -= projects.length; if (delta < -projects.length / 2) delta += projects.length; move(delta); }
  $('previous-work').addEventListener('click', () => move(-1));
  $('next-work').addEventListener('click', () => move(1));
  $('inspect-project').addEventListener('click', () => openProject(selected));
  stage.addEventListener('keydown', (event) => {
    if (['ArrowDown', 'ArrowRight', 'ArrowUp', 'ArrowLeft'].includes(event.key)) { event.preventDefault(); stage.focus({ preventScroll: true }); move(['ArrowDown', 'ArrowRight'].includes(event.key) ? 1 : -1); }
    if (event.key === 'Enter' && event.target === stage) { event.preventDefault(); openProject(selected); }
  });
  stage.addEventListener('pointerdown', (event) => {
    if (event.button !== 0) return;
    dragging = true; moved = false; touchDrag = event.pointerType === 'touch'; startY = event.clientY; startX = event.clientX; lastY = touchDrag ? event.clientX : event.clientY; startTarget = target; lastTime = performance.now(); velocity = 0;
  });
  stage.addEventListener('pointermove', (event) => {
    if (!dragging) return;
    const now = performance.now(); const coordinate = touchDrag ? event.clientX : event.clientY; const delta = coordinate - (touchDrag ? startX : startY);
    if (Math.abs(delta) > 7) { moved = true; stage.setPointerCapture(event.pointerId); }
    velocity = (coordinate - lastY) / Math.max(now - lastTime, 1); lastY = coordinate; lastTime = now;
    target = startTarget - delta * .25; animateReel();
  });
  function finishDrag() {
    if (!dragging) return;
    dragging = false;
    target = Math.round((target - clamp(velocity * 25, -step, step)) / step) * step;
    updateInfo(); animateReel();
    setTimeout(() => { moved = false; }, 0);
  }
  stage.addEventListener('pointerup', finishDrag);
  stage.addEventListener('pointercancel', finishDrag);
  stage.addEventListener('lostpointercapture', finishDrag);
  stage.addEventListener('pointerleave', (event) => { if (!stage.hasPointerCapture(event.pointerId)) finishDrag(); });
  let lastWheel = 0;
  stage.addEventListener('wheel', (event) => {
    // Only capture deliberate reel interaction; ordinary page scroll remains free.
    if (document.activeElement !== stage || Math.abs(event.deltaY) < 3) return;
    event.preventDefault();
    if (performance.now() - lastWheel > 300) { move(event.deltaY > 0 ? 1 : -1); lastWheel = performance.now(); }
  }, { passive: false });
  addEventListener('resize', animateReel, { passive: true });
  updateInfo(); drawReel();
  function openProject(index) {
    const project = projects[index];
    $('dialog-title').textContent = project.title;
    $('dialog-category').textContent = project.category;
    $('dialog-description').textContent = project.detail;
    $('dialog-link').href = `https://github.com/aniketsidhu123/${project.repo}`;
    $('dialog-art').replaceChildren(cover(project));
    tagsInto($('dialog-tags'), project.tags);
    dialog.showModal(); document.body.classList.add('modal-open');
  }
  document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => { const r = dialog.getBoundingClientRect(); if (event.target === dialog && (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom)) dialog.close(); });
  dialog.addEventListener('close', () => document.body.classList.remove('modal-open'));

  document.querySelectorAll('.lab-toggle').forEach((button) => {
    button.addEventListener('click', () => {
      document.querySelectorAll('.lab-toggle').forEach((other) => {
        const active = other === button;
        other.setAttribute('aria-expanded', String(active));
        other.closest('.lab-panel').classList.toggle('active', active);
        $(other.getAttribute('aria-controls')).hidden = !active;
        other.querySelector('.lab-plus').textContent = active ? '↗' : '+';
      });
    });
  });

  /* Preserve the existing Flask / Gemini and Formspree contracts. Requests
     always time out; failures stay visible and do not claim a successful send. */
  async function fetchJSON(url, options = {}) {
    const controller = new AbortController(); const timer = setTimeout(() => controller.abort(), 20000);
    try {
      const response = await fetch(url, { ...options, signal: controller.signal });
      if (!response.ok) throw new Error(`Request failed (${response.status})`);
      return await response.json();
    } finally { clearTimeout(timer); }
  }
  const contactForm = $('contact-form');
  contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!contactForm.reportValidity()) return;
    const submit = contactForm.querySelector('button[type=submit]');
    const status = $('form-status');
    const name = $('contact-name').value.trim(); const email = $('contact-email').value.trim(); const message = $('contact-message').value.trim();
    if (!name || !email || !message) { status.textContent = 'Please complete all three fields.'; return; }
    submit.disabled = true; status.textContent = 'Preparing your message…';
    try {
      let config;
      try { config = await fetchJSON('/api/config'); } catch { config = {}; }
      if (!config.formspree_endpoint) { status.textContent = 'Message delivery is currently unavailable. Please email aniketsidhu425@gmail.com directly. Your message has not been sent.'; return; }
      status.textContent = 'Sending your message…';
      await fetchJSON(config.formspree_endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify({ name, email, message, _subject: 'Portfolio enquiry' }) });
      status.textContent = 'Message sent. Thanks for reaching out!'; contactForm.reset();
    } catch { status.textContent = 'Your message could not be sent. Please try again or email aniketsidhu425@gmail.com.'; }
    finally { submit.disabled = false; }
  });
  let chatReady = false;
  let chatBusy = false;
  const chatHistory = [];
  const status = $('chat-status');
  const availability = fetchJSON('/api/health').then((health) => { chatReady = health.gemini_ready === true; status.textContent = chatReady ? 'Available' : 'Currently unavailable'; }).catch(() => { status.textContent = 'Currently unavailable'; });
  function chatMessage(message, role) { const div = document.createElement('div'); div.className = `chat-message ${role}`; div.textContent = message; $('chat-messages').append(div); div.scrollIntoView({ block: 'nearest', behavior: 'instant' }); return div; }
  async function sendChat(question) {
    question = question.trim(); if (!question || chatBusy) return;
    chatBusy = true; $('chat-send').disabled = true;
    document.querySelectorAll('#chat-suggestions button').forEach((button) => { button.disabled = true; });
    chatMessage(question, 'user'); $('chat-input').value = '';
    const reply = chatMessage('Thinking…', 'assistant');
    try {
      await availability;
      if (!chatReady) { reply.textContent = 'The assistant is currently unavailable. You can explore my projects above or reach me at aniketsidhu425@gmail.com.'; return; }
      const history = [...chatHistory, { role: 'user', content: question }].slice(-6);
      const result = await fetchJSON('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message: question, history }) });
      reply.textContent = result.response || 'I could not answer that just now. Please try again.';
      chatHistory.push({ role: 'user', content: question }, { role: 'assistant', content: reply.textContent });
      if (chatHistory.length > 12) chatHistory.splice(0, chatHistory.length - 12);
    } catch { reply.textContent = 'The assistant could not respond just now. Please try again or email me directly.'; }
    finally { chatBusy = false; $('chat-send').disabled = false; document.querySelectorAll('#chat-suggestions button').forEach((button) => { button.disabled = false; }); $('chat-messages').scrollTop = $('chat-messages').scrollHeight; }
  }
  $('chat-form').addEventListener('submit', (event) => { event.preventDefault(); sendChat($('chat-input').value); });
  $('chat-suggestions').addEventListener('click', (event) => { const button = event.target.closest('button[data-question]'); if (button) sendChat(button.dataset.question); });
})();
