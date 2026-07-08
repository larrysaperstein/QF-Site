/**
 * Meet Us page interactions.
 */
(function () {
  'use strict';

  function initMeetUsPhotos() {
    var photos = document.querySelectorAll('.meet-us__figure');
    if (!photos.length) {
      return;
    }

    if (!('IntersectionObserver' in window)) {
      photos.forEach(function (photo) {
        photo.classList.add('is-visible');
      });
      return;
    }

    var observer = new IntersectionObserver(function (entries, activeObserver) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add('is-visible');
        activeObserver.unobserve(entry.target);
      });
    }, {
      threshold: 0.22,
      rootMargin: '0px 0px -12% 0px',
    });

    photos.forEach(function (photo) {
      observer.observe(photo);
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    QFNav.initMenu();
    QFNav.initSubpageHeader();
    initMeetUsPhotos();
  });
})();
