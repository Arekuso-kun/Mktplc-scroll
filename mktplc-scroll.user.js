// ==UserScript==
// @name         Mktplc scroll
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Alexo
// @match        https://marketplace.tf/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=marketplace.tf
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Create button element
    var button = document.createElement('button');
    button.textContent = 'Scroll off';
    button.setAttribute('type', 'button');
    button.setAttribute('id', 'scroll');
    button.classList.add("btn", "btn-primary", "btn-sm");
    button.style.position = 'fixed';
    button.style.right = '12.65px';
    button.style.top = '12.65px';
    button.style.zIndex = '9999';

    // Append button to document body
    document.body.appendChild(button);

    // Set initial scrolling state
    var isScrolling = false;
    var scrollInterval = null;

    // Function to start or stop scrolling
    function toggleScroll() {
        if (isScrolling) {
            // Stop scrolling
            clearInterval(scrollInterval);
            button.textContent = 'Scroll off';
            isScrolling = false;
        } else {
            // Start scrolling
            scrollInterval = setInterval(function() {
                if (document.body.scrollHeight > 400000) {
                    // Stop scrolling if body height exceeds 400000
                    clearInterval(scrollInterval);
                    button.textContent = 'Scroll off';
                    isScrolling = false;
                } else {
                    window.scrollBy(0, document.body.scrollHeight);
                }
            }, 1000); // Adjust scroll speed as needed
            button.textContent = 'Scroll on';
            isScrolling = true;
        }
    }

    // Add click event listener to button
    button.addEventListener('click', toggleScroll);

})();
