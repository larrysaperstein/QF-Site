/**
 * Shared calendar fetch and render utilities
 */
var QFCalendar = (function () {
  'use strict';
  var CACHE_KEY = 'qf-calendar-events-v1';
  var CACHE_TTL_MS = 10 * 60 * 1000;

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
      const ticketsMarkup = ticketUrl !== '#'
        ? '<a href="' + escapeHtml(ticketUrl) + '" class="btn btn--outline dates__tickets"' + ticketLinkAttrs + '>Tickets</a>'
        : '<span class="btn btn--outline dates__tickets" aria-disabled="true">Tickets</span>';

      li.innerHTML =
        '<div class="dates__main">' +
          '<span class="dates__datetime">' +
            '<span class="dates__date">' + escapeHtml(event.date) + '</span> ' +
            '<span class="dates__time">' + escapeHtml(event.time) + '</span>' +
          '</span>' +
          '<span class="dates__separator" aria-hidden="true"></span>' +
          '<span class="dates__title">' + escapeHtml(event.title) + '</span>' +
        '</div>' +
        ticketsMarkup;

      listEl.appendChild(li);
    });
  }

  function getCachedEvents() {
    try {
      var raw = sessionStorage.getItem(CACHE_KEY);
      if (!raw) {
        return null;
      }

      var parsed = JSON.parse(raw);
      if (!parsed || !Array.isArray(parsed.events) || typeof parsed.timestamp !== 'number') {
        return null;
      }

      if ((Date.now() - parsed.timestamp) > CACHE_TTL_MS) {
        return null;
      }

      return parsed.events;
    } catch (error) {
      return null;
    }
  }

  function setCachedEvents(events) {
    try {
      sessionStorage.setItem(CACHE_KEY, JSON.stringify({
        timestamp: Date.now(),
        events: events,
      }));
    } catch (error) {
      /* ignore cache write errors */
    }
  }

  function fetchEventsWithRetry(calendarApiUrl, attemptsRemaining) {
    return fetchEvents(calendarApiUrl).catch(function (error) {
      if (attemptsRemaining <= 1) {
        throw error;
      }

      return new Promise(function (resolve) {
        setTimeout(resolve, 600);
      }).then(function () {
        return fetchEventsWithRetry(calendarApiUrl, attemptsRemaining - 1);
      });
    });
  }

  function loadIntoList(listEl, options) {
    const maxEvents = options && options.maxEvents;
    const calendarApiUrl = QF_CONFIG.calendarApiUrl;

    if (!calendarApiUrl) {
      renderEvents(listEl, []);
      return Promise.resolve();
    }

    var cachedEvents = getCachedEvents();
    if (cachedEvents) {
      var cachedLimited = typeof maxEvents === 'number'
        ? cachedEvents.slice(0, maxEvents)
        : cachedEvents;
      renderEvents(listEl, cachedLimited);
    }

    return fetchEventsWithRetry(calendarApiUrl, 3)
      .then(function (events) {
        setCachedEvents(events);
        const limited = typeof maxEvents === 'number'
          ? events.slice(0, maxEvents)
          : events;

        renderEvents(listEl, limited);
      })
      .catch(function (err) {
        console.error('Failed to load calendar events:', err);
        if (!cachedEvents) {
          listEl.innerHTML =
            '<li class="dates__empty">Unable to load upcoming dates right now. Please check back soon.</li>';
        }
      });
  }

  return {
    loadIntoList: loadIntoList,
  };
})();
