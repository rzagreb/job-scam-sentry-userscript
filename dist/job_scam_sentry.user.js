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

    const fakeJobCompanyNames = new RegExp(["^(?: rainbow restoration|\\#twiceasnice recruiting|1(?:0x genomics|74 power global|password)|2(?:1st century home health services inc\\.|4 hour fitness usa, llc|k)|3pillar|a(?: (?:hiring company|place for mom)|\\+e networks|\\-alpha bio|b(?:arca health|b(?:(?:vie|yy))?|ridge|s group)|c(?:c(?:e(?:ler(?:8 talent|ation partners)|nture(?: federal services)?)|rue select inc)|led \\(armed conflict location \\& event data\\)|t(?:alent|ivecampaign)|uitymd)|d(?:i(?: global distribution|entone)|obe|v(?:enthealth|ocate health))|f(?:firm|terpay)|g(?: consulting partners, inc\\.|ero|greko|il(?:e(?: defense|engine)|on health)|oda|tonomy)|head|i(?:r(?: products|bnb|call)|s \\(applied information sciences\\))|kumin\u00c2\u00ae|l(?:coa|edade, inc\\.|golia|imentiv|l(?:i(?:an(?:ce animal health|t insurance services)|ed onesource)|sta(?:ff staffing \\& recruiting|te)|vue systems)|phasense|t(?:(?:era digital health inc\\. united states|ium|o pharmacy))?)|m(?:azon(?:\\.com services llc(?: \\- a57)?)?|cor|eri(?:can medical association|prise financial)|plitude |trust financial services, inc\\.)|n(?:avation|chorage digital|duril industries|g(?:ela spiegel|i)|sys|telope|yscale)|p(?:ex(?: (?:companies, llc|systems)|on)|ixio|o(?:gee therapeutics|llo\\.io)|p(?:en|folio|lied materials)|rime technology)|r(?:c(?:adi[as]|h capital services llc|us biosciences)|go group|kose labs|mis(?: security)?|r(?:ive logistics|ow electronics))|s(?:c(?:en(?:d(?: analytics|i(?:ng inc\\.|on))|sion)|yndent)|r(?:c federal|t, inc\\.)|ton carter)|t(?:\\-bay|accama|la(?:ssian|n)|omic machines|tentive)|u(?:ditboard|gment jobs|rora adventures agency|stin (?:artificial intelligence, inc\\.|international)|todesk)|v(?:a(?:ility|ya)|etta)|x(?:elon services corporation|on(?:ius)?)|zure summit technology)|b(?:a(?:nner bank|rbaricum|ylor scott \\& white health|zaarvoice)|e(?:c(?:kman coulter diagnostics|u)|l(?:ong|k)|nchling|rk(?:eley research group, llc|shire hathaway homestate companies)|st sanitizers|t(?:a technologies|ter homes and gardens real estate)|yondtrust)|i(?:g(?:commerce|id)|ll|nance|zcoder ai)|l(?:a(?:ckb(?:aud|ird health)|nc labs)|end|ink health|ock|u(?:e(?: (?:s(?:entry cloud|ignal search)|water thinking|yonder)|bix solutions|cross blueshield of tennessee|flag llp|lightai|print)|peak credit union))|mo u\\.s\\.|o(?:b's discount furniture|oz allen hamilton|ston consulting group|ttomline|unteous|whead)|pm(?: llp|\\-pr firm)|r(?:ain(?: fog|trust)|ex|i(?:g(?:ht(?: digital solutions|house financial|wheel)|it)|llio)|o(?:oks(?: automation|ource)|wn \\& brown insurance))|sl consulting|u(?:ilders firstsource|yers edge platform, llc)|ytecode io)|c(?:\\-4 analytics, llc|a(?:lm|m(?:bi(?:a health solutions|um assessment)|pbell's)|nonical|p(?:ital (?:analytics|one)|ti(?:ons|vation software))|r(?:dinal health|emessage|is life sciences|ta)|s(?:h app|t \\& crew)|ylent)|e(?:lonis|n(?:cora|t(?:e(?:ne corporation|rfield)|ral garden \\& pet))|pheid|rtif(?:id|y))|h(?:ain(?:alysis(?:\\-careers)?|guard|link labs)|erre|ildren's hospital los angeles \\(chla\\)|owbus)|i(?:dis llc|m group, lp|rcle|sco|tizant|vis analytics)|l(?:ari(?:vate)?|e(?:ar(?: engineering recruitment|way energy)|veland clinic)|i(?:ck(?:house|jobs\\.io|up)|fyx|n(?:choice|dcast)|pboard health)|o(?:se|ud(?:era|flare|mr)))|na insurance|o(?:alition, inc\\.|d(?:ers data|up)|g(?:ent analytics|nizant technology solutions)|he(?:re|sity)|inbase careers page|l(?:l(?:aborative solutions, llc|e(?:ctors|ge possible)|ibra)|umbia threadneedle investments)|m(?:m(?:ercial seating products, inc\\.|onwealth (?:care alliance|fusion systems)|unity health (?:group|systems))|p(?:ass(?: (?:group usa|travel co))?|liance group inc|uter world services))|n(?:c(?:orde education|urrency)|duent|fluent|nor group|s(?:olidated analytics|tellation)|t(?:act government services, llc|ent(?:ful|square)))|peland|relogic|upa software, inc\\.|ver genius|x communications)|r(?:o(?:ss platform developer|w(?:dstrike|e llp))|uise|yptorecruit )|s(?:a \u00e2\u0080\u0093 careers|c generation|i)|uesta partners|ybercube)|d(?:\\.a\\. davidson companies|a(?:t(?: freight \\& analytics|a(?: axle|annotation|bricks|iku(?: misc postings)?|kind|vant))|ugherty business solutions|vita kidney care)|e(?:el|l(?:l technologies|oitte|ta defense llc)|mandbase|ntsu|pt\u00c2\u00ae|s(?:cript|tiny \\(d/xyz\\))|xian inc)|i(?:ce|gital(?: (?:infuzion|janet|science|turbine)|ocean)|rective consulting|s(?:co(?:(?:rd|ver financial services))?|patch)|ver(?:gent|sified))|o(?:it|lls kill|ola|ran jones inc\\.|w jones|ximity)|r(?:s it solutions inc|uva)|s technologies inc|tn|u(?:etto research|mpa consulting llc|n \\& bradstreet)|wellfi )|e(?: (?:business international inc\\.|source)|\\-business international|\\.l\\.f\\. beauty|a(?:r(?:lybird tutors|nin)|st 57th street partners|ton)|c(?:calon, llc|i software solutions|linical solutions)|d(?:wards lifesciences|b)|ightfold|l(?:astic|ements of land design, llc)|n(?:able(?:comp)?|ergy(?: jobline|hub)|gtal|litic|ova international|sono|t(?:egra|rust)|v(?:eritas|oy))|o(?:s |n)|p(?:am systems|i(?:c(?: (?:brokers|games))?|roc)|silon)|quip(?: health|mentshare)|sri|thos beathchapman|ver(?:green nephrology|law|north health services|stream analytics)|x(?:act sciences|ecutive staff recruiters / esr healthcare|perity|treme networks))|f(?:a(?:az surgical|cebook app|ire|lcon smart it \\(falconsmartit\\)|nduel|rmer's business network, inc\\.|thom)|e(?:de(?:ral (?:express corporation|reserve bank of dallas)|x dataworks)|tcherr|verup)|i(?:co|g(?:ma|ure)|nd(?: next hire|ing candidate)|rst(?: (?:american|citizens bank)|hand)|s(?:(?:calnote|her phillips))?|vetran )|l(?:ex(?:(?:board|port|ton inc\\.))?|uence)|o(?:cus strategies\\.|odsmart|r(?:motiv\u00e2\u0080\u008b|tra|ward(?: progress staffing)?)|u(?:ndation medicine|r(?:kites|square ?)))|r(?:azer, ltd|eewheel|p construction, llc)|ti consulting|u(?:llstack labs|ture mind))|g(?:2i inc\\.|a(?:in(?:or staffing|well technologies)|lileo financial technologies)|e(?: (?:aerospace|healthcare|vernova)|\\-v|bbs healthcare solutions|i(?: consultants, inc\\.|singer)|n(?:e(?:ral (?:dynamics information technology|motors)|sco)|mab)|o(?:rgia\\-pacific llc|syntec consultants)|t(?: it recruit \\- (?:finance|h(?:ealthcare|ospitality)|information technology|marketing|professional services|transportation)|\\.it recruit \\- administrative))|h[jx]|i(?:tlab|vedirectly)|l(?:assdoor|ean|oba(?:l(?: (?:channel management, inc\\. |healthcare it)|pros\\.ai)|nt))|o(?:at group|guardian|ng\\.io|o(?:dleap|gle(?: operations center)?)|puff)|r(?:a(?:dbay|f(?:ana labs|isch productiebureau hermes)|nicus)|e(?:en(?: dot corporation|light financial technology)|ymatter innovationz)|i(?:fols|n))|s1 consulting|usto)|h(?:a(?:ckajob|modia|nno d\u00c3\u00bcttmann holz\\- und trockenbau|rnham|shicorp)|ca healthcare|e(?:a(?:dway|lthfirst|rtflow, inc)|bbia|itmeyer consulting|nry hire solutions|rr alexander wunsch|xagon (?:asset lifecycle intelligence|us federal))|i(?:ghwire(?: public relations)?|ms \\& hers|re(?: python developer|mefast llc))|o(?:mebase|pper|staway)|u(?:ckleberry labs|dl|man(?: interest|a)|nt(?:er douglas|ington national bank)|sch blackwell)|p)|i(?:4pro|c(?:on strategic solutions|[ef])|d\\.me|m(?:agen technologies|mobilien gabriele metzler|pact(?: advisors|\\.com))|n(?:clusively|dico data|f(?:l(?:ow federal|uential)|use)|izio partners|kitt|s(?:tabase|ulet corporation)|t(?:e(?:crowd|gra(?:l ad science|ted resources, inc \\( iri \\))|r(?:com|mex wire transfer|national sos government medical services))|uit)|vi(?:sible(?: technologies)?|tation homes))|on group|p(?: recruiter group|pon technologies)|qvia|t labs)|j(?:ac(?:k in the box|obs)|e(?:llyfish|r(?:ry|seystem)|trock)|o(?:b(?:ot|s(?: via (?:dice|efinancialcareers)|inlogistics\\.com))|hnson (?:\\& johnson|controls)|inrs us)|p(?:c partners, llc|morganchase)|tek software solutions|upiter power)|k(?:a(?:pital|ynes)|b(?:i biopharma|ra)|e(?:it industrial analytics|mper|tt engineering corporation|ybank)|force inc|han lab school|i(?:ddom|n(?: insurance|der(?:garten karnaper regenbogen|tagesst\u00c3\u00a4tte flohkiste))|va confections)|nown|o(?:bie marketing|hler co\\.|m(?:mlink gmbh|odo health)|ng|revariance)|p(?:ler|mg)|rishansh|ti talent indicator|unai|wa analytics|yivstar)|l(?:a(?:mbda|ntana consulting group|stpass|titude inc|unch potato|vendo|wn escapes)|e(?:arn(?:2code\\.live|beyond consulting)|idos|ssen|vi, ray \\& shoup, inc\\. \\(lrs\\))|i(?:berty mutual insurance|fe(?: enterprises, inc\\.|line ambulance ca|touch)|ght(?:bird|ship)|me|v(?:eperson|inghr(?:, inc\\.)?))|o(?:ckheed martin|ft orbital solutions|gi(?:c20/20, inc\\.|nsoft)|ne wolf technologies|okout inc|vesac)|umenalta \\(formerly clevertech\\)|vi associates)|m(?:\\&t bank|a(?:crohealth|intainx|n(?:tech|ychat)|r(?:athon ts|cus thomas llc|lee \\(fingerprint for success\\)|qeta|rina decisions |sh mclennan agency)|t(?:erial bank\u00c2\u00ae|hematica|termost)|ximus|yo clinic)|cafee|ds \\(micro\\-data systems\\)|e(?:d(?:\\-metrix|ia(?:\\.monks(?: paris)?|ocean)|watch, llc)|ndix|r(?:c(?:er|y)|idianlink|kle)|t(?:a(?: soft inc)?|r(?:ic geo|onome)))|i(?:cron|llenniumsoft inc|nitab |sfits market|tek(?: inc\\.)?)|o(?:dern animal|l(?:ina healthcare|lica it)|n(?:godb|trose environmental group)|o(?:dy's corporation|re)|ti(?:on recruitment|ve)|v(?:able ink|eworks)|yyn|zilla)|u(?:fg capital analytics|ltiplan|sc health)|ygwork \\- lgbtq\\+ business community)|n(?:a(?: oiwi kane|bis|cro |phcare, inc\\.|t(?:era|ional (?:black worker center|general))|v(?:a(?: software solutions|n)|ex|i(?:ent|tspartners)))|bcuniversal|e(?:braska furniture mart|eeon|o(?:4j|genomics laboratories)|t(?:flix|skope|workyourstock\\.com)|urocrine biosciences|w(?: (?:relic|western|york global consultants inc\\.)|york\\-presbyterian hospital)|xt(?: (?:pathway|ventures)|d(?:eavor, inc\\.|oor)|roll))|fp, an aon company|i(?:antic|ce|elsen|mblerx|s(?:ource|c))|o(?:gigiddy|r(?:c at the university of chicago|thwest talent solutions llc)|tion)|tt data(?:(?: (?:business solutions|north america)|, inc\\.))?|v(?:ent|idia))|o(?:'reilly|ctopus energy group|ddball|fferup|il and gas job search ltd|lsson|m(?:ada health|nipresent)|n(?:be|co|e(?:digital|s(?:ix |ource virtual)|trust)|trac)|owlish technology|p(?:en(?:ai|gov|table)|inion focus panel(?:\u00c2\u00a0llc)?|ortun|spros|t(?:omi|um))|r(?:acle|chard|ionig)|shkosh corporation|utlier|wn company|xio)|p(?:a(?:c(?:aso |ific (?:life|scientific energetic materials company))|gerduty|ntar solutions inc|r(?:allel (?:domain|partners)|ks and wildlife department)|ssport|t(?:ientpoint|ter(?:n(?: (?:data|energy group)|ed learning career)|son dental))|y(?:cor|locity|nearme|pal))|e(?:arson|numbra|oplevisor llc|r(?:aton|cona|doceo education corporation|ficient)|tpartners pet insurance)|fizer|gim|h(?:data|ilips|oenix (?:recruitment |s(?:ervices|taff, inc\\.)))|i(?:c(?:knpay zone|sart)|n(?:gwind|terest)|per companies)|l(?:a(?:id|nte moran|ystation global)|owshare group)|nc|o(?:dium|int32health|lar analytics)|r(?:e(?:cision (?:for medicine|medicine group)|mier media)|i(?:ce(?: waterhouse coopers|senz)|me|vate consultancy)|o(?:assurance|ductboard|found research|gressive leasing|ject management institute|ntodigital, llc|ofpoint|pivotal staffing cc|tective|v(?:ation|ectus|idence(?: health \\& services)?))|udential financial)|srtek|u(?:blicis sapient|lsepoint)|vm|wc|ythian)|q(?:\\-centrix|u(?:a(?:d, a solomonedwards company|ltrics|ntum(?: world technologies inc\\.|\\-si)|rtz bio)|ench|ince(?: restaurant)?|ora))|r(?:1 rcm|2 technologies, inc\\.|a(?:ckspace(?: technology)?|di(?:ology partners|us group)|ft company website|lf u\\. nicole thumm|mp|ncho biosciences|ytheon)|e(?:arc|c(?:orded future|ruit(?:er\\.com|ing from scratch))|d(?: hat|balloon|dit(?:, inc\\.)?|panda data)|ebelo|lativity space|mot(?:eworker (?:ca|u[ks])|ivate)|quest technology|smed|tool|vsup)|ho|i(?:ngcentral|pplematch opportunities|sk strategies company|t(?:epros|hum)|via(?:l data security|n))|o(?:b(?:ert half|inhood)|ck(?:e(?:rbox|t (?:lab usa|money))|star games|well automation))|r donnelley|t(?:b house|eams)|xante|yder system(?:, inc\\.)?)|s(?:4, llc|a(?:bel systems technology solutions, llc|g(?:e society|inaw control and engineering,wi)|ilpoint|l(?:esforce|k institute for biological studies)|m(?:ba tv|s(?:ara|ung semiconductor))|n(?: diego state university|ford health|mina|ofi)|viynt)|c(?:ale ai|hneider electric|ience 37|o(?:rpion enterprises, llc|ut(?: michael agency|mine)))|e(?:atgeek|cur(?:e code warrior|ityscorecard)|lby jennings|n(?:dbird|sor tower|t(?:ara health|inelone|ry))|rvicenow)|h(?:arecare|erlock|i(?:eld ai|ft4|ne)|o(?:ckwave medical|pmonkey)|utter(?:fly|stock))|i(?:erra club|gnature performance, inc|licon valley bank|mtra biopharma solutions|nglestore|tel group)|k(?:echers usa, inc\\.|illerszone|yd(?:ance|io))|m(?:ar(?:sh|tsheet)|ith(?:\\+nephew|rx))|n(?:aptryai|o(?:rkel ai|wflake))|o(?:dexo|f(?:t(?: source, inc|echinfo|rams|ware (?:development ai|guidance \\& assistance, inc\\. \\(sga, inc\\.\\)))|i)|n(?:atus|i(?:cwall)?|y interactive entertainment)|phos|urcedirect consulting ltd)|p(?:a(?:lding consulting, inc\\., a saalex company|r information systems llc|ulding ridge)|earsoft |lunk|ot(?:ify|on: product)|ry methods)|quarespace|s(?:\\&c technologies|i people)|t(?:a(?:ck(?:adapt|logy)|ndvast fulfillment|ples stores|r(?:bucks|shr, inc\\.))|o(?:ckx|r(?:able |m2))|r(?:atascorp technologies|e(?:am data centers|ngth\\-motion; inc)|i(?:de, inc\\.|pe)|yker))|u(?:m(?:itomo mitsui banking corporation|mituponline|o logic)|n(?: life|nova energy international, inc\\.)|per\\.com|voda)|w(?:ish analytics|ooped|yfft)|y(?:n(?:chrony|dica|erg(?:isticit|y interactive))|s(?:dig|tems planning \\& analysis)))|t(?:a(?:ilored access, llc|l(?:ent(?: groups|ify\\.io)|kdesk))|d thornton|e(?:am(?: remotely(?: inc)?|health|ware solutions \\(quantum leap consulting\\)\\.)|c(?:h(?: one it|sur solutions|wave)|ton)|ksystems|nable|oresi group|xtnow)|h(?:e(?: (?:c(?:aring connection, inc\\.|igna group)|job network|k(?:aarigar shop|razy coupon lady)|new york times|phoenix group|standard|tie)|key|mis insight|rmo fisher scientific)|omson reuters|r(?:asio|eev technologies, inc\\.))|i(?:cketmaster|ger analytics)|o(?:ast|mbras)|r(?:a(?:nsperfect|vis hyde properties)|ee top staffing llc|i(?:mble inc\\.|padvisor)|m labs|uecar, inc\\.)|smg(?: holding)?|u(?:bi|rner \\& townsend)|wi(?:lio|tch))|u(?:\\.s\\. (?:bank national association|department of the treasury)|ber|n(?:der(?: armour|dog\\.io)|i(?:ted(?: (?:states olympic \\& paralympic committee|window \\& door)|healthcare)|versity of (?:california, riverside|maryland medical system))|real staffing, inc)|p(?:grade|mc|work)|rim glass|s(?: acute care solutions|a(?: remote job data entry|a)|t))|v(?:a(?:co|l(?:entine recruiting|idate health)|n(?:derbilt university medical center|guard(?: intellectual partners, llc)?|na health|tage data centers)|r(?:o bank|sity tutors(?:, a nerdy company)?))|e(?:e(?:am software|va systems)|locity tech inc|n(?:mo|teon)|r(?:adigm\u00c2\u00ae|gesense|i(?:ipro|ly)|kada)|tsez)|gw|i(?:d\u00c4\u0093re labs|meo|rtustant|sa|tuity|zit)|o(?:ltron data|n consulting|ya investment management)|xforward)|w(?:a(?:chter, inc\\.|hve llc|rner music inc\\.|vicle data solutions)|e(?:bstaurantstore|edmaps|l(?:ls(?: fargo|pring healthcare)|ocalize)|st(?:cliff university|ern digital podium panache))|h(?:itecrow research|y hiring)|iz(?:, inc\\.|ard ai)|o(?:n(?:derful citrus|olo)|odruff sawyer|rk(?: (?:at home vintage experts|from home adviser)|athome\\-jobboard|day|wave))|p engine|tw)|x(?:ero|ometry|solla)|yipitdata|z(?:ar it solutions|e(?:n(?:ith services|oti)|ta)|i(?:llion technologies, inc\\.|mmer biomet|ons bancorporation|p(?: co limited|recruiter))|o(?:ll data systems|ox|rtech solutions)|scaler|uora|\u00c5\u00abm services)|\u00c5\u008dura)$"][0], 'i');

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
