/**
 * Shared calendar fetch and render utilities
 */
var QFCalendar = (function () {
  'use strict';

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function fetchEvents(calendarApiUrl) {
    return fetch(calendarApiUrl, { redirect: 'follow' })
      .then(function (response) {
        return response.text().then(function (text) {
          let data;

          try {
            data = JSON.parse(text);
          } catch (parseError) {
            throw new Error('Calendar API returned invalid JSON');
          }

          if (data && data.error) {
            throw new Error(data.error);
          }

          if (!Array.isArray(data)) {
            throw new Error('Calendar API returned unexpected data');
          }

          return data;
        });
      })
      .then(function (data) {
        const now = new Date();

        return data
          .filter(function (event) {
            return new Date(event.startDate) >= now;
          })
          .sort(function (a, b) {
            return new Date(a.startDate) - new Date(b.startDate);
          });
      });
  }

  function renderEvents(listEl, events) {
    listEl.innerHTML = '';

    if (!events.length) {
      listEl.innerHTML = '<li class="dates__empty">No upcoming dates at this time. Check back soon!</li>';
      return;
    }

    events.forEach(function (event) {
      const li = document.createElement('li');
      li.className = 'dates__item';

      const ticketUrl = event.ticketUrl || '#';
      const ticketLinkAttrs = ticketUrl !== '#'
        ? ' target="_blank" rel="noopener noreferrer"'
        : '';

      li.innerHTML =
        '<div class="dates__main">' +
          '<span class="dates__datetime">' +
            '<span class="dates__date">' + escapeHtml(event.date) + '</span> ' +
            '<span class="dates__time">' + escapeHtml(event.time) + '</span>' +
          '</span>' +
          '<span class="dates__separator" aria-hidden="true"></span>' +
          '<span class="dates__title">' + escapeHtml(event.title) + '</span>' +
        '</div>' +
        '<a href="' + escapeHtml(ticketUrl) + '" class="btn btn--outline dates__tickets"' + ticketLinkAttrs + '>Tickets</a>';

      listEl.appendChild(li);
    });
  }

  function loadIntoList(listEl, options) {
    const maxEvents = options && options.maxEvents;
    const calendarApiUrl = QF_CONFIG.calendarApiUrl;

    if (!calendarApiUrl) {
      renderEvents(listEl, []);
      return Promise.resolve();
    }

    return fetchEvents(calendarApiUrl)
      .then(function (events) {
        const limited = typeof maxEvents === 'number'
          ? events.slice(0, maxEvents)
          : events;

        renderEvents(listEl, limited);
      })
      .catch(function (err) {
        console.error('Failed to load calendar events:', err);
        listEl.innerHTML =
          '<li class="dates__empty">Unable to load upcoming dates right now. Please check back soon.</li>';
      });
  }

  return {
    loadIntoList: loadIntoList,
  };
})();
