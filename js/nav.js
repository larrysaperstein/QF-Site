/**
 * Shared navigation utilities
 */
var QFNav = (function () {
  'use strict';

  function initMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    if (!hamburger || !navMenu) {
      return;
    }

    hamburger.addEventListener('click', function () {
      toggleMenu(hamburger, navMenu);
    });

    navMenu.querySelectorAll('.nav-menu__link').forEach(function (link) {
      link.addEventListener('click', function () {
        closeMenu(hamburger, navMenu);
      });
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navMenu.classList.contains('is-open')) {
        closeMenu(hamburger, navMenu);
      }
    });
  }

  function toggleMenu(hamburger, navMenu) {
    const isOpen = navMenu.classList.toggle('is-open');
    hamburger.classList.toggle('is-active', isOpen);
    document.body.classList.toggle('menu-open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
    hamburger.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    navMenu.setAttribute('aria-hidden', String(!isOpen));
  }

  function closeMenu(hamburger, navMenu) {
    navMenu.classList.remove('is-open');
    hamburger.classList.remove('is-active');
    document.body.classList.remove('menu-open');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-label', 'Open menu');
    navMenu.setAttribute('aria-hidden', 'true');
  }

  function initScrollNav(heroEl) {
    const siteHeader = document.getElementById('site-header');

    if (!siteHeader || !heroEl) {
      return;
    }

    function updateHeaderState() {
      const triggerPoint = heroEl.offsetTop + (heroEl.offsetHeight * 0.6);
      const scrollBottomOfHeader = window.scrollY + siteHeader.offsetHeight;

      if (scrollBottomOfHeader >= triggerPoint) {
        siteHeader.classList.add('site-header--scrolled');
      } else {
        siteHeader.classList.remove('site-header--scrolled');
      }
    }

    updateHeaderState();
    window.addEventListener('scroll', updateHeaderState, { passive: true });
    window.addEventListener('resize', updateHeaderState);
  }

  function initSubpageHeader() {
    const siteHeader = document.getElementById('site-header');

    if (siteHeader) {
      siteHeader.classList.add('site-header--scrolled');
    }
  }

  return {
    initMenu: initMenu,
    initScrollNav: initScrollNav,
    initSubpageHeader: initSubpageHeader,
  };
})();
