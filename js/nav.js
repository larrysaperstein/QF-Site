/**
 * Shared navigation utilities
 */
var QFNav = (function () {
  'use strict';

  var lastFocusedMenuTrigger = null;

  function initMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    if (!hamburger || !navMenu) {
      return;
    }

    hamburger.addEventListener('click', function () {
      toggleMenu(hamburger, navMenu);
    });

    initMenuSubmenus(navMenu);

    navMenu.querySelectorAll('.nav-menu__link').forEach(function (link) {
      link.addEventListener('click', function () {
        closeMenu(hamburger, navMenu);
      });
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navMenu.classList.contains('is-open')) {
        closeMenu(hamburger, navMenu);
        return;
      }

      if (e.key === 'Tab' && navMenu.classList.contains('is-open')) {
        trapMenuFocus(e, navMenu);
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

    if (isOpen) {
      lastFocusedMenuTrigger = document.activeElement;
      setPageInertState(true);
      focusFirstMenuItem(navMenu);
    }

    if (!isOpen) {
      setPageInertState(false);
      collapseMenuSubmenus(navMenu);
      restoreMenuTriggerFocus();
    }
  }

  function closeMenu(hamburger, navMenu) {
    navMenu.classList.remove('is-open');
    hamburger.classList.remove('is-active');
    document.body.classList.remove('menu-open');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-label', 'Open menu');
    navMenu.setAttribute('aria-hidden', 'true');
    setPageInertState(false);
    collapseMenuSubmenus(navMenu);
    restoreMenuTriggerFocus();
  }

  function initMenuSubmenus(navMenu) {
    const items = navMenu.querySelectorAll('.nav-menu__item--has-children');
    items.forEach(function (item, index) {
      const toggle = item.querySelector('[data-nav-submenu-toggle]');
      const sublist = item.querySelector('.nav-menu__sublist');
      if (!toggle || !sublist) {
        return;
      }

      const sublistId = sublist.id || ('nav-sublist-' + index);
      sublist.id = sublistId;
      toggle.setAttribute('aria-controls', sublistId);
      toggle.setAttribute('aria-expanded', 'false');
      sublist.setAttribute('aria-hidden', 'true');
      sublist.setAttribute('inert', '');
    });

    const toggles = navMenu.querySelectorAll('[data-nav-submenu-toggle]');
    if (!toggles.length) {
      return;
    }

    toggles.forEach(function (toggle) {
      toggle.addEventListener('click', function () {
        const item = toggle.closest('.nav-menu__item--has-children');
        if (!item) {
          return;
        }

        const isExpanded = item.classList.toggle('is-expanded');
        toggle.setAttribute('aria-expanded', String(isExpanded));
        const sublist = item.querySelector('.nav-menu__sublist');
        if (sublist) {
          sublist.setAttribute('aria-hidden', String(!isExpanded));
          if (isExpanded) {
            sublist.removeAttribute('inert');
          } else {
            sublist.setAttribute('inert', '');
          }
        }
      });
    });
  }

  function collapseMenuSubmenus(navMenu) {
    const expandedItems = navMenu.querySelectorAll('.nav-menu__item--has-children.is-expanded');
    expandedItems.forEach(function (item) {
      item.classList.remove('is-expanded');
      const toggle = item.querySelector('[data-nav-submenu-toggle]');
      const sublist = item.querySelector('.nav-menu__sublist');
      if (toggle) {
        toggle.setAttribute('aria-expanded', 'false');
      }
      if (sublist) {
        sublist.setAttribute('aria-hidden', 'true');
        sublist.setAttribute('inert', '');
      }
    });
  }

  function setPageInertState(isInert) {
    document.querySelectorAll('main, footer').forEach(function (el) {
      if (isInert) {
        el.setAttribute('inert', '');
      } else {
        el.removeAttribute('inert');
      }
    });
  }

  function getFocusableElements(container) {
    return Array.prototype.slice.call(
      container.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')
    ).filter(function (el) {
      return el.offsetParent !== null;
    });
  }

  function focusFirstMenuItem(navMenu) {
    var focusables = getFocusableElements(navMenu);
    if (focusables.length) {
      focusables[0].focus();
    }
  }

  function trapMenuFocus(event, navMenu) {
    var focusables = getFocusableElements(navMenu);
    if (!focusables.length) {
      event.preventDefault();
      return;
    }

    var first = focusables[0];
    var last = focusables[focusables.length - 1];
    var active = document.activeElement;

    if (event.shiftKey && active === first) {
      event.preventDefault();
      last.focus();
      return;
    }

    if (!event.shiftKey && active === last) {
      event.preventDefault();
      first.focus();
    }
  }

  function restoreMenuTriggerFocus() {
    if (lastFocusedMenuTrigger && typeof lastFocusedMenuTrigger.focus === 'function') {
      lastFocusedMenuTrigger.focus();
      lastFocusedMenuTrigger = null;
    }
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
