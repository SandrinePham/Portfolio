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

    sectionsRef.current.forEach((ref) => ref && observer.observe(ref));

    return () =>
      sectionsRef.current.forEach((ref) => ref && observer.unobserve(ref));
  }, []);

  const storySections = [
    {
      title: "Mon histoire",
      content: (
        <>
          <p>Bonjour, je suis Sandrine Pham,</p>
          <p>
            Après près de 10 ans d'expérience dans la supply chain et
            l’approvisionnement, j’ai décidé de donner un nouveau tournant à ma
            carrière en me lançant dans une reconversion vers le développement
            web.
          </p>
          <p>
            Ce changement est né d’un déclic : l’envie de créer, de concevoir et
            de donner vie à des projets numériques. J’ai retrouvé dans le code
            cette rigueur que j’aimais en logistique, mais enrichie d’un
            potentiel de créativité illimité.
          </p>
          <p>
            Ce qui me passionne particulièrement aujourd’hui, c’est de concevoir
            des interfaces web à la fois fonctionnelles, esthétiques et
            accessibles, en combinant technologie et design.
          </p>
        </>
      ),
    },
    {
      title: "Ma philosophie",
      content: (
        <>
          <p>
            J’aime profondément collaborer avec les autres, accompagner les
            idées et les transformer en projets concrets. Je me donne à 100%
            dans tout ce que j’entreprends.
          </p>
          <p>
            Pour moi, chaque projet est une œuvre d'art numérique. J'applique
            les principes de la méthode Kanban pour organiser mon travail, qu’il
            soit personnel ou en équipe, et garantir une progression claire et
            une livraison de qualité.
          </p>
          <div className="philosophy-points">
            <div className="point">
              <strong>Créativité</strong> – Chaque ligne de code est pensée avec
              soin
            </div>
            <div className="point">
              <strong>Qualité</strong> – Performance et accessibilité avant tout
            </div>
            <div className="point">
              <strong>Collaboration</strong> – Valoriser l’humain dans chaque
              projet
            </div>
          </div>
        </>
      ),
    },
  ];

  return (
    <main className="about">
      <div className="container">
        <header className="about__header">
          <h1 className="page-title">À propos de moi</h1>
          <p className="page-subtitle">De la logistique au développement web</p>
        </header>

        <div className="about__content">
          <section className="about__story">
            {storySections.map((section, idx) => (
              <article
                key={idx}
                className={`story-section ${
                  visibleSections.includes(String(idx)) ? "visible" : ""
                }`}
                ref={(el) => (sectionsRef.current[idx] = el)}
                data-index={idx}
              >
                <h2>{section.title}</h2>
                {section.content}
              </article>
            ))}
          </section>
        </div>
      </div>
    </main>
  );
};

export default About;
