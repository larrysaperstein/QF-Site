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
          '<li><a href="index.html" class="nav-menu__link">Home</a></li>' +
          '<li><a href="company.html" class="nav-menu__link">Company</a></li>' +
          '<li><a href="shows.html" class="nav-menu__link">Shows</a></li>' +
          '<li><a href="upcoming.html" class="nav-menu__link">Upcoming</a></li>' +
          '<li><a href="#" class="nav-menu__link">Press/Contact</a></li>' +
        '</ul>' +
      '</nav>' +
    '</aside>' +
    '<header class="site-header site-header--scrolled" id="site-header">' +
      '<div class="site-header__inner">' +
        '<a href="index.html" class="site-header__logo" aria-label="Quick &amp; Funny Musicals — Home">' +
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
    '<main class="show-detail-page">' +
      '<section class="show-detail-intro" aria-labelledby="show-logo-heading">' +
        '<h1 class="visually-hidden" id="show-logo-heading">Show details</h1>' +
        '<img src="" alt="" id="show-logo" class="show-detail__logo" loading="eager">' +
        '<div class="show-description" id="show-description"></div>' +
      '</section>' +
      '<section class="show-gallery" aria-labelledby="show-gallery-heading">' +
        '<div class="show-gallery__shape" aria-hidden="true"></div>' +
        '<div class="show-gallery__inner">' +
          '<h2 class="show-gallery__heading" id="show-gallery-heading">Production Gallery</h2>' +
          '<p class="show-gallery__empty" id="show-gallery-empty" hidden>Gallery images coming soon.</p>' +
          '<div class="show-gallery__grid" id="show-gallery-grid"></div>' +
          '<a href="shows.html" class="btn btn--outline show-gallery__return">Return To All Shows</a>' +
        '</div>' +
      '</section>' +
    '</main>' +
    '<div class="show-lightbox" id="show-lightbox" aria-hidden="true">' +
      '<button class="show-lightbox__backdrop" type="button" data-lightbox-close aria-label="Close gallery"></button>' +
      '<article class="show-lightbox__dialog" id="show-lightbox-dialog" role="dialog" aria-modal="true" aria-labelledby="show-lightbox-caption" tabindex="-1">' +
        '<button class="show-lightbox__close" type="button" data-lightbox-close aria-label="Close gallery"><span aria-hidden="true">&times;</span></button>' +
        '<button class="show-lightbox__nav show-lightbox__nav--prev" id="show-lightbox-prev" type="button" aria-label="Previous image">&#8249;</button>' +
        '<div class="show-lightbox__media">' +
          '<img src="" alt="" id="show-lightbox-image" class="show-lightbox__image">' +
          '<p class="show-lightbox__caption" id="show-lightbox-caption"></p>' +
        '</div>' +
        '<button class="show-lightbox__nav show-lightbox__nav--next" id="show-lightbox-next" type="button" aria-label="Next image">&#8250;</button>' +
      '</article>' +
    '</div>' +
    '<footer class="site-footer site-footer--subpage">' +
      '<div class="site-footer__inner">' +
        '<p class="site-footer__tagline">Are we your kind of people? Don&rsquo;t risk missing our next show!</p>' +
        '<a href="#" class="btn btn--red site-footer__cta">Stay In The Know</a>' +
        '<a href="https://www.instagram.com/quickandfunnymusicals/" class="site-footer__social" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Instagram">' +
          '<img src="images/icon-instagram.svg" alt="" class="icon-instagram icon-instagram--red" width="28" height="28">' +
        '</a>' +
        '<nav class="site-footer__nav" aria-label="Footer navigation">' +
          '<ul class="site-footer__nav-list">' +
            '<li><a href="index.html" class="site-footer__link">Home</a></li>' +
            '<li><a href="company.html" class="site-footer__link">Company</a></li>' +
            '<li><a href="shows.html" class="site-footer__link">Shows</a></li>' +
            '<li><a href="upcoming.html" class="site-footer__link">Upcoming</a></li>' +
            '<li><a href="#" class="site-footer__link">Press/Contact</a></li>' +
          '</ul>' +
        '</nav>' +
        '<p class="site-footer__copyright">&copy;2026 &ndash; Quick &amp; Funny Musicals. All Rights Reserved.</p>' +
        '<p class="site-footer__credit">Website by <a href="https://sapersteindesign.com" class="site-footer__credit-link" target="_blank" rel="noopener noreferrer">Saperstein Creative</a></p>' +
      '</div>' +
    '</footer>';
})();
