/**
 * FAQ page accordion interactions.
 */
(function () {
  'use strict';

  function buildFaqItem(item, index) {
    var wrapper = document.createElement('article');
    wrapper.className = 'faq-item';

    var answerId = 'faq-answer-' + index;

    var trigger = document.createElement('button');
    trigger.className = 'faq-item__trigger';
    trigger.type = 'button';
    trigger.setAttribute('aria-expanded', 'false');
    trigger.setAttribute('aria-controls', answerId);

    var question = document.createElement('span');
    question.className = 'faq-item__question';
    question.textContent = item.question;

    var icon = document.createElement('span');
    icon.className = 'faq-item__icon';
    icon.setAttribute('aria-hidden', 'true');
    icon.textContent = '+';

    trigger.appendChild(question);
    trigger.appendChild(icon);

    var answerWrap = document.createElement('div');
    answerWrap.className = 'faq-item__answer-wrap';
    answerWrap.id = answerId;

    var answer = document.createElement('div');
    answer.className = 'faq-item__answer';

    var answerText = document.createElement('p');
    answerText.textContent = item.answer;

    answer.appendChild(answerText);
    answerWrap.appendChild(answer);
    wrapper.appendChild(trigger);
    wrapper.appendChild(answerWrap);

    trigger.addEventListener('click', function () {
      var isOpen = wrapper.classList.toggle('is-open');
      trigger.setAttribute('aria-expanded', String(isOpen));
    });

    return wrapper;
  }

  function initFaqPage() {
    var faqList = document.getElementById('faq-list');
    if (!faqList || !window.QFFaqData || !Array.isArray(QFFaqData.items)) {
      return;
    }

    var fragment = document.createDocumentFragment();
    QFFaqData.items.forEach(function (item, index) {
      fragment.appendChild(buildFaqItem(item, index));
    });

    faqList.appendChild(fragment);
  }

  document.addEventListener('DOMContentLoaded', function () {
    QFNav.initMenu();
    QFNav.initSubpageHeader();
    initFaqPage();
  });
})();
