import React, { useState } from "react";
import "./projectCard.scss";

export default function ProjectCard({ project }) {
  const [showFullDesc, setShowFullDesc] = useState(false);

  // ⚠️ Sécurisation si project est undefined
  if (!project) return null;

  const toggleDesc = () => setShowFullDesc(!showFullDesc);

  const imageSrc = project.image
    ? `${import.meta.env.BASE_URL}${project.image.slice(1)}`
    : "";

  return (
    <article className="project-card">
      {imageSrc && (
        <div className="project-card__image">
          <img src={imageSrc} alt={project.title || "Projet"} loading="lazy" />
          {project.status && (
            <div
              className={`project-card__status project-card__status--${project.status
                .toLowerCase()
                .replace(/\s/g, "-")}`}
            >
              {project.status}
            </div>
          )}
        </div>
      )}

      <div className="project-card__content">
        <h3 className="project-card__title">
          {project.title || "Titre non défini"}
        </h3>
        {project.description && (
          <>
            <p
              className={`project-card__description ${
                showFullDesc ? "full" : ""
              }`}
            >
              {project.description}
            </p>
            {project.description.length > 80 && (
              <button className="show-more" onClick={toggleDesc}>
                {showFullDesc ? "Afficher moins" : "Afficher plus"}
              </button>
            )}
          </>
        )}

        {project.technologies && project.technologies.length > 0 && (
          <div className="project-card__technologies">
            {project.technologies.map((tech) => (
              <span key={tech} className="tech-tag">
                {tech}
              </span>
            ))}
          </div>
        )}

        <div className="project-card__actions">
          {project.projet && (
            <a
              href={project.projet}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--secondary"
            >
              Voir le projet
            </a>
          )}
          {project.code && (
            <a
              href={project.code}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--outline"
            >
              Code source
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
