// ==UserScript==
// @name         Job Scam Sentry
// @namespace    https://github.com/rzagreb/job-scam-sentry-userscript
// @updateURL    https://github.com/rzagreb/job-scam-sentry-userscript/raw/refs/heads/main/dist/job_scam_sentry.user.js
// @downloadURL  https://github.com/rzagreb/job-scam-sentry-userscript/raw/refs/heads/main/dist/job_scam_sentry.user.js
// @version      v0.1.1
// @description  Highlights companies that post fake jobs.
// @author       Roman Zagrebnev
// @match        https://www.linkedin.com/jobs/search/*
// @match        https://www.linkedin.com/jobs/view/*
// @match        https://www.glassdoor.com/Job/*
// @match        https://www.glassdoor.com/job-listing/*
// @match        https://www.indeed.com/jobs?*
// @match        https://www.indeed.com/viewjob?jk=*
// @match        https://www.ziprecruiter.com/jobs-search?*
// @match        https://www.ziprecruiter.com/jobs/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const fakeJobCompanyNames = new RegExp({{{COMPANIES_REGEX_JSON}}}[0], 'i');

    const rules = [
        {
            name: 'linkedin_search',
            url_match: /linkedin\.com\/jobs\/search/,
            company_name_xpath: [
                "//div[contains(@data-view-name,'job-card')]//span[contains(@class, 'job-card-container__primary-description')]",
                "//div[contains(@class,'job-details-jobs-unified-top-card__company-name')]//a[contains(@href, 'linkedin.com/company/')]"
            ].join(' | '),
        },
        {
            name: 'linkedin_job',
            url_match: /linkedin\.com\/jobs\/view/,
            company_name_xpath: "//div[contains(@class,'job-details-jobs-unified-top-card__company-name')]//a[contains(@href, 'linkedin.com/company/')]",
        },
        {
            name: 'glassdoor_search',
            url_match: /glassdoor\.com\/Job\/.*/,
            company_name_xpath: [
                "//span[contains(@class,'EmployerProfile_compactEmployerName')]",
                "//div[contains(@class,'EmployerProfile_employerNameContainer')]//h4"
            ].join(' | '),
        },
        {
            name: 'glassdoor_job',
            url_match: /glassdoor\.com\/job-listing/,
            company_name_xpath: "//div[contains(@class,'EmployerProfile_employerNameContainer')]//h4",
        },
        {
            name: 'indeed_search',
            url_match: /indeed\.com\/jobs/,
            company_name_xpath: [
                "//span[contains(@data-testid,'company-name')]",
                "//a[contains(@href, 'https://www.indeed.com/cmp')]"
            ].join(' | '),
        },
        {
            name: 'indeed_job',
            url_match: /indeed\.com\/viewjob/,
            company_name_xpath: "//div[contains(@data-testid,'inlineHeader-companyName')]/span",
        },
        {
            name: 'ziprecruiter_search',
            url_match: /ziprecruiter\.com\/jobs-search/,
            company_name_xpath: "//a[starts-with(@href,'/co/')]",
        },
        {
            name: 'ziprecruiter_job',
            url_match: /ziprecruiter\.com\/jobs/,
            company_name_xpath: [
                "//a[contains(@href,'/c/')]",
                "//p[contains(@class,'hiring_company_name')]"
            ].join(' | '),
        }
    ];

    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes backgroundColorChange {
            0% { background-color: #fff2e6; }
            50% { background-color: #ffcc99; }
            100% { background-color: #fff2e6; }
        }

        .jss-background-color-change-animation {
            animation: backgroundColorChange 3s infinite;
        }
    `;
    document.head.appendChild(style);

    function applyStyle(element) {
        if (element) {
            element.classList.add('jss-background-color-change-animation');
        }
    }

    function applyStyleToCompany() {
        rules.forEach(rule => {
            if (!(rule.url_match.test(window.location.href))) {
                return
            }
            console.log('jss: Applying style for rule:', rule.name);

            const xpath = rule.company_name_xpath;
            const nodesSnapshot = document.evaluate(xpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

            for (let i = 0; i < nodesSnapshot.snapshotLength; i++) {
                const node = nodesSnapshot.snapshotItem(i);
                const companyName = node.innerText.trim();

                //console.log('jss: Company name:', companyName);
                if (fakeJobCompanyNames.test(companyName)) {
                    // To avoid re-processing, check if the animation class is already applied
                    if (!node.classList.contains('jss-background-color-change-animation')) {
                        applyStyle(node);
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

    function init() {
        // skip if no rules match
        const matchedRules = rules.filter(rule => rule.url_match.test(window.location.href));
        console.log('jss: Matched rules:', matchedRules.map(rule => rule.name));
        if (matchedRules.length === 0) { return; }

        // Initial apply 
        console.log('jss: Initial apply')
        applyStyleToCompany();

        // Apply after new elements appear
        console.log('jss: Apply after new elements appear')
        const observer = new MutationObserver(debounce((mutationsList, observer) => {
            applyStyleToCompany();
        }, 500));
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
