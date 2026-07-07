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
  const aboutPhotos = document.querySelectorAll('.about__photo');

  const HERO_CONFIG = {
    lottiePath: 'logoanimation3.json',
    heroSettleDelay: 1000,
    slideshowInterval: 5000,
  };

  let slideshowTimer = null;
  let currentSlide = 0;

  function initHero() {
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
    startSlideshow();
  }

  function startSlideshow() {
    const slides = document.querySelectorAll('.hero__slide');
    if (slides.length <= 1) return;

    slideshowTimer = setInterval(function () {
      slides[currentSlide].classList.remove('hero__slide--active');
      currentSlide = (currentSlide + 1) % slides.length;
      slides[currentSlide].classList.add('hero__slide--active');
    }, HERO_CONFIG.slideshowInterval);
  }

  function initAboutGallery() {
    if (!aboutPhotos.length) return;

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -40px 0px' }
    );

    aboutPhotos.forEach(function (photo) {
      observer.observe(photo);
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initHero();
    QFNav.initMenu();
    QFNav.initScrollNav(hero);

    if (datesList) {
      QFCalendar.loadIntoList(datesList, { maxEvents: QF_CONFIG.maxEventsHome });
    }

    initAboutGallery();
  });
})();
