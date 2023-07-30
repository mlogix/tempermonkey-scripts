// ==UserScript==
// @name         vstup.edbo.js
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://vstup.edbo.gov.ua/offer/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=gov.ua
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

  $( document ).ready(function() {
    const header = $('#offer-requests-header');
    $(header).append($('<div class="offer-request" style="min-height: 150px">\
                           <div class="offer-request-n"></div>\
                           <div class="offer-request-fio"></div>\
                           <div class="offer-request-status"></div>\
                           <div class="offer-request-priority">\
                             <select id="filter-rate" multiple=true style="min-width: 50px; min-height: 120px; margin: 10px;">\
                               <option selected=true value="1">1</option>\
                               <option selected=true value="2">2</option>\
                               <option selected=true value="3">3</option>\
                               <option selected=true value="4">4</option>\
                               <option selected=true value="5">5</option>\
                               <option selected=true value="К">К</option>\
                             </select>\
                           </div>\
                           <div class="offer-documents">\
                             <div>Min: <input id="rate-min" value=120 /></div>\
                             <div>Max: <input id="rate-max" value=200 /></div>\
                           </div>\
                           <div class="offer-request-kv"></div>\
                           <div class="offer-subjects">\
                             <button id="filter-action" style="width: 100px;height: 30px;">Filter</button>\
                           </div>\
                         </div>\
                         '));

    $("#filter-action" ).on( "click", function() {
      const priorities = $('#filter-rate').val();
      const rows = $('#offer-requests-body > .offer-request');
      let counter = 0;
      const rateMin = Number.parseFloat($('#rate-min').val());
      const rateMax = Number.parseFloat($('#rate-max').val());

      rows.each((_, row) => {
        const priority = $(row).find('.offer-request-priority > div').text().trim();
        const rate = Number.parseFloat($(row).find('.offer-request-kv > div').text().replace(',', '.'));

        console.log(111, priority, priority.charCodeAt())

        if (priorities.includes(priority) && rateMin <= rate && rate <= rateMax) {
          counter = counter + 1;
          $(row).show();
        } else {
          $(row).hide();
        }

        $(row).find('.offer-request-n').text(counter);
      });
    });
  });
})();
