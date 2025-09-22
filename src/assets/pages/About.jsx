import { useEffect, useRef, useState } from "react";

const About = () => {
  const sectionsRef = useRef([]);
  const [visibleSections, setVisibleSections] = useState([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = entry.target.dataset.index;
          if (entry.isIntersecting) {
            setVisibleSections((prev) => [...new Set([...prev, index])]);
          }
        });
      },
      { threshold: 0.2 }
    );

    sectionsRef.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      sectionsRef.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <div className="about">
      <div className="container">
        <div className="about__header">
          <h2 className="page-title">À propos de moi</h2>
          <div className="page-subtitle">
            De la logistique au Développement web
          </div>
        </div>

        <div className="about__content">
          <div className="about__story">
            {["Mon histoire", "Ma philosophie"].map((title, index) => (
              <div
                key={index}
                className={`story-section ${
                  visibleSections.includes(String(index)) ? "visible" : ""
                }`}
                ref={(el) => (sectionsRef.current[index] = el)}
                data-index={index}
              >
                <h2>{title}</h2>
                {index === 0 ? (
                  <>
                  <p>Bonjour, je suis Sandrine Pham,</p>
                    <p>
                      Après près de 10 ans d'expérience dans la supply chain et
                      l’approvisionnement, j’ai décidé de donner un nouveau
                      tournant à ma carrière en me lançant dans une reconversion
                      vers le développement web.
                    </p>
                    <p>
                      Ce changement est né d’un déclic : l’envie de créer, de
                      concevoir et de donner vie à des projets numériques. J’ai
                      retrouvé dans le code cette rigueur que j’aimais en
                      logistique, mais enrichie d’un potentiel de créativité
                      illimité.
                    </p>
                    <p>
                      Ce qui me passionne particulièrement aujourd’hui, c’est de
                      concevoir des interfaces web à la fois fonctionnelles,
                      esthétiques et accessibles, en combinant technologie et
                      design.
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      J’aime profondément collaborer avec les autres,
                      accompagner les idées et les transformer en projets
                      concrets. Je me donne à 100% dans tout ce que
                      j’entreprends.
                    </p>
                    <p>
                      Pour moi, chaque projet est une œuvre d'art numérique.
                      J'applique les principes de la méthode Kanban pour
                      organiser mon travail, qu’il soit personnel ou en équipe,
                      et garantir une progression claire et une livraison de
                      qualité.
                    </p>
                    <div className="philosophy-points">
                      <div className="point">
                        <strong>Créativité</strong> – Chaque ligne de code est
                        pensée avec soin
                      </div>
                      <div className="point">
                        <strong>Qualité</strong> – Performance et accessibilité
                        avant tout
                      </div>
                      <div className="point">
                        <strong>Collaboration</strong> – Valoriser l’humain dans
                        chaque projet
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>

          <div
            className={`about__image ${
              visibleSections.includes("image") ? "visible" : ""
            }`}
            ref={(el) => (sectionsRef.current[2] = el)}
            data-index="image"
          >
            <img
              src="https://images.pexels.com/photos/3861943/pexels-photo-3861943.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Workspace créatif"
            />
            <div className="image-caption">Mon espace de travail créatif</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
