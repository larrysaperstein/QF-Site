/**
 * Quick & Funny Musicals — Home page
 */
(function () {
  'use strict';

  const hero = document.getElementById('hero');
  const heroIntro = document.getElementById('hero-intro');
  const heroLottie = document.getElementById('hero-lottie');
  const heroLogoWrap = document.getElementById('hero-logo-wrap');
  const heroSlideshow = document.querySelector('.hero__slideshow');
  const datesList = document.getElementById('dates-list');
  const aboutSection = document.getElementById('about');
  const aboutPhotos = document.querySelectorAll('.about__photo');

  const HERO_CONFIG = {
    lottiePath: 'logoanimation3.json',
    heroSettleDelay: 1000,
    slideshowInterval: 5000,
  };
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let slideshowTimer = null;
  let currentSlide = 0;

  function initHero() {
    if (prefersReducedMotion) {
      showHeroFinalState();
      return;
    }

    if (typeof lottie === 'undefined') {
      console.warn('Lottie library not loaded — skipping hero animation.');
      showHeroFinalState();
      return;
    }

    const animation = lottie.loadAnimation({
      container: heroLottie,
      renderer: 'svg',
      loop: false,
      autoplay: true,
      path: HERO_CONFIG.lottiePath,
    });

    animation.addEventListener('complete', onLottieComplete);
  }

  function onLottieComplete() {
    setTimeout(function () {
      heroIntro.classList.add('is-hidden');
      heroSlideshow.classList.add('is-visible');
      heroLogoWrap.classList.add('is-visible');
      heroLogoWrap.setAttribute('aria-hidden', 'false');
      startSlideshow();
    }, HERO_CONFIG.heroSettleDelay);
  }

  function showHeroFinalState() {
    heroIntro.classList.add('is-hidden');
    heroLogoWrap.classList.add('is-visible');
    heroLogoWrap.setAttribute('aria-hidden', 'false');
    heroSlideshow.classList.add('is-visible');
    if (!prefersReducedMotion) {
      startSlideshow();
    }
  }

  function startSlideshow() {
    const slides = document.querySelectorAll('.hero__slide');
    if (slides.length <= 1 || slideshowTimer) return;

    slideshowTimer = setInterval(function () {
      slides[currentSlide].classList.remove('hero__slide--active');
      currentSlide = (currentSlide + 1) % slides.length;
      slides[currentSlide].classList.add('hero__slide--active');
    }, HERO_CONFIG.slideshowInterval);
  }

  function initAboutGallery() {
    if (!aboutPhotos.length || !aboutSection) return;

    if (prefersReducedMotion) {
      aboutPhotos.forEach(function (photo) {
        photo.classList.add('is-visible');
      });
      return;
    }

    const revealDelays = {
      'about__photo--2': 0,
      'about__photo--3': 180,
      'about__photo--1': 500,
    };

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            aboutPhotos.forEach(function (photo) {
              let delay = 0;

              Object.keys(revealDelays).forEach(function (className) {
                if (photo.classList.contains(className)) {
                  delay = revealDelays[className];
                }
              });

              setTimeout(function () {
                photo.classList.add('is-visible');
              }, delay);
            });

            observer.unobserve(aboutSection);
          }
        });
      },
      { threshold: 0, rootMargin: '0px 0px -55% 0px' }
    );

    observer.observe(aboutSection);
  }

  document.addEventListener('DOMContentLoaded', function () {
    initHero();
    QFNav.initMenu();
    QFNav.initScrollNav(hero);

    if (datesList) {
      QFCalendar.loadIntoList(datesList, { maxEvents: QF_CONFIG.maxEventsHome });
    }

    initAboutGallery();

    document.addEventListener('visibilitychange', function () {
      if (!slideshowTimer) {
        return;
      }

      if (document.hidden) {
        clearInterval(slideshowTimer);
        slideshowTimer = null;
      } else {
        startSlideshow();
      }
    });
  });
})();
