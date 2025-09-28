import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Typewriter from "../components/Typewriter";
import ProjectCarousel from "../components/ProjectCarousel";

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const lines = [
    { text: "Coder avec précision,", className: "typewriter--large" },
    { text: "créer avec intuition.", className: "typewriter--large" },
  ];


  return (
    <div className={`home ${isVisible ? "home--visible" : ""}`}>
      <div className="hero">
        {/* 🔹 Carousel unique */}
        <ProjectCarousel />

        <div className="hero__right">
          <div className="hero__content">
            <div className="hero__text">
              {/* H2 pour le slogan, H1 dans le Header */}
              <h2 className="hero__title">
                <Typewriter lines={lines} speed={50} />
              </h2>

              <div className="hero__description">
                <p>
                  Écrivons ensemble l'histoire de votre projet digital. Avec une
                  passion pour le design et une expertise technique, je
                  transforme vos idées en interfaces élégantes et fonctionnelles.
                </p>
              </div>

              <div className="signature">
                <h3 className="signatureName">Sandrine Pham</h3>
                <div className="signatureFonction">Développeuse Front-end</div>
              </div>

              <div className="hero__cta">
                <button
                  className="btn btn--primary"
                  aria-label="Aller à la page contact pour discuter d'un projet"
                >
                  Discutons de votre projet
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="home__highlights">
        <div className="container">
          <div className="highlights">
            <article className="highlight-card">
              <div
                className="highlight-card__number"
                aria-label="Plus d'une année d'expérience en création digitale"
              >
                1+
              </div>
              <div className="highlight-card__text">
                <h4>Années de création digitale</h4>
                <p>
                  À façonner des interfaces qui parlent autant au cœur qu’à l’œil.
                </p>
              </div>
            </article>

            <article className="highlight-card">
              <div
                className="highlight-card__number"
                aria-label="Dix projets réalisés sur mesure"
              >
                10
              </div>
              <div className="highlight-card__text">
                <h4>Projets façonnés sur mesure</h4>
                <p>Chaque ligne de code pensée pour sublimer votre vision.</p>
              </div>
            </article>

            <article className="highlight-card">
              <div
                className="highlight-card__number"
                aria-label="Cinq technologies maîtrisées"
              >
                5
              </div>
              <div className="highlight-card__text">
                <h4>Technologies comme palette</h4>
                <p>
                  React, SCSS, JavaScript... au service de l’esthétique et de la
                  fluidité.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
