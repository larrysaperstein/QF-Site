/**
 * Headshot extension fallback for company cards and modal image.
 */
(function () {
  'use strict';

  function applyImageFallback(img) {
    var rawCandidates = img.getAttribute('data-image-candidates');
    if (!rawCandidates) {
      return;
    }

    var candidates;
    try {
      candidates = JSON.parse(rawCandidates);
    } catch (error) {
      return;
    }

    if (!Array.isArray(candidates) || !candidates.length) {
      return;
    }

    var candidateIndex = 0;
    img.hidden = false;

    img.onerror = function () {
      candidateIndex += 1;

      if (candidateIndex < candidates.length) {
        img.src = candidates[candidateIndex];
        return;
      }

      img.hidden = true;
    };

    img.onload = function () {
      img.hidden = false;
    };

    img.src = candidates[candidateIndex];
  }

  function initCompanyImages() {
    document.querySelectorAll('.company-card__image, .company-modal__image').forEach(applyImageFallback);
  }

  document.addEventListener('DOMContentLoaded', initCompanyImages);
})();
