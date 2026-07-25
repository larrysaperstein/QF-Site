/**
 * Company profile modal with lazy-loaded bio data.
 */
(function () {
  'use strict';

  var modal = document.getElementById('company-modal');
  var modalDialog = modal ? modal.querySelector('.company-modal__dialog') : null;
  var modalImage = document.getElementById('company-modal-image');
  var modalRole = document.getElementById('company-modal-role');
  var modalTitle = document.getElementById('company-modal-title');
  var modalBio = document.getElementById('company-modal-bio');
  var biosPromise = null;
  var biosById = null;
  var lastFocusedEl = null;

  function loadBios() {
    if (biosById) {
      return Promise.resolve(biosById);
    }

    if (!biosPromise) {
      biosPromise = fetch('/data/company-bios.json')
        .then(function (response) {
          if (!response.ok) {
            throw new Error('Unable to load company bios.');
          }
          return response.json();
        })
        .then(function (data) {
          biosById = data;
          return biosById;
        })
        .catch(function (error) {
          biosPromise = null;
          throw error;
        });
    }

    return biosPromise;
  }

  function setModalImage(person) {
    if (!modalImage) {
      return;
    }

    modalImage.alt = person.name;
    modalImage.setAttribute('data-image-candidates', JSON.stringify(getImageCandidates(person.image)));
    modalImage.dispatchEvent(new Event('company-image-update'));
  }

  function getImageCandidates(path) {
    var normalized = path.replace(/^assets\/images\/headshots\//, '/images/headshots/');
    var extensionMatch = normalized.match(/\.([^./]+)$/);

    if (!extensionMatch) {
      return [normalized];
    }

    var extension = extensionMatch[1];
    var basePath = normalized.slice(0, -extension.length - 1);
    var candidates = [normalized];
    var extensions = ['jpg', 'jpeg', 'JPG', 'JPEG', 'png', 'PNG', 'webp', 'WEBP'];

    extensions.forEach(function (candidateExtension) {
      var candidate = basePath + '.' + candidateExtension;
      if (candidates.indexOf(candidate) === -1) {
        candidates.push(candidate);
      }
    });

    return candidates;
  }

  function applyImageFallback(img) {
    var rawCandidates = img.getAttribute('data-image-candidates');
    if (!rawCandidates) {
      return;
    }

    var candidates = JSON.parse(rawCandidates);
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

  if (modalImage) {
    modalImage.addEventListener('company-image-update', function () {
      applyImageFallback(modalImage);
    });
  }

  function openModal(personId) {
    if (!modal) {
      return;
    }

    loadBios()
      .then(function (bios) {
        var person = bios[personId];

        if (!person) {
          return;
        }

        lastFocusedEl = document.activeElement;
        modalTitle.textContent = person.name;
        modalRole.textContent = '';
        modalRole.hidden = true;
        modalBio.innerHTML = person.bioHtml || '<p>Bio coming soon.</p>';
        modalBio.querySelectorAll('a').forEach(function (link) {
          link.target = '_blank';
          link.rel = 'noopener noreferrer';
        });
        setModalImage(person);

        modal.classList.add('is-open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('modal-open');
        setModalPageInertState(true);
        modalDialog.focus();
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  function closeModal() {
    if (!modal || !modal.classList.contains('is-open')) {
      return;
    }

    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
    setModalPageInertState(false);

    if (lastFocusedEl && typeof lastFocusedEl.focus === 'function') {
      lastFocusedEl.focus();
    }
  }

  function initCardHandlers() {
    document.querySelectorAll('.company-card[data-person-id]').forEach(function (card) {
      card.addEventListener('click', function () {
        openModal(card.getAttribute('data-person-id'));
      });
    });
  }

  function initModal() {
    if (!modal) {
      return;
    }

    modal.querySelectorAll('[data-modal-close]').forEach(function (button) {
      button.addEventListener('click', closeModal);
    });

    document.addEventListener('keydown', function (event) {
      if (!modal.classList.contains('is-open')) {
        return;
      }

      if (event.key === 'Escape') {
        closeModal();
        return;
      }

      if (event.key === 'Tab') {
        trapModalFocus(event);
      }
    });
  }

  function setModalPageInertState(isInert) {
    Array.prototype.forEach.call(document.body.children, function (el) {
      if (el === modal) {
        return;
      }

      if (isInert) {
        el.setAttribute('inert', '');
      } else {
        el.removeAttribute('inert');
      }
    });
  }

  function trapModalFocus(event) {
    var focusables = Array.prototype.slice
      .call(
        modalDialog.querySelectorAll(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      )
      .filter(function (el) {
        return el.offsetParent !== null;
      });

    if (!focusables.length) {
      event.preventDefault();
      modalDialog.focus();
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

  document.addEventListener('DOMContentLoaded', function () {
    QFNav.initMenu();
    QFNav.initSubpageHeader();
    initCardHandlers();
    initModal();
  });
})();
