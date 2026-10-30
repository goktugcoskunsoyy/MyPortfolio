/* MyPortfolioTheme | Göktuğ Talha Coşkunsoy */
(function () {
  'use strict';

  var doc = document;
  var html = doc.documentElement;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- 1. Typing effect ---------- */
  var typingEl = doc.querySelector('[data-typing]');
  if (typingEl) {
    var phrases = ['Bilgisayar Mühendisi', '.NET Backend Developer', 'Yazılım Geliştiricisi', 'Yazılım Mimarı', 'Yapay Zeka Meraklısı'];
    var pi = 0;
    var ci = phrases[0].length;
    var deleting = true;

    var tick = function () {
      if (reduce) {
        pi = (pi + 1) % phrases.length;
        typingEl.textContent = phrases[pi];
        setTimeout(tick, 2600);
        return;
      }
      var word = phrases[pi];
      if (!deleting) {
        ci += 1;
        typingEl.textContent = word.slice(0, ci);
        if (ci >= word.length) { deleting = true; setTimeout(tick, 1700); return; }
        setTimeout(tick, 70 + Math.random() * 45);
      } else {
        ci -= 1;
        typingEl.textContent = word.slice(0, Math.max(ci, 0));
        if (ci <= 0) { deleting = false; pi = (pi + 1) % phrases.length; setTimeout(tick, 380); return; }
        setTimeout(tick, 36);
      }
    };
    setTimeout(tick, 1800);
  }

  /* ---------- 2. Navbar background and back-to-top button ---------- */
  var nav = doc.querySelector('[data-site-nav]');
  var toTop = doc.querySelector('[data-to-top]');
  var ticking = false;

  var onScroll = function () {
    var y = window.scrollY || html.scrollTop || 0;
    nav.classList.toggle('is-scrolled', y > 24);
    var show = y > 720;
    toTop.classList.toggle('is-visible', show);
    toTop.setAttribute('tabindex', show ? '0' : '-1');
    toTop.setAttribute('aria-hidden', show ? 'false' : 'true');
    ticking = false;
  };
  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; window.requestAnimationFrame(onScroll); }
  }, { passive: true });
  onScroll();

  /* ---------- 3. Mobile menu ---------- */
  var menu = doc.querySelector('[data-menu]');
  var burger = doc.querySelector('[data-menu-toggle]');

  var setMenu = function (open) {
    menu.classList.toggle('is-open', open);
    burger.classList.toggle('is-open', open);
    nav.classList.toggle('is-menu-open', open);
    html.classList.toggle('menu-locked', open);
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    burger.setAttribute('aria-label', open ? 'Menüyü kapat' : 'Menüyü aç');
  };
  var isMenuOpen = function () { return menu.classList.contains('is-open'); };

  burger.addEventListener('click', function () { setMenu(!isMenuOpen()); });
  menu.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () { setMenu(false); });
  });
  doc.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && isMenuOpen()) { setMenu(false); burger.focus(); }
  });
  window.addEventListener('resize', function () {
    if (window.innerWidth >= 1200 && isMenuOpen()) setMenu(false);
  });

  /* ---------- 4. Active menu link ---------- */
  var navLinks = doc.querySelectorAll('[data-nav]');
  var setActive = function (id) {
    navLinks.forEach(function (a) {
      var on = a.getAttribute('data-nav') === id;
      a.classList.toggle('is-active', on);
      if (on) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
    });
  };
  navLinks.forEach(function (a) {
    a.addEventListener('click', function () { setActive(a.getAttribute('data-nav')); });
  });

  /* ---------- 5. Scroll reveal and active section tracking ---------- */
  var sectionIds = ['home', 'about', 'skills', 'experience', 'projects', 'education', 'philosophy', 'contact', 'site-footer'];
  var sectionMap = { philosophy: 'education', 'site-footer': 'contact' };
  var sections = sectionIds.map(function (id) { return doc.getElementById(id); }).filter(Boolean);

  if ('IntersectionObserver' in window) {
    var activeObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) setActive(sectionMap[en.target.id] || en.target.id);
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
    sections.forEach(function (s) { activeObserver.observe(s); });

    if (html.classList.contains('js-motion')) {
      var revealObserver = new IntersectionObserver(function (entries, obs) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { en.target.classList.add('is-in'); obs.unobserve(en.target); }
        });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });
      sections.forEach(function (s) { revealObserver.observe(s); });
    }
  }

  /* ---------- 6. Project filters ---------- */
  var filterButtons = doc.querySelectorAll('[data-filter]');
  var projectCards = doc.querySelectorAll('[data-cats]');
  var filterStatus = doc.querySelector('[data-filter-status]');

  var applyFilter = function (filter, announce) {
    var shown = 0;
    projectCards.forEach(function (card) {
      var cats = card.getAttribute('data-cats').split(' ');
      var visible = filter === 'all' || cats.indexOf(filter) > -1;
      card.classList.toggle('is-hidden', !visible);
      card.classList.remove('is-offset');
      if (visible) {
        if (shown % 2 === 1) card.classList.add('is-offset');
        shown += 1;
      }
    });
    filterButtons.forEach(function (btn) {
      var on = btn.getAttribute('data-filter') === filter;
      btn.classList.toggle('is-active', on);
      btn.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    if (announce && filterStatus) filterStatus.textContent = shown + ' proje gösteriliyor';
  };
  filterButtons.forEach(function (btn) {
    btn.addEventListener('click', function () { applyFilter(btn.getAttribute('data-filter'), true); });
  });

  /* ---------- 7. Contact form validation ---------- */
  var form = doc.getElementById('contact-form');
  if (form) {
    var note = form.querySelector('[data-form-note]');
    var backendReady = form.getAttribute('data-backend-ready') === 'true';
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    var setError = function (name, message) {
      var input = form.elements[name];
      var err = doc.getElementById(input.id + '-err');
      input.setAttribute('aria-invalid', message ? 'true' : 'false');
      if (err) err.textContent = message || '';
    };

    var validate = function () {
      var get = function (n) { return (form.elements[n].value || '').trim(); };
      var v = { name: get('name'), email: get('email'), subject: get('subject'), message: get('message') };
      var errors = {};
      if (!v.name) errors.name = 'Lütfen adınızı ve soyadınızı yazın.';
      else if (v.name.length < 3) errors.name = 'Ad soyad en az 3 karakter olmalı.';
      if (!v.email) errors.email = 'Lütfen e-posta adresinizi yazın.';
      else if (!emailPattern.test(v.email)) errors.email = 'Geçerli bir e-posta adresi girin (ör. ad@alanadi.com).';
      if (!v.subject) errors.subject = 'Lütfen bir konu belirtin.';
      if (!v.message) errors.message = 'Lütfen mesajınızı yazın.';
      else if (v.message.length < 10) errors.message = 'Mesajınız en az 10 karakter olmalı.';
      ['name', 'email', 'subject', 'message'].forEach(function (n) { setError(n, errors[n]); });
      return errors;
    };

    form.addEventListener('submit', function (e) {
      var errors = validate();
      var keys = Object.keys(errors);
      if (keys.length) {
        e.preventDefault();
        note.textContent = '';
        form.elements[keys[0]].focus();
        return;
      }
      if (!backendReady) {
        // Static version: nothing is sent and no fake success message is shown.
        e.preventDefault();
        note.textContent = 'Bilgilerin eksiksiz görünüyor. Mesaj gönderimi henüz aktif değil; dilersen doğrudan example@mail.com adresine yazabilirsin.';
      }
      // When backendReady === true, the form submits normally to /Home/Contact.
    });

    form.addEventListener('input', function (e) {
      var t = e.target;
      if (t.name && t.getAttribute('aria-invalid') === 'true') setError(t.name, '');
    });
  }
})();
