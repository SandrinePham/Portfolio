import React, { useState, useEffect, useRef } from "react";
import "./ProjectCarousel.scss";
import PostIt from "./PostIt";

const ProjectCarousel = ({ projects: propsProjects = [] }) => {
  const [projects, setProjects] = useState(propsProjects);
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef(null);

  // 🔹 Fetch JSON si projects vide et garder les 3 derniers
  useEffect(() => {
    if (projects.length === 0) {
      const fetchProjects = async () => {
        try {
          const basePath = import.meta.env.BASE_URL || "";
          const response = await fetch(`${basePath}data/projects.json`);
          if (!response.ok)
            throw new Error(`Erreur HTTP ! Statut : ${response.status}`);
          let data = await response.json();
          data = data.slice(-3);
          setProjects(data);
        } catch (error) {
          console.error("Erreur chargement JSON :", error);
        }
      };
      fetchProjects();
    }
  }, []);

  // 🔹 Auto-slide léger
  useEffect(() => {
    if (projects.length === 0) return;

    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % projects.length);
    }, 4000);

    return () => clearInterval(intervalRef.current);
  }, [projects]);

  const goToSlide = (index) => setCurrentIndex(index);
  const prevSlide = () =>
    goToSlide(currentIndex === 0 ? projects.length - 1 : currentIndex - 1);
  const nextSlide = () =>
    goToSlide(currentIndex === projects.length - 1 ? 0 : currentIndex + 1);

  if (projects.length === 0) {
    return (
      <div className="carousel-container" style={{ minHeight: "300px" }}>
        <p style={{ textAlign: "center", paddingTop: "100px" }}>
          Chargement des projets...
        </p>
      </div>
    );
  }

  const activeProject = projects[currentIndex];
  const basePath = import.meta.env.BASE_URL || "";
  const imageSrc = `${basePath}${activeProject.image.replace(/^\//, "")}`;

  return (
    <div className="carousel-container" style={{ minHeight: "300px" }}>
      <div className="carousel-image-wrapper">
        <img
          src={imageSrc}
          alt={activeProject.alt || `Projet ${currentIndex + 1}`}
          className="carousel-image active"
          loading="lazy"
        />
        <PostIt index={currentIndex}>{activeProject.title}</PostIt>
      </div>

      <button
        className="carousel-button left"
        onClick={prevSlide}
        aria-label="Projet précédent"
      >
        &#10094;
      </button>
      <button
        className="carousel-button right"
        onClick={nextSlide}
        aria-label="Projet suivant"
      >
        &#10095;
      </button>
    </div>
  );
};

export default ProjectCarousel;
