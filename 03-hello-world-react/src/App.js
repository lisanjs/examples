import React, { useState, useEffect } from "react";
import { lisan, t } from "lisan";
import logo from "./logo.svg";
import "./App.css";

const Loading = (
  <div style={{ textAlign: "center", marginTop: "10px" }}>{"Loading..."}</div>
);

function App() {
  const [loaded, setLoaded] = useState(false);
  const [language, setLanguage] = useState("en");

  const updateLanguage = (lang) => {
    lisan.setLocaleName(lang);

    import(`../public/dictionaries/${lang}/main`).then((dict) => {
      lisan.add(dict);
      setLoaded(true);
      setLanguage(lang);
    });
  };

  const handleChange = (event) => {
    updateLanguage(event.target.value);
  };

  useEffect(() => {
    updateLanguage(language);
  }, [language]);

  if (!loaded) {
    return Loading;
  }

  const editMessage = t("edit.message", {
    codeElement: <code>src/App.js</code>,
  });

  console.log("message", editMessage);

  return (
    <div className="App">
      <header className="App-header">
        <select value={language} onChange={handleChange}>
          <option value="en">English</option>
          <option value="tr">Türkçe</option>
        </select>
        <img src={logo} className="App-logo" alt="logo" />
        <p>{editMessage}</p>
        <a
          className="App-link"
          href="https://lisanjs.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t("learn.lisan")}
        </a>
      </header>
    </div>
  );
}

export default App;
