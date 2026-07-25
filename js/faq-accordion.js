/**
 * FAQ accordion interactions for statically rendered FAQ items.
 */
(function () {
  'use strict';

  function initFaqAccordion() {
    var faqItems = document.querySelectorAll('.faq-item');
    if (!faqItems.length) {
      return;
    }

    faqItems.forEach(function (wrapper) {
      var trigger = wrapper.querySelector('.faq-item__trigger');
      var answerWrap = wrapper.querySelector('.faq-item__answer-wrap');

      if (!trigger || !answerWrap) {
        return;
      }

      trigger.addEventListener('click', function () {
        var isOpen = wrapper.classList.toggle('is-open');
        trigger.setAttribute('aria-expanded', String(isOpen));
        answerWrap.setAttribute('aria-hidden', String(!isOpen));
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    QFNav.initMenu();
    QFNav.initSubpageHeader();
    initFaqAccordion();
  });
})();
