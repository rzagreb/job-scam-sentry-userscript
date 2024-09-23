# Job Scam Sentry

**Job Scam Sentry** is a browser extension that helps job seekers identify and avoid fake job postings. By highlighting companies that repeatedly post fraudulent job listings, it empowers users to make informed decisions and protect themselves from scams.

## Features

- **Detect Fake Jobs:** Identifies and highlights companies that post duplicate job listings with identical titles and descriptions within 3 months.
- **Supported Platforms:** Compatible with major job boards for seamless integration into your job search.
  - [LinkedIn](https://www.linkedin.com)
  - [Glassdoor](https://www.glassdoor.com)
  - [Indeed](https://www.indeed.com)
  - [ZipRecruiter](https://www.ziprecruiter.com)
- **User-Friendly Interface:** Easy to install and use without requiring technical expertise.

## Installation

1. **Install a Userscript Manager:**
   - Google Chrome: Install [Tampermonkey](https://chromewebstore.google.com/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo).
   - Mozilla Firefox: Install [Greasemonkey](https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/).
2. **Install the Userscript:**
   - Click on this [direct link to the script](https://github.com/rzagreb/job-scam-sentry-userscript/raw/refs/heads/main/dist/job_scam_sentry.user.js).
   - Your userscript manager should prompt you to install the script.
   - Confirm the installation.

## Usage

Once installed, it works automatically in the background:

1. **Browse Job Listings:** Navigate to any supported job website and browse job listings as you normally would.
2. **Automatic Highlighting:** The extension will automatically highlight companies that have posted fake or duplicate job listings.

![Demo](docs/assets/demo.gif)

## Additional Information

- **Full List of Scam Companies:** Access the comprehensive list of flagged companies [here](https://github.com/rzagreb/job-scam-sentry-userscript/blob/main/src/companies.csv).
