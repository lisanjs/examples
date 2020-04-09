const { lisan, t } = require("lisan");
const { getUserInput } = require("./getUserInput");

const languages = { 1: "tr", 2: "en" };

const latestVersion = 12;
const userVersion = process.version;
isNodeLatest = userVersion.indexOf(`v${latestVersion}`) === 0 ? 1 : 0;

getUserInput("1 - Türkçe, 2 - English: ", (no) => {
  // 1. Detect Language
  const lang = languages[no] || "tr";

  // 2. Load dictionary
  const mainDict = require(`./.lisan_out/dictionaries/${lang}/main.js`);

  // 3. Add dictionary
  lisan.add(mainDict);

  // 4. All keys ready to use
  console.log(t("hello.world"));
  console.log(
    t("node.version", {
      version: userVersion,
      latestVersion,
      isNodeLatest,
    })
  );
  console.log(t("done.message"));
});
