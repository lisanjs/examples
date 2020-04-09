# Hello World (Node.js)

## Goal

Purpose of this example to demonstrate a minimal setup
to use [LisanJS](https://lisanjs.com) in **browser**.

## Instructions

### 1. Init project

```bash
mkdir 02-hello-world-browser
cd ./02-hello-world-browser
npm init -y

npm install lisan lisan-plugin-loader
npm install lisan-cli http-server --save-dev

touch .gitignore
touch .lisanrc
touch index.html
```

Add scripts to `package.json`:

```jsonc
{
  // ...
  "scripts": {
    "start": "lisan compile && http-server .",
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

### 3. Create Translation files

```bash
mkdir -p translations/en/ && touch translations/en/main.json
```

```json
{
  "locale": "en",
  "entries": {
    "hello.world": "Hello World",
    "hello.name": "Hello ${name}!"
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
    "hello.world": "Merhaba Dünya",
    "hello.name": "Merhaba ${name}!"
  }
}
```

### 3. Initialize HTML

`./index.js` file:

1. Add initial HTML code

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>LisanJS Example</title>
  </head>
  <body></body>
</html>
```

2. Add language dropdown box inside body

```html
<select id="languages">
  <option value="en">en</option>
  <option value="tr">tr</option>
</select>
```

3. Add content `div` elements

```html
<div id="content1"></div>
<div id="content2"></div>
```

4. Add dependencies

```html
<script src="./node_modules/lisan/dist/index.umd.js"></script>
<script src="./node_modules/lisan-plugin-loader/dist/index.umd.js"></script>
```

### Write the script

1. Setup LisanJS & Lisan Loader plugin

```html
<script type="text/javascript">
  (async function () {
    "use strict";
    const { lisan } = window.lisanJS;
    const { Loader } = window.lisanPluginLoader;

    lisan.use(
      Loader({
        dictionaryUrlFn: (dictName, localeName) => {
          return `.lisan_out/dictionaries/${localeName}/${dictName}.js`;
        },
      })
    );
  })().then(() => console.log("ready"));
</script>
```

2. Implement the logic

```js
const content1 = document.getElementById("content1");
const content2 = document.getElementById("content2");
const languages = document.getElementById("languages");

const render = async () => {
  lisan.localeName(languages.value);

  await lisan.load("main");

  content1.innerHTML = lisan.t("hello.world");
  content2.innerHTML = lisan.t("hello.name", { name: "John" });
};

languages.addEventListener("change", async () => {
  await render();
});

languages.value = "tr";
await render();
```

### Result

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>LisanJS Example</title>
  </head>
  <body>
    <select id="languages">
      <option value="en">en</option>
      <option value="tr">tr</option>
    </select>
    <div id="content1"></div>
    <div id="content2"></div>
    <script src="./node_modules/lisan/dist/index.umd.js"></script>
    <script src="./node_modules/lisan-plugin-loader/dist/index.umd.js"></script>
    <script type="text/javascript">
      (async function () {
        "use strict";
        const { lisan } = window.lisanJS;
        const { Loader } = window.lisanPluginLoader;

        lisan.use(
          Loader({
            dictionaryUrlFn: (dictName, localeName) => {
              return `.lisan_out/dictionaries/${localeName}/${dictName}.js`;
            },
          })
        );

        const content1 = document.getElementById("content1");
        const content2 = document.getElementById("content2");
        const languages = document.getElementById("languages");

        const render = async () => {
          lisan.localeName(languages.value);

          await lisan.load("main");

          content1.innerHTML = lisan.t("hello.world");
          content2.innerHTML = lisan.t("hello.name", { name: "John" });
        };

        languages.addEventListener("change", async () => {
          await render();
        });

        languages.value = "tr";
        await render();
      })().then(() => console.log("ready"));
    </script>
  </body>
</html>
```

### Run

```bash
npm start
```

```bash
open http://127.0.0.1:8080
```
