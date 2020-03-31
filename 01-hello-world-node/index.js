const { lisan, t } = require("lisan");

const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout
});

const languages = { 1: "tr", 2: "en" };

readline.question("1 - Türkçe, 2 - English: ", no => {
  const lang = languages[no] || "tr";
  const mainDict = require(`./.lisan_out/dictionaries/${lang}/main.js`);

  lisan.add(mainDict);

  console.log(t("hello.world"));
  console.log(t("node.version", { version: process.version }));
  console.log(t("done.message"));

  readline.close();
});
