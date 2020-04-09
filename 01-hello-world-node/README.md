# Hello World (Node.js)

## Goal

Purpose of this example to demonstrate a minimal setup
to use [LisanJS](https://lisanjs.com).

## Instructions

### 1. Init project

```bash
mkdir 01-hello-world-node
cd ./01-hello-world-node
npm init -y

npm install lisan
npm install lisan-cli --save-dev

touch .gitignore
touch .lisanrc
touch getUserInput.js
touch index.js
```

Add scripts to `package.json`:

```jsonc
{
  // ...
  "scripts": {
    "start": "lisan compile && node index.js",
    "lisan:compile": "lisan compile"
  }
}
```

Add dictionaries to `.gitignore` (Optional)

```text
node_modules/
.lisan_out/
```

### 2. Set Lisan config

Update the `.lisanrc` config as below:

```json
{
  "compile": {
    "inputDir": "translations",
    "outputDir": ".lisan_out/dictionaries"
  }
}
```

### 3. Prepare getUserInput function

`getUserInput` function will prompt user with
given question and takes users input.

`./getUserInput.js` file:

```js
const getUserInput = (message, cb) => {
  const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  readline.question(message, (data) => {
    cb(data);

    readline.close();
  });
};

module.exports = { getUserInput };
```

### 4. Create Translation files

```bash
mkdir -p translations/en/ && touch translations/en/main.json
```

```json
{
  "locale": "en",
  "entries": {
    "hello.name": "Hello ${username}",
    "node.version": "Your node.js version is ${version}!",
    "bye.message": "Bye.."
  }
}
```

```bash
mkdir -p translations/tr/ && touch translations/tr/main.json
```

```json
{
  "locale": "tr",
  "entries": {
    "hello.name": "Merhaba ${username}",
    "node.version": "Sizin node.js sürümünüz: ${version}!",
    "bye.message": "Hoşçakalın..."
  }
}
```

### 5. Write the application

The app shows user's node version.

The application first prompts user with language selection.
Then prints all texts based on the selected language.

`./index.js` file:

Import dependencies

```js
const { lisan, t } = require("lisan");
const { getUserInput } = require("./getUserInput");
```

Define necessary variables

```js
const username = require("os").userInfo().username;
const userVersion = process.version;
```

Detect language:

```js
const languages = { 1: "tr", 2: "en" };

getUserInput("1 - Türkçe, 2 - English: ", (no) => {
  // 1. Detect Language
  const lang = languages[no] || "tr";
});
```

Register Dictionary:

```js
// 2. Load dictionary
const mainDict = require(`./.lisan_out/dictionaries/${lang}/main.js`);

// 3. Add dictionary
lisan.add(mainDict);
```

Print messages

```js
console.log(t("hello.name", { username }));
console.log(t("node.version", { version: userVersion }));
console.log(t("bye.message"));
```

### Result

```js
const { lisan, t } = require("lisan");
const { getUserInput } = require("./getUserInput");

const username = require("os").userInfo().username;
const userVersion = process.version;

const languages = { 1: "tr", 2: "en" };

getUserInput("1 - Türkçe, 2 - English: ", (no) => {
  // 1. Detect Language
  const lang = languages[no] || "tr";

  // 2. Load dictionary
  const mainDict = require(`./.lisan_out/dictionaries/${lang}/main.js`);

  // 3. Add dictionary
  lisan.add(mainDict);

  // 4. All keys ready to use
  console.log(t("hello.name", { username }));
  console.log(t("node.version", { version: userVersion }));
  console.log(t("bye.message"));
});
```

### Output

```bash
npm start

> lisan compile && node index.js

1 - Türkçe, 2 - English: 2
Hello john
Your node.js version is v12.14.0!
Bye..
```

## Let's make things more fun!

Here you'll find a bit more advanced example,
utilizing [Conditional Groups](https://lisanjs.com/docs/conditional-groups).

Let's tell user if they are using the latest version of node,
by modifying our translation file as below:

1. `./translations/en/main.json` file:

```jsonc
{
  "locale": "en",
  "entries": {
    "hello.name": "Hello ${username}",
    // Notice we added `c` function
    "node.version": "Your node.js version is ${version}! ${c('is.node.latest', isNodeLatest, {latestVersion})}",

    // We added this conditional group
    "is.node.latest": {
      "zero": "Seems like your node.js version is outdated! Latest version is: ${latestVersion}.",
      "one": "Congratulations, you are using the latest node.js version."
    },
    "bye.message": "Bye.."
  }
}
```

2. `./index.js`

```js
const { lisan, t } = require("lisan");
const { getUserInput } = require("./getUserInput");

const username = require("os").userInfo().username;
const userVersion = process.version;

// We added these two variables
const latestVersion = 12;
const isNodeLatest = userVersion.indexOf(`v${latestVersion}`) === 0 ? 1 : 0;

const languages = { 1: "tr", 2: "en" };

getUserInput("1 - Türkçe, 2 - English: ", (no) => {
  // 1. Detect Language
  const lang = languages[no] || "tr";

  // 2. Load dictionary
  const mainDict = require(`./.lisan_out/dictionaries/${lang}/main.js`);

  // 3. Add dictionary
  lisan.add(mainDict);

  // 4. All keys ready to use
  console.log(t("hello.name", { username }));
  console.log(
    // We are providing `isNodeLatest`, `latestVersion` to the entry
    t("node.version", { version: userVersion, isNodeLatest, latestVersion })
  );
  console.log(t("bye.message"));
});
```

### Output

```bash
npm start

> lisan compile && node index.js

1 - Türkçe, 2 - English: 2
Hello john
Your node.js version is v12.14.0! Congratulations, you are using the latest node.js version.
Bye..
```
