This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Hello World (React)

## Goal

Purpose of this example to demonstrate a minimal setup
to use [LisanJS](https://lisanjs.com) with [ReactJS](https://reactjs.org).

## Instructions

### 1. Init project

```bash
npx create-react-app 03-hello-world-react

cd ./03-hello-world-react

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
    "inputDir": "src/translations",
    "outputDir": "public/dictionaries",
    "returnArray": true
  }
}
```

> `returnArray` option makes dictionaries compatible with JSX.
> Learn more at [JSX Interpolation](https://lisanjs.com/docs/jsx-interpolation)

### 3. Create translation files

```bash
mkdir -p src/translations/en/ && touch src/translations/en/main.json
mkdir -p src/translations/tr/ && touch src/translations/tr/main.json
```

Migrate content from `./src/App.js` to `src/translations/en/main.json`.

```json
{
  "locale": "en",
  "entries": {
    "edit.message": "Edit ${codeElement} and save to reload.",
    "learn.lisan": "Learn LisanJS"
  }
}
```

### 4. Update the `./src/App.js`

You can see the differences done to `./src/App.js` from [here](https://github.com/lisanjs/examples/compare/10a53fe1c95953505e3b98dc7b98c2ca7d9a825c...master#diff-e04aae894b6a73814ff87c53ec4e42ce).

### 5. Run the app

To run lisan compiler in `watch` mode you can use `-w` flag.

```bash
npm run lisan:compile -- -w
```

```bash
npm run dev
```
