/**
 * Upcoming dates page — all events
 */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    QFNav.initMenu();
    QFNav.initSubpageHeader();

    const datesList = document.getElementById('dates-list');

    if (datesList) {
      QFCalendar.loadIntoList(datesList);
    }
  });
})();
