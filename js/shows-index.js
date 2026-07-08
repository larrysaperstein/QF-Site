/**
 * Shows index page rendering
 */
(function () {
  'use strict';

  function createShowCard(show) {
    var article = document.createElement('article');
    article.className = 'shows-card';

    var link = document.createElement('a');
    link.className = 'shows-card__link';
    link.href = show.pageUrl;
    link.setAttribute('aria-label', 'Open ' + show.title + ' page');

    var image = document.createElement('img');
    image.className = 'shows-card__image';
    image.src = show.logo;
    image.alt = show.title + ' logo';
    image.loading = 'lazy';
    image.decoding = 'async';

    link.appendChild(image);
    article.appendChild(link);
    return article;
  }

  function renderShowsGrid() {
    var grid = document.getElementById('shows-grid');
    if (!grid || !window.QFShowsData) {
      return;
    }

    var fragment = document.createDocumentFragment();
    QFShowsData.shows.forEach(function (show) {
      fragment.appendChild(createShowCard(show));
    });

    grid.textContent = '';
    grid.appendChild(fragment);
  }

  document.addEventListener('DOMContentLoaded', function () {
    QFNav.initMenu();
    QFNav.initSubpageHeader();
    renderShowsGrid();
  });
})();
