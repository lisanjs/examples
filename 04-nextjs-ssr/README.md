This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/zeit/next.js/tree/canary/packages/create-next-app).

# Hello World (Next.js)

## Goal

Purpose of this example to demonstrate a minimal setup
to use [LisanJS](https://lisanjs.com) with [NextJS](https://nextjs.org) to achieve server side rendering.

## Instructions

### 1. Init project

```bash
npm init next-app 04-nextjs-ssr

cd ./04-nextjs-ssr

touch .lisanrc
```

First run the application to see if everything works fine:

```bash
npm run dev
```

If everything works fine, continue as below.

1.1. Install Lisan:

```bash
npm install lisan
npm install lisan-cli --save-dev
```

1.2. Add scripts to `package.json`:

```jsonc
{
  // ...
  "scripts": {
    "lisan:compile": "lisan compile"
    // ..rest of the scripts
  }
}
```

1.3. Add dictionaries to `.gitignore` (Optional)

```text
node_modules/

public/dictionaries/
```

### 2. Set Lisan config

Update the `.lisanrc` config as below:

```json
{
  "compile": {
    "inputDir": "translations",
    "outputDir": "public/dictionaries",
    "returnArray": true
  }
}
```

> `returnArray` option makes dictionaries compatible with JSX.
> Learn more at [JSX Interpolation](https://lisanjs.com/docs/jsx-interpolation)

### 3. Create translation files

```bash
mkdir -p translations/en/ && touch translations/en/main.json
mkdir -p translations/tr/ && touch translations/tr/main.json
```

Migrate content from `./pages/index.js` to `./translations/en/main.json`.

```json
{
  "locale": "en",
  "entries": {
    "text.loading": "Loading...",
    "document.title": "Create Lisan App",
    "page.title": "Welcome to ${linkElement}",
    "page.description": " Get started by editing ${codeElement}",
    "section.documentation.title": "Documentation",
    "section.documentation.desc": "Find out more about technical details and best practices.",
    "section.translations.title": "Lisan Literal",
    "section.translations.desc": "See full capabilities of Lisan Literal",
    "section.examples.title": "Examples",
    "section.examples.desc": "Explore many different use cases of Lisan.",
    "section.try_compiler.title": "Try Online Compiler",
    "section.try_compiler.desc": "You can test capabilities of lisan-compiler online.",
    "powered.by": "Powered by ${logoImgElement}"
  }
}
```

### 4. Update the `./src/App.js`

You can see the differences done to App js from [here](https://github.com/lisanjs/examples/compare/9c6659e93b2320fe325423f022a63a6376bdb670...master#diff-5762631d6d770364d8a847b35d27c697).

### 5. Run the app

To run lisan compiler in `watch` mode you can use `-w` flag.

```bash
npm run lisan:compile -- -w
```

```bash
npm run dev
```
