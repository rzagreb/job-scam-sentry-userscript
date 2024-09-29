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

    const fakeJobCompanyNames = new RegExp(["^(?: rainbow restoration|1(?:0x genomics|password)|2(?:1st century home health services inc\\.|k)|3pillar|a(?: (?:hiring company|place for mom)|\\.g\\.e\\.s\\. learning solutions|b(?:arca health|b(?:(?:vie|yy))?|normal security|ridge)|c(?:c(?:e(?:leration partners|nture(?: federal services)?)|urate background)|t(?:alent|ivecampaign))|di(?: global distribution|entone|ti consulting)|erovect|f(?:firm|terpay)|g(?:ile defense|oda|tonomy)|head|i(?:dash|r(?:bnb|call)|s \\(applied information sciences\\))|kraya, inc\\.|l(?:edade|golia|imentiv|l(?:ied beverage group|sta(?:ff staffing \\& recruiting|te))|phasense|t(?:(?:era digital health inc\\. united states|ium|o pharmacy))?)|m(?:azon(?:(?: (?:games|web services \\(aws\\))|\\.com services llc(?: \\- a57)?))?|cor|entum|plitude )|n(?:avation|chorage digital|duril industries|g(?:ela spiegel|i)|s(?:er advisory|ys)|ywhere real estate inc\\.)|p(?:ex(?: systems)?|ixio|ollo\\.io|p(?:en|l(?:ovin|e)|zen, inc\\.))|r(?:c(?:adi[as]|h capital services llc)|go group|mis security|rive logistics)|s(?:c(?:end analytics|yndent)|sociated bank|tranis)|t(?:\\-bay|accama|lan|omic machines|tentive)|u(?:ditboard|gment jobs|todesk)|va(?:ility|lere health|nce consulting)|xon(?:ius)?)|b(?:a(?:nner bank|rbaricum|ylor (?:genetics|scott \\& white health)|zaarvoice)|e(?:c(?:kman coulter diagnostics|u)|nchling|rk(?:eley research group, llc|shire hathaway homestate companies)|t(?:a technologies|mgm)|yondtrust)|i(?:g(?:commerce|id)|mbo bakeries usa|zcoder ai)|l(?:ackbird health|end|ink health|u(?:e(?: water thinking|print)|peak credit union))|mo u\\.s\\.|o(?:oz allen hamilton|ttomline|unteous)|pm llp|r(?:a(?:intrust|nch)|ex|i(?:ghtwheel|llio))|u(?:ilders firstsource|siness worx group|yers edge platform, llc))|c(?:\\-4 analytics, llc|a(?:mp(?:bell's|fire consulting)|nonical|p(?:ital (?:one|rx)|ti(?:ons|vation software))|r(?:dinal health|e(?:source|t)|s commerce|ta)|s(?:h app|t \\& crew)|ylent)|d(?:c foundation|w)|e(?:l(?:erion|onis)|n(?:cora|te(?:ne corporation|rfield))|pheid|rtifid)|h(?:ain(?:alysis\\-careers|guard|link labs)|ildren's hospital los angeles \\(chla\\))|i(?:m group, lp|rc(?:ana|le)|tizant|vis analytics)|l(?:ari(?:tas rx)?|e(?:arway energy|veland clinic)|i(?:ck(?:house|jobs\\.io|up)|nchoice|pboard health)|o(?:se|ud(?:flare|mr|trucks)|ver health))|o(?:alition, inc\\.|de(?:ium|rs data)|g(?:ent analytics|nizant(?: technology solutions)?)|he(?:re|sity)|inbase careers page|l(?:l(?:ectors|i(?:bra|ns aerospace))|or)|m(?:monwealth (?:care alliance|fusion systems)|p(?:ass(?: group usa)?|uter world services))|n(?:c(?:entrix catalyst|orde education)|duent|exess group|fluent|nor group|solidated analytics|t(?:act government services, llc|ent(?:ful|square)))|relogic|upa software, inc\\.)|r(?:isis text line|owdstrike|uise|yptorecruit )|s(?:a \u00e2\u0080\u0093 careers|c generation)|vs health|ybercoders)|d(?:a(?:t(?: freight \\& analytics|a(?: axle|annotation|bricks|iku(?: misc postings)?|kind|vant))|vita kidney care)|bt labs|e(?:el|loitte|mandbase|pt\u00c2\u00ae|vrev|xian inc)|i(?:ce|gital(?: (?:janet|turbine)|ocean)|rective consulting|sco(?:(?:rd|ver financial services))?|ver(?:gent|sified))|o(?:it|ran jones inc\\.|w jones)|r(?:iven brands inc\\.|uva)|tn|u(?:etto research|n \\& bradstreet)|xc technology)|e(?: (?:business international inc\\.|source)|\\-business international|2open|a(?:rnin|st 57th street partners|ton)|db|gen|l(?:astic|ements of land design, llc)|n(?:able|ergy(?: jobline|hub)|gtal|ova international|sono|tr(?:ata|epreneurial university for women|ust))|os |p(?:i(?:c (?:brokers|games)|roc)|silon)|quip(?: health|mentshare)|thos beathchapman|verstream analytics|x(?:act sciences|ecutive staff recruiters / esr healthcare|perity|treme networks))|f(?:\\&g|a(?:bric of truth, inc|ire|nduel|rmer's business network, inc\\.)|e(?:arless|verup)|i(?:g(?:ma|ure)|nd(?: next hire|ing candidate)|rst(?: citizens bank|hand)|s(?:her phillips)?|vetran )|l(?:ex(?:(?:port|ton inc\\.))?|oqast|uence)|o(?:odsmart|r(?:d motor company|tra|ward)|ur(?:kites|square ))|rontcareers|ti consulting|u(?:jifilm diosynth biotechnologies|llstack labs))|g(?:\\-p|2i inc\\.|a(?:c solutions|inor staffing|lileo financial technologies)|e(?: (?:aerospace|healthcare|vernova)|bbs healthcare solutions|i(?:co|singer)|n(?:eral (?:dynamics information technology|motors)|mab)|t(?: it recruit \\- (?:finance|healthcare|information technology|marketing|professional services|transportation)|\\.it recruit \\- administrative|around))|h[jx]|i(?:tlab|vedirectly)|l(?:assdoor|ean|ossier)|o(?:at group|ng\\.io|o(?:dleap|gle)|puff|wan company)|r(?:a(?:dbay|f(?:ana labs|isch productiebureau hermes)|nicus)|eymatter innovationz)|s1 consulting|u(?:idewire software|sto))|h(?:a(?:ckajob|rnham|shicorp)|ca healthcare|e(?:a(?:lthfirst|rtflow, inc)|rmeus)|i(?:ghwire public relations|ms \\& hers|remefast llc)|o(?:mebase|neywell|p(?:e services|per))|rl laboratories|u(?:dl|mana|ntington national bank|sch blackwell)|p)|i(?:autogo|c(?:e(?:rtis)?|f)|d\\.me|m(?:agen technologies|pact\\.com)|n(?: the vrai sud\\.com|clu(?:ded health|sively)|debted|fl(?:ow federal|uential)|ovalon|st(?:a(?:base|cart)|ructure)|t(?:e(?:crowd|gral ad science|r(?:com|ex group|mex wire transfer|national sos government medical services))|uit)|visible(?: technologies)?)|on group|p(?: recruiter group|pon technologies)|t concepts, inc)|j(?:ack in the box|erry|o(?:b(?:ot|s(?: via (?:dice|efinancialcareers)|inlogistics\\.com))|hnson \\& johnson)|pc partners, llc)|k(?:aynes|e(?:arney \\& company|tt engineering corporation|ybank)|han lab school|i(?:ddom|n insurance|pp socal public schools)|o(?:hler co\\.|ng)|p(?:ler|mg)|raken digital asset exchange|unai|yivstar)|l(?:a(?:mbda|stpass|titude inc|unch potato)|e(?:arn(?:2code\\.live|beyond consulting)|idos|ssen)|i(?:berty mutual insurance|feline ambulance ca|ghtship|lt|me|v(?:eperson|inghr))|o(?:ft orbital solutions|gic20/20, inc\\.|ne wolf technologies)|u(?:menalta \\(formerly clevertech\\)|x(?:oft|ury presence)))|m(?:a(?:intainx|n(?:tech|ychat)|pbox|r(?:athon ts|qeta)|shgin|t(?:ch group|erial bank\u00c2\u00ae|hematica|termost)|yo clinic)|e(?:be|diaocean|r(?:cer|idianlink|kle)|t(?:ric geo|a))|i(?:crosoft|llenniumsoft inc|nitab |sfits market|tek)|o(?:dern animal|lina healthcare|ngodb|o(?:dy's corporation|re)|ti(?:on recruitment|ve)|v(?:able ink|eworks)|zilla)|u(?:fg capital analytics|jin)|ygwork \\- lgbtq\\+ business community)|n(?:a(?: oiwi kane|bis|cro |t(?:era|ional general)|v(?:an|ex|i(?:site|tspartners)))|bcuniversal|e(?:o4j|t(?:flix|skope|workyourstock\\.com)|w relic|xt(?:deavor, inc\\.|roll))|fp, an aon company|i(?:antic|ce|elsen|mblerx|s(?:ource|um))|onprofit finance fund|tt (?:data(?:(?: (?:business solutions|north america)|, inc\\.))?|global data centers)|v(?:ent|idia))|o(?:ctopus energy group|ddball|fferup|lsson|m(?:ada health|nipresent)|n(?:be|e(?: medical|trust)|tra)|owlish technology|p(?:en(?:ai|gov|table)|helia|inion focus panel|ortun|tum)|r(?:acle|chard)|scar health|utset medical|vative group|wn company|xio)|p(?:a(?:cific life|gerduty|rallel domain|t(?:ientpoint|tern(?: data|ed learning career))|ve|y(?:cor|pal))|di technologies|e(?:loton|numbra|r(?:aton|cona|ficient)|t(?:co|partners pet insurance))|h(?:ilips|oenix recruitment )|i(?:c(?:knpay zone|sart)|nterest|per companies)|la(?:id|tinum technologies|ystation global)|nc|ointclickcare|r(?:e(?:cision (?:for medicine|medicine group)|lim|sbyterian healthcare services)|ice(?: waterhouse coopers|senz)|o(?:cept biorobotics|ductboard|found research|ofpoint|tective|v(?:ation|ectus|idence(?: health \\& services)?))|udential financial)|srtek|ublicis sapient|wc|ythian)|q(?:\\-centrix|u(?:a(?:ltrics|ntum (?:metric|world technologies inc\\.))|ench|ince|ora))|r(?:a(?:ckspace|ft company website|ncho biosciences|ytheon)|e(?:c(?:orded future|ruiter\\.com)|d(?: canary|balloon|dit(?:, inc\\.)?|panda data)|ebelo|lativity space|mote(?:worker (?:ca|u[ks]))?|plicant|search innovations|tool)|i(?:pplematch opportunities|t(?:epros|hum)|veron)|o(?:bert half|ck(?:e(?:rbox|t (?:lab usa|money))|star games))|t(?:b house|eams|x)|yder system(?:, inc\\.)?)|s(?:3wm :: web media \\+ design|a(?:ilpoint|m(?:ba tv|s(?:ara|ung semiconductor))|n(?: diego state university|ford health|ofi)|viynt)|c(?:ale ai|hneider electric|ience 37|orpion enterprises, llc)|e(?:atgeek|n(?:dbird|sor tower|t(?:ara health|inelone|ry))|rvicenow|zzle)|h(?:arecare|i(?:eld ai|ft4)|o(?:ckwave medical|p(?:ify|monkey))|utter(?:fly|stock))|i(?:mtra biopharma solutions|nglestore)|k(?:illerszone|ydance)|m(?:ar(?:sh|tsheet)|ithrx)|n(?:aptryai|o(?:rkel ai|wflake))|o(?:f(?:trams|i)|n(?:atus|dermind careers|icwall)|phos)|p(?:aulding ridge|lunk|ot(?:ify|on: product)|r(?:ing health|y methods))|quarespace|si people|t(?:a(?:ckadapt|ge 4 solutions)|o(?:ckx|r(?:able |m2))|r(?:ength\\-motion; inc|ipe|yker))|u(?:d recruiting|m(?:itomo (?:mitsui banking corporation|pharma america, inc\\.)|mituponline|o logic)|n(?: life|nova energy international, inc\\.)|per\\.com|rveymonkey)|w(?:ish analytics|o(?:oped|rd health))|y(?:n(?:chrony|ergisticit)|sdig))|t(?:a(?:a solutions|l(?:ent(?: (?:groups|software services)|disruptors|ify\\.io)|kdesk|a))|e(?:am(?: remotely(?: inc)?|health)|ch(?: one it|s(?:pectrum solutions inc|ur solutions))|ksystems|lus international|nable(?:, inc\\.)?|sla)|he(?: (?:cigna group|job network|new york times|standard|voleon group)|r(?:abody|mo fisher scientific))|iger analytics|o(?:ast|mbras)|r(?:a(?:ce3|n(?:e technologies|sperfect))|ipadvisor|m labs|u(?:ecar, inc\\.|stly))|smg|u(?:bi|rner \\& townsend)|wi(?:lio|n health|tch))|u(?:\\.s\\. (?:bank national association|department of the treasury)|ber|n(?:itedhealthcare|limit|real staffing, inc)|p(?:grade|work)|rim glass|s(?:aa|t))|v(?:a(?:lidate health|n(?:derbilt university medical center|guard intellectual partners, llc|na health|tage data centers)|r(?:o bank|sity tutors(?:, a nerdy company)?))|e(?:e(?:am software|va systems)|losio|r(?:adigm\u00c2\u00ae|iipro|kada))|gw|i(?:ant|d(?:a health|eoamp)|sa))|w(?:3global|a(?:chter, inc\\.|rner music inc\\.|vicle data solutions)|e(?:b(?:flow|staurantstore)|edmaps|ights \\& biases|l(?:ls(?: fargo|pring healthcare)|ocalize)|stern digital podium panache|x)|hy hiring|iz, inc\\.|o(?:nolo|odruff sawyer|r(?:k(?: from home adviser|cog inc|day)|ld(?: wide technology|pay)))|tw|ww\\.fotografverket\\.se)|x(?:ero|ometry|solla)|y(?:\\&l consulting, inc\\.|ale university|ipitdata \\(alternative\\))|z(?:e(?:n(?:desk|oti)|ta)|i(?:llion technologies, inc\\.|p(?: co limited|recruiter))|o(?:ll data systems|nnig inzicht|o(?:minfo|x)|rtech solutions)|scaler|uora|\u00c5\u00abm services))$"][0], 'i');

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
