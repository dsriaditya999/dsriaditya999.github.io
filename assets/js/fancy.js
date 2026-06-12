/* =============================================================================
   fancy.js — Advanced interactive features for dsriaditya999.github.io
   ============================================================================= */
(function () {
  'use strict';

  /* ------------------------------------------------------------------
     Utility
     ------------------------------------------------------------------ */
  function hexToRgba(hex, alpha) {
    hex = hex.replace('#', '');
    if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    return `rgba(${r},${g},${b},${alpha})`;
  }

  function getThemeColor() {
    return getComputedStyle(document.documentElement)
      .getPropertyValue('--global-theme-color').trim() || '#b509ac';
  }

  function isDark() {
    return document.documentElement.dataset.theme === 'dark';
  }

  /* ------------------------------------------------------------------
     1. Reading Progress Bar
     ------------------------------------------------------------------ */
  function initProgressBar() {
    const bar = document.getElementById('reading-progress-bar');
    if (!bar) return;
    function update() {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = total > 0 ? Math.min((scrollTop / total) * 100, 100) + '%' : '0%';
    }
    window.addEventListener('scroll', update, { passive: true });
    update();
  }

  /* ------------------------------------------------------------------
     2. Scroll Reveal — add classes then observe
     ------------------------------------------------------------------ */
  function addRevealClasses() {
    document.querySelectorAll('.publications .row').forEach((el) => {
      el.classList.add('reveal');
    });

    document.querySelectorAll('.projects .card, .card.hoverable').forEach((el, i) => {
      el.classList.add('reveal');
      if (i < 4) el.classList.add('reveal-delay-' + (i + 1));
    });

    document.querySelectorAll('.post h2').forEach(el => {
      el.classList.add('reveal-left');
    });
  }

  function initScrollReveal() {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.07, rootMargin: '0px 0px -24px 0px' });

    document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
      io.observe(el);
    });
  }

  /* ------------------------------------------------------------------
     4. Typewriter (Typed.js or fallback)
     ------------------------------------------------------------------ */
  function initTypewriter() {
    const el = document.getElementById('typewriter-target');
    if (!el) return;
    let phrases;
    try { phrases = JSON.parse(el.dataset.phrases || '[]'); } catch (e) { phrases = []; }
    if (!phrases.length) return;

    if (typeof Typed !== 'undefined') {
      new Typed('#typewriter-target', {
        strings: phrases,
        typeSpeed: 52,
        backSpeed: 28,
        backDelay: 2400,
        startDelay: 600,
        loop: true,
        showCursor: true,
        cursorChar: '|',
      });
    } else {
      /* Graceful fallback: simple fade rotation */
      let idx = 0;
      el.textContent = phrases[0];
      setInterval(() => {
        el.style.opacity = '0';
        setTimeout(() => {
          idx = (idx + 1) % phrases.length;
          el.textContent = phrases[idx];
          el.style.opacity = '1';
        }, 300);
      }, 3000);
      el.style.transition = 'opacity 0.3s ease';
    }
  }

  /* ------------------------------------------------------------------
     5. Command Palette (⌘K / Ctrl+K)
     ------------------------------------------------------------------ */
  function initCommandPalette() {
    const overlay  = document.getElementById('cmd-overlay');
    const input    = document.getElementById('cmd-input');
    const results  = document.getElementById('cmd-results');
    if (!overlay || !input || !results) return;

    const NAV_PAGES = [
      { title: 'About',          url: '/',                icon: '👤', tag: 'Page' },
      { title: 'Publications',   url: '/publications/',   icon: '📄', tag: 'Page' },
      { title: 'Projects',       url: '/projects/',       icon: '🔬', tag: 'Page' },
      { title: 'News',           url: '/news/',           icon: '📰', tag: 'Page' },
      { title: 'Awards',         url: '/awards/',         icon: '🏆', tag: 'Page' },
      { title: 'Certifications', url: '/certifications/', icon: '📜', tag: 'Page' },
      { title: 'Gallery',        url: '/gallery/',        icon: '🖼️',  tag: 'Page' },
      { title: 'CV / Resume',    url: '/cv/',             icon: '📋', tag: 'Page' },
    ];

    /* Collect publication entries from DOM */
    const PUB_ITEMS = [];
    document.querySelectorAll('.publications li[id], .publications .row[id]').forEach(el => {
      const titleEl = el.querySelector('.title');
      if (titleEl) {
        PUB_ITEMS.push({
          title: titleEl.textContent.trim().slice(0, 72),
          url: '/publications/#' + el.id,
          icon: '📰',
          tag: 'Publication',
        });
      }
    });

    /* Collect project cards from current page */
    const PROJ_ITEMS = [];
    document.querySelectorAll('.projects .card-title').forEach(el => {
      const anchor = el.closest('a') || el.closest('.card')?.querySelector('a[href]');
      PROJ_ITEMS.push({
        title: el.textContent.trim(),
        url: anchor ? anchor.getAttribute('href') : '/projects/',
        icon: '🔬',
        tag: 'Project',
      });
    });

    const ALL = [...NAV_PAGES, ...PUB_ITEMS.slice(0, 12), ...PROJ_ITEMS.slice(0, 8)];
    let activeIdx = 0;

    function open() {
      overlay.classList.add('open');
      input.value = '';
      activeIdx = 0;
      render('');
      document.body.style.overflow = 'hidden';
      requestAnimationFrame(() => input.focus());
    }

    function close() {
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    }

    function render(q) {
      const query = q.toLowerCase().trim();
      const filtered = query
        ? ALL.filter(it =>
            it.title.toLowerCase().includes(query) ||
            it.tag.toLowerCase().includes(query)
          )
        : ALL;

      activeIdx = 0;
      results.innerHTML = '';

      if (!filtered.length) {
        const div = document.createElement('div');
        div.className = 'cmd-empty';
        div.textContent = 'No results for "' + q + '"';
        results.appendChild(div);
        return;
      }

      const groups = {};
      filtered.forEach(it => {
        if (!groups[it.tag]) groups[it.tag] = [];
        groups[it.tag].push(it);
      });

      const ORDER = ['Page', 'Publication', 'Project'];
      ORDER.forEach(tag => {
        const items = groups[tag];
        if (!items) return;
        const label = document.createElement('span');
        label.className = 'cmd-section-label';
        label.textContent = tag + 's';
        results.appendChild(label);
        items.forEach(it => {
          const a = document.createElement('a');
          a.className = 'cmd-item';
          a.href = it.url;
          a.innerHTML =
            `<div class="cmd-item-icon">${it.icon}</div>` +
            `<div class="cmd-item-text">` +
              `<span class="cmd-item-title">${it.title}</span>` +
            `</div>` +
            `<span class="cmd-item-tag">${it.tag}</span>`;
          a.addEventListener('mousedown', close);
          results.appendChild(a);
        });
      });

      highlightActive();
    }

    function getItems() {
      return Array.from(results.querySelectorAll('.cmd-item'));
    }

    function highlightActive() {
      const items = getItems();
      items.forEach((el, i) => el.classList.toggle('active', i === activeIdx));
      const active = items[activeIdx];
      if (active) active.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }

    input.addEventListener('input', () => render(input.value));

    document.addEventListener('keydown', e => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        overlay.classList.contains('open') ? close() : open();
        return;
      }
      if (!overlay.classList.contains('open')) return;

      const items = getItems();
      if (e.key === 'Escape') { close(); return; }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        activeIdx = Math.min(activeIdx + 1, items.length - 1);
        highlightActive();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        activeIdx = Math.max(activeIdx - 1, 0);
        highlightActive();
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const active = items[activeIdx];
        if (active) { close(); window.location.href = active.href; }
      }
    });

    overlay.addEventListener('mousedown', e => { if (e.target === overlay) close(); });
  }

  /* ------------------------------------------------------------------
     6. Cite-to-Clipboard
     ------------------------------------------------------------------ */
  function initCiteButtons() {
    document.addEventListener('click', function (e) {
      const btn = e.target.closest('.cite-btn');
      if (!btn) return;
      e.stopPropagation();

      /* Try to find bibtex template in same entry container */
      const container = btn.closest('[id]') || btn.closest('.row');
      const tmpl = container && container.querySelector('.bibtex-template');
      const raw = tmpl ? tmpl.content.textContent.trim() : null;
      const text = raw ? raw.replace(
        /^[ \t]*(preview|selected|bibtex_show|abbr|dimensions|altmetric|google_scholar_id|slides)\s*=\s*\{[^}]*\}[ \t]*,?[ \t]*\n?/gm, ''
      ).replace(/,(\s*\n\s*\})/, '$1') : null;

      if (!text) {
        btn.classList.add('copied');
        setTimeout(() => btn.classList.remove('copied'), 2000);
        return;
      }

      const copy = () => {
        btn.classList.add('copied');
        setTimeout(() => btn.classList.remove('copied'), 2000);
      };

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(copy).catch(() => fallbackCopy(text, copy));
      } else {
        fallbackCopy(text, copy);
      }
    });
  }

  function fallbackCopy(text, cb) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.cssText = 'position:fixed;opacity:0;top:0;left:0';
    document.body.appendChild(ta);
    ta.focus(); ta.select();
    try { document.execCommand('copy'); cb(); } catch (_) {}
    document.body.removeChild(ta);
  }


  /* ------------------------------------------------------------------
     7. Floating Background Symbols
     ------------------------------------------------------------------ */
  function initBackgroundSymbols() {
    /* Curated symbol set: emoji personality + Unicode elegance */
    const SYMBOLS = [
      /* Aerospace & Space */
      { ch: '🚀', op: 0.14 },
      { ch: '🛸', op: 0.13 },
      { ch: '🌙', op: 0.15 },
      { ch: '☄️', op: 0.12 },
      { ch: '🔭', op: 0.13 },
      /* Robots & AI */
      { ch: '🤖', op: 0.14 },
      { ch: '⚡', op: 0.15 },
      { ch: '∞', op: 0.20 },
      /* Aliens & Sci-fi */
      { ch: '👽', op: 0.13 },
      { ch: '🛰️', op: 0.12 },
      /* Science */
      { ch: '🧬', op: 0.12 },
      { ch: '⚗️', op: 0.12 },
      /* Elegant Unicode — stars & geometry */
      { ch: '✦', op: 0.22 },
      { ch: '✧', op: 0.20 },
      { ch: '⋆', op: 0.24 },
      { ch: '★', op: 0.18 },
      { ch: '◎', op: 0.18 },
      { ch: '△', op: 0.18 },
      { ch: '⊙', op: 0.17 },
    ];

    /* Fixed layout — carefully spread to avoid the main content column.
       Positions are [left%, top%]. Clustered near edges & corners. */
    const LAYOUT = [
      /* top band */
      [  3,  6, 'a', 28], [ 14,  3, 'b', 35], [ 30,  8, 'c', 22],
      [ 58,  4, 'd', 30], [ 72,  7, 'a', 26], [ 88,  2, 'b', 34],
      [ 95, 10, 'c', 28],
      /* left edge */
      [  1, 28, 'd', 32], [  2, 52, 'a', 26], [  4, 74, 'b', 30],
      [  6, 90, 'c', 24],
      /* right edge */
      [ 92, 30, 'd', 28], [ 94, 55, 'a', 34], [ 96, 78, 'b', 26],
      [ 91, 92, 'c', 30],
      /* bottom band */
      [ 18, 94, 'a', 26], [ 38, 97, 'b', 22], [ 55, 95, 'd', 28],
      [ 75, 92, 'a', 32], [ 85, 96, 'c', 24],
      /* mid-field accents (small, very faint) */
      [ 20, 42, 'b', 18], [ 50, 65, 'c', 16], [ 78, 40, 'd', 18],
    ];

    const ANIM = ['sym-drift-a','sym-drift-b','sym-drift-c','sym-drift-d'];

    const container = document.createElement('div');
    container.id = 'bg-symbols';
    document.body.prepend(container);

    LAYOUT.forEach(([x, y, animSuffix, size], i) => {
      const sym = SYMBOLS[i % SYMBOLS.length];
      const duration = 24 + (i % 7) * 6;    /* 24–60s */
      const delay    = -(i * 4.1);            /* stagger so they don't move in sync */

      const el = document.createElement('span');
      el.className = 'bg-sym';
      el.textContent = sym.ch;
      el.setAttribute('aria-hidden', 'true');
      el.style.cssText = [
        `left:${x}%`,
        `top:${y}%`,
        `font-size:${size}px`,
        `--sym-op:${sym.op}`,
        `animation:sym-drift-${animSuffix} ${duration}s ${delay}s ease-in-out infinite alternate`,
      ].join(';');

      container.appendChild(el);
    });
  }

  /* ------------------------------------------------------------------
     8. Orbital Rings
     ------------------------------------------------------------------ */
  function initOrbitalRings() {
    const container = document.getElementById('bg-symbols');
    if (!container) return;

    /* Each ring: [left-vw, top-vh, width-vw, height-vw, rotation-deg]
       Positioned so they cross through the viewport like satellite orbits */
    const rings = [
      [-8,  28, 130, 48, -22],   /* sweeps top-left corner */
      [110, 62, 118, 44,  20],   /* sweeps bottom-right corner */
      [ 48, 108, 150, 52,   6],  /* large arc along the bottom */
    ];

    rings.forEach(([l, t, w, h, rot]) => {
      const el = document.createElement('div');
      el.className = 'orbit-ring';
      el.style.cssText = [
        `left:${l}vw`,
        `top:${t}vh`,
        `width:${w}vw`,
        `height:${h}vw`,
        `--ring-rot:${rot}deg`,
      ].join(';');
      container.appendChild(el);
    });
  }

  /* ------------------------------------------------------------------
     Bootstrap everything on DOMContentLoaded
     ------------------------------------------------------------------ */
  document.addEventListener('DOMContentLoaded', function () {
    initBackgroundSymbols();
    initOrbitalRings();
    addRevealClasses();
    initProgressBar();
    initScrollReveal();
    initTypewriter();
    initCommandPalette();
    initCiteButtons();
  });

})();
