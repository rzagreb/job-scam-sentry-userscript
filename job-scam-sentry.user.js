// ==UserScript==
// @name         Job Scam Sentry
// @namespace    https://github.com/rzagreb/job-scam-sentry-userscript
// @version      v0.1.2024-09-22
// @description  Try to take over the world!
// @author       Roman Zagrebnev
// @match        https://www.linkedin.com/jobs/search/*
// @match        https://linkedin.com/jobs/search/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    // Update the regex to target specific fake company names.
    // Currently, it matches any company name containing the letter 'a' (case-insensitive).
    // Replace /a/i with a more precise pattern as needed.
    const fake_job_company_names = /a/i;

    const rules = [
        {
            name: 'linkedin_search',
            url_match: /linkedin\.com\/jobs\/search/,
            // Updated XPath to match potential class name changes by LinkedIn.
            // Ensure this XPath is accurate; class names can change over time.
            company_name_xpath: "//div[contains(@data-view-name,'job-card')]//span[contains(@class, 'job-card-container__primary-description')]",
            company_name_extract: function (node) {
                return node.innerText.trim();
            }
        },
        {
            name: 'glassdoor_search',
            url_match: /glassdoor\.com\/Job\/.*/,
            // placeholders for noe
            //company_name_xpath: "//div[contains(@class, 'employerName')]",
            //company_name_extract: function (node) {
            //    return node.innerText.trim();
            //}
        }
    ];


    // CSS for the background color change animation
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes backgroundColorChange {
            0% { background-color: white; }
            50% { background-color: red; }
            100% { background-color: white; }
        }

        .jss-background-color-change-animation {
            animation: backgroundColorChange 2s infinite;
        }
    `;
    document.head.appendChild(style);

    /**
     * Adds a background color change animation to the specified element.
     * @param {HTMLElement} element - The DOM element to animate.
     */
    function changeBackgroundColorGradually(element) {
        if (element) {
            console.log("Applying background color animation to:", element);
            element.classList.add('jss-background-color-change-animation');
        } else {
            console.log("Element not found for the provided XPath.");
        }
    }

    /**
     * Applies the background color change to all matching company names based on defined rules.
     */
    function applyToCompanyNames() {
        rules.forEach(rule => {
            console.log(rule.url_match);
            console.log(window.location.href);
            if (!(rule.url_match.test(window.location.href))) {
                return; // Skip if the rule does not match the current URL
            }
            console.log(`Rule matched: ${rule.name}`);
            const xpath = rule.company_name_xpath;
            const nodesSnapshot = document.evaluate(xpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
            console.log(`Found ${nodesSnapshot.snapshotLength} company name(s) using XPath: ${xpath}`);

            for (let i = 0; i < nodesSnapshot.snapshotLength; i++) {
                const node = nodesSnapshot.snapshotItem(i);
                const companyName = rule.company_name_extract(node);
                console.log(`Processing company name: "${companyName}"`);

                // Check if the company name matches the fake_job_company_names pattern
                if (fake_job_company_names.test(companyName)) {
                    // To avoid re-processing, check if the animation class is already applied
                    if (!node.classList.contains('jss-background-color-change-animation')) {
                        changeBackgroundColorGradually(node);
                    }
                }
            }
        });
    }

    /**
     * Debounce function to limit the rate at which a function can fire.
     * @param {Function} func - The function to debounce.
     * @param {number} wait - The debounce delay in milliseconds.
     * @returns {Function} - The debounced function.
     */
    function debounce(func, wait) {
        let timeout;
        return function (...args) {
            const later = () => {
                clearTimeout(timeout);
                func.apply(this, args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    /**
     * Initializes the script by applying background changes and setting up a MutationObserver.
     */
    function init() {
        // Determine if any rule matches the current URL
        const matchedRules = rules.filter(rule => rule.url_match.test(window.location.href));

        if (matchedRules.length === 0) {
            console.log("No matching rules found for the current URL. Exiting script.");
            return; // Exit if no rules match
        }

        console.log("Matching rules found. Initializing Job Scam Sentry.");

        // Initial application of background color changes
        applyToCompanyNames();

        // Set up a MutationObserver to watch for changes in the DOM
        const observer = new MutationObserver(debounce((mutationsList, observer) => {
            console.log("DOM mutations detected. Reapplying background color changes.");
            applyToCompanyNames();
        }, 500)); // Adjust the debounce delay as needed

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });

        console.log("MutationObserver has been set up.");
    }

    // Wait for the DOM to be fully loaded before initializing
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
