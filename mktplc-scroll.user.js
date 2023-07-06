// ==UserScript==
// @name         Mktplc scroll
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  try to take over the world!
// @author       Alexo
// @match        https://marketplace.tf/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=marketplace.tf
// @grant        none
// ==/UserScript==

(function () {
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

    var button_open_tabs = document.createElement('button');
    button_open_tabs.textContent = 'Open tabs';
    button_open_tabs.setAttribute('type', 'button');
    button_open_tabs.setAttribute('id', 'scroll');
    button_open_tabs.classList.add("btn", "btn-primary", "btn-sm");
    button_open_tabs.style.position = 'fixed';
    button_open_tabs.style.left = '12.65px';
    button_open_tabs.style.top = '12.65px';
    button_open_tabs.style.zIndex = '9999';

    document.body.appendChild(button_open_tabs);

    // Set initial scrolling state
    var isScrolling = false;
    var scrollInterval = null;

    async function processURLs() {
        const urls = [
            'https://marketplace.tf/shop/76561198262010565',
            'https://marketplace.tf/shop/76561198213990679',
            'https://marketplace.tf/shop/76561198814850950',
            'https://marketplace.tf/shop/76561198272920071',
            'https://marketplace.tf/shop/76561198333341262',
            'https://marketplace.tf/shop/76561198219409524',
            'https://marketplace.tf/browse/tf2?ssortfield=popularity'
        ];

        const urls_unusuals = [
            'https://stntrading.eu/buy/unusuals/17',
            'https://stntrading.eu/buy/unusuals/107'
        ];

        for (const url of urls) {
            await processURL(url);
        }

        for (const url of urls_unusuals) {
            window.open(url, '_blank');
        }
    }

    async function processURL(url) {
        return new Promise((resolve) => {
            // Open a new tab and get a reference to it
            const newTab = window.open(url, '_blank');
            let timePassed = 0;
            const interval = 1000;

            // Wait for the new tab to finish loading
            newTab.addEventListener('load', () => {
                // Function to scroll the new tab to the bottom
                function scrollToBottom() {
                    newTab.scrollBy(0, newTab.document.body.scrollHeight);
                }

                // Function to check if the new tab's height has changed
                function hasTabHeightChanged() {
                    return newTab.document.body.scrollHeight !== hasTabHeightChanged.previousHeight;
                }
                hasTabHeightChanged.previousHeight = 0;

                // Start scrolling to the bottom and check if the height changes
                const scrollInterval = setInterval(() => {
                    scrollToBottom();
                    timePassed += interval;

                    if ((!hasTabHeightChanged() && timePassed > 2500) || newTab.document.body.scrollHeight > 400000) {
                        clearInterval(scrollInterval);
                        resolve();
                    }
                    if (hasTabHeightChanged()) {
                        timePassed = 0;
                    }

                    hasTabHeightChanged.previousHeight = newTab.document.body.scrollHeight;
                }, interval);
            });
        });
    }

    // Function to start or stop scrolling
    function toggleScroll() {
        if (isScrolling) {
            // Stop scrolling
            clearInterval(scrollInterval);
            button.textContent = 'Scroll off';
            isScrolling = false;
        } else {
            // Start scrolling
            scrollInterval = setInterval(function () {
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
    button_open_tabs.addEventListener('click', processURLs);

})();
