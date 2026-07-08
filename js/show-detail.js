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

  function renderHeader(show) {
    document.title = show.title + ' | Quick & Funny Musicals';

    var logo = document.getElementById('show-logo');
    if (logo) {
      logo.src = show.logo;
      logo.alt = show.title + ' logo';
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
    var emptyMessage = document.getElementById('show-gallery-empty');
    if (!galleryGrid || !emptyMessage) {
      return;
    }

    galleryGrid.textContent = '';

    if (!show.galleryImages.length) {
      emptyMessage.hidden = false;
      return;
    }

    emptyMessage.hidden = true;
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

    updateLightboxImage(index);
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    lightboxDialog.focus();
  }

  function closeLightbox() {
    if (!lightbox || !lightbox.classList.contains('is-open')) {
      return;
    }

    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
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
      }
    });
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
