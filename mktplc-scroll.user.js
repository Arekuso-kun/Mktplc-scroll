// ==UserScript==
// @name         Mktplc scroll
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  try to take over the world!
// @author       Alexo
// @match        https://marketplace.tf/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=marketplace.tf
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    var button = document.createElement('button');
    button.textContent = 'Scroll off';
    button.setAttribute('type', 'button');
    button.setAttribute('id', 'scroll');
    button.classList.add("btn", "btn-primary", "btn-sm");
    button.style.position = 'fixed';
    button.style.right = '12.65px';
    button.style.top = '12.65px';
    button.style.zIndex = '9999';

    document.body.appendChild(button);
    updateScrollText();

    const containerElement = document.createElement('div');
    containerElement.style.position = 'fixed';
    containerElement.style.right = '20px';
    containerElement.style.top = `${button.offsetTop + button.offsetHeight + 12.65 * 2}px`; // Adjust the offset as needed
    containerElement.style.zIndex = '9999';
    containerElement.style.display = 'flex';
    containerElement.style.alignItems = 'center';
    containerElement.style.gap = '5px';

    const textElement = document.createElement('span');
    textElement.setAttribute('id', 'statusText');
    textElement.textContent = 'Status:';

    const iconElement = document.createElement('i');
    iconElement.setAttribute('id', 'statusIcon');
    iconElement.classList.add('fa', 'fa-lg', 'fa-circle');

    containerElement.appendChild(textElement);
    containerElement.appendChild(iconElement);
    document.body.appendChild(containerElement);

    var status = localStorage.getItem('status');
    if (status === null) {
        status = false; // Set your desired default value here
    } else {
        status = JSON.parse(status); // Parse the stored value
    }

    function updateStatusColor() {
        iconElement.style.color = status ? 'green' : 'red';
    }

    var button_status = document.createElement('button');
    button_status.textContent = 'Auto scroll';
    button_status.setAttribute('type', 'button');
    button_status.setAttribute('id', 'toggleButton');
    button_status.classList.add('btn', 'btn-primary', 'btn-sm');
    button_status.style.position = 'fixed';
    button_status.style.right = '12.65px';
    button_status.style.top = `${containerElement.offsetTop + containerElement.offsetHeight + 12.65}px`; // Adjust the offset as needed
    button_status.style.zIndex = '9999';

    document.body.appendChild(button_status);
    updateStatusColor();

    var button_open_tabs = document.createElement('button');
    button_open_tabs.textContent = 'Open tabs';
    button_open_tabs.setAttribute('type', 'button');
    button_open_tabs.setAttribute('id', 'openTabs');
    button_open_tabs.classList.add("btn", "btn-primary", "btn-sm");
    button_open_tabs.style.position = 'fixed';
    button_open_tabs.style.left = '12.65px';
    button_open_tabs.style.top = '12.65px';
    button_open_tabs.style.zIndex = '9999';

    document.body.appendChild(button_open_tabs);

    var isScrolling = false;
    var scrollInterval = null;
    var timePassed = 0, maxTimePassed = 5000, maxHeight = 400000;
    const urls = [
        'https://marketplace.tf/shop/76561198262010565',
        'https://marketplace.tf/shop/76561198213990679',
        'https://marketplace.tf/shop/76561198814850950',
        'https://marketplace.tf/shop/76561198272920071',
        'https://marketplace.tf/shop/76561198333341262',
        'https://marketplace.tf/shop/76561198219409524',
        'https://marketplace.tf/browse/tf2?ssortfield=popularity',
        'https://stntrading.eu/buy/unusuals/17',
        'https://stntrading.eu/buy/unusuals/107'
    ];

    const currentLink = window.location.href;
    if(urls.includes(currentLink) && status) {
        toggleScroll();
    }

    function updateScrollText() {
        button.textContent = isScrolling ? `${timePassed/1000}/${maxTimePassed/1000} sec | Height: ${document.body.scrollHeight}/${maxHeight/1000}k` : 'Scroll: off';
    }

    function toggleScroll() {
        if (isScrolling) {
            clearInterval(scrollInterval);
            isScrolling = false;
        } else {
            var previousHeight = 0, interval = 1000;
            timePassed = 0;

            function hasHeightChanged() {
                return document.body.scrollHeight !== previousHeight;
            }

            scrollInterval = setInterval(function () {
                if ((!hasHeightChanged() && timePassed >= maxTimePassed) || document.body.scrollHeight > maxHeight) {
                    clearInterval(scrollInterval);
                    isScrolling = false;
                    updateScrollText();
                }
                if (hasHeightChanged()) {
                    timePassed = 0;
                }
                if (!document.hidden) {
                    timePassed += interval;
                }
                window.scrollBy(0, document.body.scrollHeight);
                previousHeight = document.body.scrollHeight;
                updateScrollText();
            }, interval);

            isScrolling = true;
        }
        updateScrollText();
    }

    function openTabs() {
        for (const url of urls) {
            window.open(url);
        }
    }

    function toggleStatus() {
        status = !status;
        localStorage.setItem('status', JSON.stringify(status)); // Store the updated value
        updateStatusColor();
    }

    button.addEventListener('click', toggleScroll);
    button_open_tabs.addEventListener('click', openTabs);
    button_status.addEventListener('click', toggleStatus);
})();
