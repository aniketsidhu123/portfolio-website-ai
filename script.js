(() => {
  'use strict';
  const $ = (id) => document.getElementById(id);
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const small = matchMedia('(max-width: 740px)');
  const snapshot = window.GITHUB_SNAPSHOT;
  const featuredNames = snapshot.featured.map((repo) => repo.name);
  const signalCopy = {
    JavaScript: 'Interactive interfaces and full-stack applications, built for the browser.',
    Python: 'Machine learning, computer vision, data pipelines, and explainable AI.',
    CSS: 'Responsive layouts, visual systems, and motion that brings interfaces to life.',
    HTML: 'The semantic foundation behind my public web projects.',
    Batchfile: 'Windows setup and run scripts that make local projects easier to launch.',
    GitHub: 'Public repositories, experiments, and the work behind every signal.'
  };
  $('year').textContent = new Date().getFullYear();

  function selectSignal(name) {
    $('signal-title').textContent = name;
    $('signal-description').textContent = signalCopy[name] || 'A signal found in my public GitHub work.';
    $('signal-note').textContent = signalCopy[name] || '';
    document.querySelectorAll('[data-signal]').forEach((button) => {
      const selected = button.dataset.signal === name;
      button.classList.toggle('is-selected', selected);
      button.setAttribute('aria-pressed', String(selected));
    });
  }
  let soundEnabled = true;
  const soundButton = $('sound-toggle');
  soundButton.addEventListener('click', () => {
    soundEnabled = !soundEnabled;
    soundButton.setAttribute('aria-pressed', String(soundEnabled));
    soundButton.setAttribute('aria-label', soundEnabled ? 'Mute keyboard sounds' : 'Enable keyboard sounds');
    soundButton.title = soundButton.getAttribute('aria-label');
    soundButton.textContent = soundEnabled ? '♪' : '×';
  });
  function playKey(id) {
    if (!soundEnabled) return;
    const audio = $(id);
    audio.currentTime = 0;
    const play = audio.play();
    if (play) play.catch(() => {});
  }
  document.querySelectorAll('[data-signal]').forEach((button) => {
    button.setAttribute('aria-pressed', 'false');
    button.addEventListener('click', () => selectSignal(button.dataset.signal));
  });
  document.querySelectorAll('.keyboard-key').forEach((key) => {
    let pressed = false;
    function press() {
      if (pressed) return;
      pressed = true;
      key.classList.add('is-down');
      playKey('key-press');
    }
    function release() {
      if (!pressed) return;
      pressed = false;
      key.classList.remove('is-down');
      playKey('key-release');
    }
    key.addEventListener('pointerdown', (event) => {
      if (event.button !== 0) return;
      press();
      key.setPointerCapture(event.pointerId);
    });
    key.addEventListener('pointerup', release);
    key.addEventListener('pointercancel', release);
    key.addEventListener('lostpointercapture', release);
    key.addEventListener('keydown', (event) => {
      if (!event.repeat && (event.key === 'Enter' || event.key === ' ')) press();
    });
    key.addEventListener('keyup', (event) => {
      if (event.key === 'Enter' || event.key === ' ') release();
    });
    key.addEventListener('blur', release);
  });

  /* The reference uses a rendered animation under a CSS 3D keyboard. */
  const video = $('hero-video');
  const source = video.querySelector('source');
  const sceneButton = $('scene-control');
  let userPaused = false;
  let inView = true;
  let loaded = false;
  function syncPlayback() {
    const animated = !reduced.matches && !small.matches;
    sceneButton.hidden = !animated;
    if (!animated) {
      video.pause();
      video.classList.add('is-still');
      if (loaded) {
        source.removeAttribute('src');
        video.load();
        loaded = false;
      }
      return;
    }
    video.classList.remove('is-still');
    if (!loaded) {
      source.src = source.dataset.src;
      video.load();
      loaded = true;
    }
    if (userPaused || !inView || document.hidden) video.pause();
    else video.play().catch((error) => {
      if (error.name === 'AbortError' || !inView || document.hidden || reduced.matches || small.matches) return;
      userPaused = true;
      updateSceneControl();
    });
  }
  function updateSceneControl() {
    sceneButton.replaceChildren();
    const icon = document.createElement('span');
    icon.setAttribute('aria-hidden', 'true');
    icon.textContent = userPaused ? '▷' : 'Ⅱ';
    sceneButton.append(icon, document.createTextNode(userPaused ? ' Play scene' : ' Pause scene'));
    sceneButton.setAttribute('aria-label', userPaused ? 'Play background animation' : 'Pause background animation');
  }
  sceneButton.addEventListener('click', () => {
    userPaused = !userPaused;
    updateSceneControl();
    syncPlayback();
  });
  video.addEventListener('error', () => {
    video.classList.add('is-still');
    sceneButton.hidden = true;
  });
  const heroObserver = new IntersectionObserver(([entry]) => {
    inView = entry.isIntersecting;
    syncPlayback();
  }, { threshold: 0 });
  heroObserver.observe($('hero'));
  document.addEventListener('visibilitychange', syncPlayback);
  reduced.addEventListener('change', syncPlayback);
  small.addEventListener('change', syncPlayback);
  updateSceneControl();
  syncPlayback();

  const compact = (value) => new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 }).format(value || 0);
  function renderProfile(profile) {
    document.querySelectorAll('[data-profile-bio]').forEach((node) => { node.textContent = profile.bio || snapshot.bio; });
    $('profile-location').textContent = profile.location || 'New Delhi, India';
    $('repo-count').textContent = compact(profile.publicRepos);
    $('star-count').textContent = compact(profile.totalStars);
    $('follower-count').textContent = compact(profile.followers);
  }
  function renderRepos(repos) {
    const cards = repos.map((repo, index) => {
      const card = document.createElement('a');
      card.className = 'repo-card';
      card.href = /^https:\/\/github\.com\/[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+(?:\/|$)/.test(repo.url) ? repo.url : snapshot.url;
      card.target = '_blank';
      card.rel = 'noopener noreferrer';
      const number = document.createElement('span');
      number.className = 'repo-index';
      number.textContent = String(index + 1).padStart(2, '0') + ' / repo';
      const body = document.createElement('div');
      const title = document.createElement('h3');
      title.textContent = repo.name;
      const description = document.createElement('p');
      description.textContent = repo.description || 'A public project built in the open.';
      body.append(title, description);
      const stats = document.createElement('small');
      stats.textContent = (repo.language || 'GitHub') + ' · ' + compact(repo.stars) + ' stars · ' + compact(repo.forks) + ' forks';
      card.append(number, body, stats);
      return card;
    });
    $('repo-grid').replaceChildren(...cards);
  }
  renderProfile(snapshot);
  renderRepos(snapshot.featured);

  /* Public API refresh has a bundled snapshot and a short local cache fallback. */
  const cacheKey = 'aniket-github-signal-v1';
  async function refreshGitHub() {
    try {
      const cached = JSON.parse(localStorage.getItem(cacheKey) || 'null');
      if (cached && Date.now() - cached.time < 1800000 && Array.isArray(cached.featured)) {
        renderProfile(cached);
        renderRepos(cached.featured);
        return;
      }
    } catch { /* A private browser may block storage. */ }
    const abort = new AbortController();
    const timeout = setTimeout(() => abort.abort(), 8000);
    try {
      const responses = await Promise.all([
        fetch('https://api.github.com/users/aniketsidhu123', { signal: abort.signal }),
        fetch('https://api.github.com/users/aniketsidhu123/repos?per_page=100&sort=updated', { signal: abort.signal })
      ]);
      if (responses.some((response) => !response.ok)) return;
      const [user, repos] = await Promise.all(responses.map((response) => response.json()));
      if (!Array.isArray(repos)) return;
      const featured = featuredNames.map((name) => {
        const repo = repos.find((item) => item.name === name);
        return repo ? { name: repo.name, description: repo.description, url: repo.html_url, language: repo.language, stars: repo.stargazers_count, forks: repo.forks_count } : snapshot.featured.find((item) => item.name === name);
      });
      const profile = {
        time: Date.now(), bio: user.bio, location: user.location,
        publicRepos: user.public_repos, followers: user.followers,
        totalStars: repos.reduce((sum, repo) => sum + repo.stargazers_count, 0), featured
      };
      renderProfile(profile);
      renderRepos(featured);
      try { localStorage.setItem(cacheKey, JSON.stringify(profile)); } catch { /* Snapshot remains available. */ }
    } catch { /* Offline and rate-limited sessions keep the verified snapshot. */ }
    finally { clearTimeout(timeout); }
  }
  refreshGitHub();
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const link = document.querySelector('.site-header nav a[href="#' + entry.target.id + '"]');
      if (link) {
        link.classList.toggle('is-current', entry.isIntersecting);
        if (entry.isIntersecting) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      }
    });
  }, { rootMargin: '-10% 0px -45% 0px', threshold: 0 });
  sectionObserver.observe($('skills'));
  sectionObserver.observe($('projects'));
})();
