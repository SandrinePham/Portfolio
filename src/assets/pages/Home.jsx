import { useEffect, useState } from "react";
import Typewriter from "../components/Typewriter";
import ProjectCarousel from "../components/ProjectCarousel";

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const lines = [
    {
      text: "Coder avec précision,",
      className: "typewriter--large",
    },
    {
      text: "créer avec intuition.",
      className: "typewriter--large",
    },
  ];

  // Mock des 3 derniers projets — remplace par tes données réelles
  const projects = [
    {
      title: "Portfolio Créatif",
      image: "/images/project1.jpg",
    },
    {
      title: "E-commerce Vintage",
      image: "/images/project2.jpg",
    },
    {
      title: "Blog Design UX",
      image: "/images/project3.jpg",
    },
  ];

  return (
    <div className={`home ${isVisible ? "home--visible" : ""}`}>
      <div className="hero">
        <div className="hero__left carousel--desktop">
          <ProjectCarousel projects={projects} />
        </div>
        <div className="hero__right">
          <div className="hero__content">
            <div className="hero__text">
              <h1 className="hero__title">
                <Typewriter lines={lines} speed={50} />
              </h1>

              <div className="hero__description">
                <p>
                  Ecrivons ensemble l'histoire de votre projet digital. Avec une
                  passion pour le design et une expertise technique, je
                  transforme vos idées en interfaces élégantes et
                  fonctionnelles.
                </p>
              </div>

              {/* ✅ Carrousel mobile ici */}
              <div className="carousel--mobile">
                <ProjectCarousel projects={projects} />
              </div>

              <div className="signature">
                <h2 className="signatureName">Sandrine Pham</h2>
                <div className="signatureFonction">Développeuse Front-end</div>
              </div>

              <div className="hero__cta">
                <button className="btn btn--primary">
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
              <div className="highlight-card__number">3+</div>
              <div className="highlight-card__text">
                <h3>Années de création digitale</h3>
                <p>
                  À façonner des interfaces qui parlent autant au cœur qu’à
                  l’œil.
                </p>
              </div>
            </article>

            <article className="highlight-card">
              <div className="highlight-card__number">15+</div>
              <div className="highlight-card__text">
                <h3>Projets façonnés sur mesure</h3>
                <p>Chaque ligne de code pensée pour sublimer votre vision.</p>
              </div>
            </article>

            <article className="highlight-card">
              <div className="highlight-card__number">5</div>
              <div className="highlight-card__text">
                <h3>Technologies comme palette</h3>
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
