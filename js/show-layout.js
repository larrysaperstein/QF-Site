/**
 * Shared HTML shell for all individual show pages.
 */
(function () {
  'use strict';

  var root = document.getElementById('show-page-root');
  if (!root) {
    return;
  }

  root.innerHTML =
    '<aside class="nav-menu" id="nav-menu" aria-hidden="true">' +
      '<nav class="nav-menu__inner" aria-label="Main navigation">' +
        '<ul class="nav-menu__list">' +
          '<li><a href="/" class="nav-menu__link">Home</a></li>' +
          '<li class="nav-menu__item nav-menu__item--has-children">' +
            '<button class="nav-menu__toggle" type="button" aria-expanded="false" data-nav-submenu-toggle>' +
              'About Us' +
              '<span class="nav-menu__caret" aria-hidden="true"></span>' +
            '</button>' +
            '<ul class="nav-menu__sublist">' +
              '<li><a href="/meet-us" class="nav-menu__link nav-menu__link--sub">Meet Us</a></li>' +
              '<li><a href="/faq" class="nav-menu__link nav-menu__link--sub">FAQ</a></li>' +
            '</ul>' +
          '</li>' +
          '<li><a href="/company" class="nav-menu__link">Company</a></li>' +
          '<li><a href="/shows" class="nav-menu__link">Shows</a></li>' +
          '<li><a href="/upcoming" class="nav-menu__link">Upcoming</a></li>' +
          '<li><a href="/contact" class="nav-menu__link">Contact</a></li>' +
        '</ul>' +
      '</nav>' +
    '</aside>' +
    '<header class="site-header site-header--scrolled" id="site-header">' +
      '<div class="site-header__inner">' +
        '<a href="/" class="site-header__logo" aria-label="Quick &amp; Funny Musicals — Home">' +
          '<img src="images/QF Logo 3.png" alt="Quick and Funny Musicals" class="site-header__logo-image" loading="eager">' +
        '</a>' +
        '<div class="site-header__actions">' +
          '<a href="https://www.instagram.com/quickandfunnymusicals/" class="site-header__social" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Instagram">' +
            '<img src="images/icon-instagram.svg" alt="" class="icon-instagram" width="24" height="24">' +
          '</a>' +
          '<button class="hamburger" id="hamburger" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="nav-menu">' +
            '<span class="hamburger__line"></span>' +
            '<span class="hamburger__line"></span>' +
            '<span class="hamburger__line"></span>' +
          '</button>' +
        '</div>' +
      '</div>' +
    '</header>' +
    '<main class="show-detail-page" id="main-content">' +
      '<section class="show-detail-intro" aria-labelledby="show-logo-heading">' +
        '<h1 class="visually-hidden" id="show-logo-heading">Show details</h1>' +
        '<img alt="" id="show-logo" class="show-detail__logo" loading="eager">' +
        '<div class="show-description" id="show-description"></div>' +
      '</section>' +
      '<section class="show-gallery" aria-labelledby="show-gallery-heading">' +
        '<div class="show-gallery__shape" aria-hidden="true"></div>' +
        '<div class="show-gallery__inner">' +
          '<h2 class="show-gallery__heading" id="show-gallery-heading">Production Gallery</h2>' +
          '<div class="show-gallery__grid" id="show-gallery-grid"></div>' +
          '<a href="/shows" class="btn btn--outline show-gallery__return">Return To All Shows</a>' +
        '</div>' +
      '</section>' +
    '</main>' +
    '<div class="show-lightbox" id="show-lightbox" aria-hidden="true">' +
      '<button class="show-lightbox__backdrop" type="button" data-lightbox-close aria-label="Close gallery"></button>' +
      '<article class="show-lightbox__dialog" id="show-lightbox-dialog" role="dialog" aria-modal="true" aria-labelledby="show-lightbox-title" aria-describedby="show-lightbox-caption" tabindex="-1">' +
        '<h2 class="visually-hidden" id="show-lightbox-title">Show image gallery</h2>' +
        '<button class="show-lightbox__close" type="button" data-lightbox-close aria-label="Close gallery"><span aria-hidden="true">&times;</span></button>' +
        '<div class="show-lightbox__media">' +
          '<img alt="" id="show-lightbox-image" class="show-lightbox__image">' +
          '<p class="show-lightbox__caption" id="show-lightbox-caption" aria-live="polite"></p>' +
        '</div>' +
        '<div class="show-lightbox__controls">' +
          '<button class="show-lightbox__nav show-lightbox__nav--prev" id="show-lightbox-prev" type="button" aria-label="Previous image">&#8249;</button>' +
          '<button class="show-lightbox__nav show-lightbox__nav--next" id="show-lightbox-next" type="button" aria-label="Next image">&#8250;</button>' +
        '</div>' +
      '</article>' +
    '</div>' +
    '<footer class="site-footer site-footer--subpage">' +
      '<div class="site-footer__inner">' +
        '<p class="site-footer__tagline">Are we your kind of people? Don&rsquo;t risk missing our next show!</p>' +
        '<a href="https://docs.google.com/forms/d/e/1FAIpQLSdfrvzvsdDfbJ6nXGZU4zt-DqI2aqt3pslzWWA_B6EpPkafqA/viewform?usp=header" class="btn btn--red site-footer__cta" target="_blank" rel="noopener noreferrer">Stay In The Know</a>' +
        '<a href="https://www.instagram.com/quickandfunnymusicals/" class="site-footer__social" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Instagram">' +
          '<img src="images/icon-instagram.svg" alt="" class="icon-instagram icon-instagram--red" width="28" height="28">' +
        '</a>' +
        '<nav class="site-footer__nav" aria-label="Footer navigation">' +
          '<ul class="site-footer__nav-list">' +
            '<li><a href="/" class="site-footer__link">Home</a></li>' +
            '<li><a href="/meet-us" class="site-footer__link">Meet Us</a></li>' +
            '<li><a href="/faq" class="site-footer__link">FAQ</a></li>' +
            '<li><a href="/company" class="site-footer__link">Company</a></li>' +
            '<li><a href="/shows" class="site-footer__link">Shows</a></li>' +
            '<li><a href="/upcoming" class="site-footer__link">Upcoming</a></li>' +
            '<li><a href="/contact" class="site-footer__link">Contact</a></li>' +
          '</ul>' +
        '</nav>' +
        '<p class="site-footer__copyright">&copy;2026 &ndash; Quick &amp; Funny Musicals. All Rights Reserved.</p>' +
        '<p class="site-footer__credit">Website by <a href="https://sapersteindesign.com" class="site-footer__credit-link" target="_blank" rel="noopener noreferrer">Saperstein Creative</a></p>' +
      '</div>' +
    '</footer>';
})();
