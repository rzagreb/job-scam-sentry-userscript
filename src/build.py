import csv
import json
import re

FNAME_COMPANIES = "src/companies.csv"
FNAME_USERSCRIPT_TEMPLATE = "src/template.user.js"
FNAME_USERSCRIPT_COMPILED = "dist/job_scam_sentry.user.js"
LIMIT_COMPANIES = 2_000


class Trie:
    # From https://stackoverflow.com/a/42789508

    def __init__(self):
        self.data = {}

    def add(self, word):
        ref = self.data
        for char in word:
            ref[char] = char in ref and ref[char] or {}
            ref = ref[char]
        ref[""] = 1

    def add_multiple(self, words) -> "Trie":
        for word in words:
            self.add(word)
        return self

    def dump(self):
        return self.data

    def quote(self, char):
        return re.escape(char).replace(r"\ ", " ")

    def _pattern(self, pData):
        data = pData
        if "" in data and len(data.keys()) == 1:
            return None

        alt = []
        cc = []
        q = 0
        for char in sorted(data.keys()):
            if isinstance(data[char], dict):
                try:
                    recurse = self._pattern(data[char])
                    alt.append(self.quote(char) + recurse)
                except Exception:
                    cc.append(self.quote(char))
            else:
                q = 1
        cconly = not len(alt) > 0

        if len(cc) > 0:
            if len(cc) == 1:
                alt.append(cc[0])
            else:
                alt.append("[" + "".join(cc) + "]")

        if len(alt) == 1:
            result = alt[0]
        else:
            result = "(?:" + "|".join(alt) + ")"

        if q:
            if cconly:
                result += "?"
            else:
                result = "(?:%s)?" % result
        return result

    def pattern(self):
        return self._pattern(self.dump())


def main():
    # Select companies
    with open(FNAME_COMPANIES, "r") as f:
        reader = csv.DictReader(f)
        company_names = [
            c["company"].encode("utf-8").decode("unicode-escape") for c in list(reader)
        ][:LIMIT_COMPANIES]
    if not company_names:
        raise ValueError("No companies found in CSV")

    # Create regex pattern from company names
    trie = Trie().add_multiple(set(company_names))
    company_regex = r"^" + trie.pattern() + r"$"
    try:
        re.compile(company_regex)
    except re.error:
        raise ValueError("Invalid regex pattern")
    company_regex_json = json.dumps([company_regex])

    # Create UserScript from template
    with open(FNAME_USERSCRIPT_TEMPLATE, "r") as f:
        template = f.read()
        script = template.replace("{{{COMPANIES_REGEX_JSON}}}", company_regex_json)

    # Save
    with open(FNAME_USERSCRIPT_COMPILED, "w") as f:
        f.write(script)


if __name__ == "__main__":
    main()
