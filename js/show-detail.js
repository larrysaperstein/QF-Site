/**
 * Shared renderer for individual show pages.
 */
(function () {
  'use strict';

  var lightboxImageIndex = 0;
  var activeShow = null;

  var lightbox = document.getElementById('show-lightbox');
  var lightboxDialog = document.getElementById('show-lightbox-dialog');
  var lightboxImage = document.getElementById('show-lightbox-image');
  var lightboxCaption = document.getElementById('show-lightbox-caption');
  var lightboxTitle = document.getElementById('show-lightbox-title');
  var touchStartX = null;
  var touchStartY = null;
  var lastFocusedLightboxTrigger = null;

  function renderHeader(show) {
    document.title = show.title + ' | Quick & Funny Musicals';

    var logo = document.getElementById('show-logo');
    var heading = document.getElementById('show-logo-heading');
    if (logo) {
      logo.src = show.logo;
      logo.alt = show.title + ' logo';
    }

    if (heading) {
      heading.textContent = show.title;
    }

    if (lightboxTitle) {
      lightboxTitle.textContent = show.title + ' image gallery';
    }
  }

  function renderDescription(show) {
    var descriptionWrap = document.getElementById('show-description');
    if (!descriptionWrap) {
      return;
    }

    descriptionWrap.textContent = '';
    show.descriptionParagraphs.forEach(function (paragraph) {
      var p = document.createElement('p');
      p.className = 'show-description__text';
      p.textContent = paragraph;
      descriptionWrap.appendChild(p);
    });
  }

  function buildGalleryItem(src, index, title) {
    var item = document.createElement('button');
    item.className = 'show-gallery__item';
    item.type = 'button';
    item.setAttribute('aria-label', 'Open ' + title + ' image ' + (index + 1));
    item.dataset.index = String(index);

    var image = document.createElement('img');
    image.className = 'show-gallery__image';
    image.src = src;
    image.alt = title + ' production image ' + (index + 1);
    image.loading = 'lazy';
    image.decoding = 'async';

    item.appendChild(image);
    item.addEventListener('click', function () {
      openLightbox(index);
    });

    return item;
  }

  function renderGallery(show) {
    var galleryGrid = document.getElementById('show-gallery-grid');
    if (!galleryGrid) {
      return;
    }

    galleryGrid.textContent = '';

    if (!show.galleryImages.length) {
      return;
    }

    var fragment = document.createDocumentFragment();
    show.galleryImages.forEach(function (src, index) {
      fragment.appendChild(buildGalleryItem(src, index, show.title));
    });
    galleryGrid.appendChild(fragment);
  }

  function updateLightboxImage(index) {
    if (!activeShow || !activeShow.galleryImages.length) {
      return;
    }

    var imageCount = activeShow.galleryImages.length;
    lightboxImageIndex = (index + imageCount) % imageCount;

    lightboxImage.src = activeShow.galleryImages[lightboxImageIndex];
    lightboxImage.alt = activeShow.title + ' production image ' + (lightboxImageIndex + 1);
    lightboxCaption.textContent = (lightboxImageIndex + 1) + ' / ' + imageCount;
  }

  function openLightbox(index) {
    if (!activeShow || !activeShow.galleryImages.length || !lightbox) {
      return;
    }

    lastFocusedLightboxTrigger = document.activeElement;
    updateLightboxImage(index);
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    setLightboxInertState(true);
    lightboxDialog.focus();
  }

  function closeLightbox() {
    if (!lightbox || !lightbox.classList.contains('is-open')) {
      return;
    }

    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
    setLightboxInertState(false);

    if (lastFocusedLightboxTrigger && typeof lastFocusedLightboxTrigger.focus === 'function') {
      lastFocusedLightboxTrigger.focus();
      lastFocusedLightboxTrigger = null;
    }
  }

  function initLightboxSwipe() {
    if (!lightboxImage) {
      return;
    }

    lightboxImage.addEventListener('touchstart', function (event) {
      if (!lightbox.classList.contains('is-open') || !event.touches.length) {
        return;
      }

      touchStartX = event.touches[0].clientX;
      touchStartY = event.touches[0].clientY;
    }, { passive: true });

    lightboxImage.addEventListener('touchend', function (event) {
      if (!lightbox.classList.contains('is-open') || touchStartX === null || !event.changedTouches.length) {
        touchStartX = null;
        touchStartY = null;
        return;
      }

      var touchEndX = event.changedTouches[0].clientX;
      var touchEndY = event.changedTouches[0].clientY;
      var deltaX = touchEndX - touchStartX;
      var deltaY = touchEndY - touchStartY;
      var absDeltaX = Math.abs(deltaX);
      var absDeltaY = Math.abs(deltaY);
      var swipeThreshold = 40;

      touchStartX = null;
      touchStartY = null;

      if (absDeltaX < swipeThreshold || absDeltaX <= absDeltaY) {
        return;
      }

      if (deltaX > 0) {
        updateLightboxImage(lightboxImageIndex - 1);
      } else {
        updateLightboxImage(lightboxImageIndex + 1);
      }
    }, { passive: true });
  }

  function initLightboxControls() {
    if (!lightbox) {
      return;
    }

    var closeButtons = lightbox.querySelectorAll('[data-lightbox-close]');
    closeButtons.forEach(function (button) {
      button.addEventListener('click', closeLightbox);
    });

    var prevButton = document.getElementById('show-lightbox-prev');
    var nextButton = document.getElementById('show-lightbox-next');

    if (prevButton) {
      prevButton.addEventListener('click', function () {
        updateLightboxImage(lightboxImageIndex - 1);
      });
    }

    if (nextButton) {
      nextButton.addEventListener('click', function () {
        updateLightboxImage(lightboxImageIndex + 1);
      });
    }

    document.addEventListener('keydown', function (event) {
      if (!lightbox.classList.contains('is-open')) {
        return;
      }

      if (event.key === 'Escape') {
        closeLightbox();
      } else if (event.key === 'ArrowLeft') {
        updateLightboxImage(lightboxImageIndex - 1);
      } else if (event.key === 'ArrowRight') {
        updateLightboxImage(lightboxImageIndex + 1);
      } else if (event.key === 'Tab') {
        trapLightboxFocus(event);
      }
    });

    initLightboxSwipe();
  }

  function setLightboxInertState(isInert) {
    var container = lightbox ? lightbox.parentElement : null;
    if (!container) {
      return;
    }

    Array.prototype.forEach.call(container.children, function (el) {
      if (el === lightbox) {
        return;
      }

      if (isInert) {
        el.setAttribute('inert', '');
      } else {
        el.removeAttribute('inert');
      }
    });
  }

  function trapLightboxFocus(event) {
    var focusables = Array.prototype.slice.call(
      lightboxDialog.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')
    ).filter(function (el) {
      return el.offsetParent !== null;
    });

    if (!focusables.length) {
      event.preventDefault();
      lightboxDialog.focus();
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

  function initShowPage() {
    var pageRoot = document.body;
    var showId = pageRoot ? pageRoot.getAttribute('data-show-id') : null;
    if (!showId || !window.QFShowsData) {
      return;
    }

    activeShow = QFShowsData.getShowById(showId);
    if (!activeShow) {
      return;
    }

    pageRoot.classList.add('show-page--diag-' + activeShow.diagonalVariant);
    renderHeader(activeShow);
    renderDescription(activeShow);
    renderGallery(activeShow);
    initLightboxControls();
  }

  document.addEventListener('DOMContentLoaded', function () {
    QFNav.initMenu();
    QFNav.initSubpageHeader();
    initShowPage();
  });
})();
