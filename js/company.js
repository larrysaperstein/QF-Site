/**
 * Company page — card rendering and profile modal
 */
(function () {
  'use strict';

  const IMAGE_BASE_PATTERN = /^assets\/images\/headshots\//;
  const IMAGE_EXTENSIONS = ['jpg', 'jpeg', 'JPG', 'JPEG', 'png', 'PNG', 'webp', 'WEBP'];

  const companyGrid = document.getElementById('company-grid');
  const alumniGrid = document.getElementById('alumni-grid');
  const modal = document.getElementById('company-modal');
  const modalDialog = modal ? modal.querySelector('.company-modal__dialog') : null;
  const modalImage = document.getElementById('company-modal-image');
  const modalRole = document.getElementById('company-modal-role');
  const modalTitle = document.getElementById('company-modal-title');
  const modalBio = document.getElementById('company-modal-bio');
  const EXCLUDED_CURRENT_IDS = ['ellie-diberardino', 'tony-gonzalez'];

  let peopleById = {};
  let lastFocusedEl = null;

  function normalizeImagePath(path) {
    return path.replace(IMAGE_BASE_PATTERN, 'images/headshots/');
  }

  function getImageCandidates(path) {
    const normalized = normalizeImagePath(path);
    const extensionMatch = normalized.match(/\.([^.\/]+)$/);

    if (!extensionMatch) {
      return [normalized];
    }

    const extension = extensionMatch[1];
    const basePath = normalized.slice(0, -extension.length - 1);
    const candidates = [normalized];

    IMAGE_EXTENSIONS.forEach(function (candidateExtension) {
      const candidate = basePath + '.' + candidateExtension;
      if (!candidates.includes(candidate)) {
        candidates.push(candidate);
      }
    });

    return candidates;
  }

  function setImageWithFallback(img, path, altText) {
    const candidates = getImageCandidates(path);
    let candidateIndex = 0;

    img.alt = altText;
    img.hidden = false;
    img.dataset.fallbackIndex = '0';

    img.onerror = function () {
      candidateIndex += 1;
      img.dataset.fallbackIndex = String(candidateIndex);

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

  function getCurrentCompanyPeople(data) {
    const castPeople = data.buildPeople(data.rosters.cast);
    const creativePeople = data.buildPeople(data.rosters.creative);
    const allCurrentPeople = castPeople.concat(creativePeople, data.currentAdditionalPeople || []);
    const seenIds = {};

    return allCurrentPeople.filter(function (person) {
      if (seenIds[person.id]) {
        return false;
      }

      if (EXCLUDED_CURRENT_IDS.includes(person.id)) {
        return false;
      }

      seenIds[person.id] = true;
      return true;
    });
  }

  function getPersonMeta(person) {
    return [person.role, person.extra].filter(Boolean).join(' / ');
  }

  function getLastName(person) {
    const nameParts = person.name.trim().split(/\s+/);
    return nameParts[nameParts.length - 1].toLowerCase();
  }

  function compareByLastName(a, b) {
    const lastNameComparison = getLastName(a).localeCompare(getLastName(b));

    if (lastNameComparison !== 0) {
      return lastNameComparison;
    }

    return a.name.localeCompare(b.name);
  }

  function createCard(person) {
    const card = document.createElement('button');
    card.className = 'company-card';
    card.type = 'button';
    card.setAttribute('aria-label', 'Read ' + person.name + ' bio');
    card.dataset.personId = person.id;

    const imageWrap = document.createElement('span');
    imageWrap.className = 'company-card__image-wrap';

    const image = document.createElement('img');
    image.className = 'company-card__image';
    image.loading = 'lazy';
    image.decoding = 'async';
    setImageWithFallback(image, person.image, person.name);

    const placeholder = document.createElement('span');
    placeholder.className = 'company-card__placeholder';
    placeholder.textContent = person.name.charAt(0);
    placeholder.setAttribute('aria-hidden', 'true');

    const body = document.createElement('span');
    body.className = 'company-card__body';

    const name = document.createElement('span');
    name.className = 'company-card__name';
    name.textContent = person.name;

    body.append(name);

    imageWrap.append(placeholder, image);
    card.append(imageWrap, body);
    card.addEventListener('click', function () {
      openModal(person.id);
    });

    return card;
  }

  function renderPeople(gridEl, people, sectionName) {
    if (!gridEl) {
      return;
    }

    const fragment = document.createDocumentFragment();
    const sortedPeople = people.slice().sort(compareByLastName);

    sortedPeople.forEach(function (person) {
      peopleById[person.id] = person;
      fragment.appendChild(createCard(person, sectionName));
    });

    gridEl.textContent = '';
    gridEl.appendChild(fragment);
  }

  function openModal(personId) {
    const person = peopleById[personId];

    if (!person || !modal) {
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
    setImageWithFallback(modalImage, person.image, person.name);

    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    modalDialog.focus();
  }

  function closeModal() {
    if (!modal || !modal.classList.contains('is-open')) {
      return;
    }

    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');

    if (lastFocusedEl && typeof lastFocusedEl.focus === 'function') {
      lastFocusedEl.focus();
    }
  }

  function initModal() {
    if (!modal) {
      return;
    }

    modal.querySelectorAll('[data-modal-close]').forEach(function (button) {
      button.addEventListener('click', closeModal);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        closeModal();
      }
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    QFNav.initMenu();
    QFNav.initSubpageHeader();

    const data = window.QFMCompanyData;

    if (!data) {
      console.error('Company data is unavailable.');
      return;
    }

    renderPeople(companyGrid, getCurrentCompanyPeople(data), 'company');
    renderPeople(alumniGrid, data.alumniPeople || [], 'alumni');
    initModal();
  });
})();
