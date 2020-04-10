import Head from "next/head";
import { useEffect, useState } from "react";
import { lisan, t } from "lisan";

const Home = () => {
  const [loaded, setLoaded] = useState(false);
  const [language, setLanguage] = useState("en");

  const updateLanguage = (lang) => {
    setLoaded(false);

    lisan.setLocaleName(lang);
    return import(`../public/dictionaries/${lang}/main`).then((main) => {
      lisan.add(main);
      setLoaded(true);
    });
  };

  const handleChange = (e) => {
    setLanguage(e.target.value);
    updateLanguage(e.target.value);
  };

  useEffect(() => {
    updateLanguage(language);
  }, []);

  if (!loaded) {
    return <p>{t("text.loading")}</p>;
  }

  return (
    <div className="container">
      <Head>
        <title>{t("document.title")}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">
          {t("page.title", {
            linkElement: <a href="https://lisanjs.com">LisanJS!</a>,
          })}
        </h1>

        <p className="description">
          {t("page.description", { codeElement: <code>pages/index.js</code> })}
        </p>

        <div>
          <select value={language} onChange={handleChange}>
            <option value="en">English</option>
            <option value="tr">Türkçe</option>
          </select>
        </div>

        <div className="grid">
          <a href="https://lisanjs.com/docs/what-is-lisan" className="card">
            <h3>{t("section.documentation.title")} &rarr;</h3>
            <p>{t("section.documentation.desc")}</p>
          </a>

          <a href="https://lisanjs.com/docs/translations" className="card">
            <h3>{t("section.translations.title")} &rarr;</h3>
            <p>{t("section.translations.desc")}</p>
          </a>

          <a href="https://github.com/lisanjs/examples" className="card">
            <h3>{t("section.examples.title")} &rarr;</h3>
            <p>{t("section.examples.desc")}</p>
          </a>

          <a href="https://lisanjs.com/try-it-out" className="card">
            <h3>{t("section.try_compiler.title")} &rarr;</h3>
            <p>{t("section.try_compiler.desc")}</p>
          </a>
        </div>
      </main>

      <footer>
        <a href="https://lisanjs.com" target="_blank" rel="noopener noreferrer">
          {t("powered.by", {
            logoImgElement: (
              <img src="/lisan.png" alt="Lisan" height="40px" align="center" />
            ),
          })}
        </a>
      </footer>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }

        .title,
        .description {
          text-align: center;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }

        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          max-width: 800px;
          margin-top: 3rem;
        }

        .card {
          margin: 1rem;
          flex-basis: 45%;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }

        .card:hover,
        .card:focus,
        .card:active {
          color: #0070f3;
          border-color: #0070f3;
        }

        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }

        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }

        a {
          color: #0070f3;
          text-decoration: none;
        }
      `}</style>
    </div>
  );
};

export default Home;
