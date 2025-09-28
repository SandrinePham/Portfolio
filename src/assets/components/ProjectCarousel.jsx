import React, { useState, useEffect, useRef } from "react";
import { useFetchProjects } from "../hooks/UseFectchProjects";
import "./ProjectCarousel.scss";

const postitColors = ["#FFE55C", "#87CEEB", "#98FB98", "#FFB6C1"];

const ProjectCarousel = () => {
  const { projectsData, loading, error } = useFetchProjects();
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef(null);

  const getColor = (index) => postitColors[index % postitColors.length];

  // 🔹 Auto-slide
  useEffect(() => {
    if (!projectsData.length) return;

    const intervalId = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % projectsData.length);
    }, 4000);

    return () => clearInterval(intervalId);
  }, [projectsData]);

  // 🔹 Précharger le slide suivant
  useEffect(() => {
    if (!projectsData.length) return;
    const nextIndex = (currentIndex + 1) % projectsData.length;
    const nextImg = new Image();
    nextImg.src = projectsData[nextIndex].image;
  }, [currentIndex, projectsData]);

  const goToSlide = (index) => setCurrentIndex(index);
  const prevSlide = () =>
    goToSlide(currentIndex === 0 ? projectsData.length - 1 : currentIndex - 1);
  const nextSlide = () =>
    goToSlide(currentIndex === projectsData.length - 1 ? 0 : currentIndex + 1);

  if (loading) {
    return (
      <div className="carousel-container" style={{ minHeight: "300px" }}>
        <p style={{ textAlign: "center", paddingTop: "100px" }}>
          Chargement des projets...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="carousel-container" style={{ minHeight: "300px" }}>
        <p style={{ color: "red", textAlign: "center", paddingTop: "100px" }}>
          Erreur : {error}
        </p>
      </div>
    );
  }

  if (!projectsData.length) {
    return (
      <div className="carousel-container" style={{ minHeight: "300px" }}>
        <p style={{ textAlign: "center", paddingTop: "100px" }}>
          Aucun projet disponible.
        </p>
      </div>
    );
  }

  const activeProject = projectsData[currentIndex];
  const basePath = import.meta.env.BASE_URL || "";
  const lowRes = `${basePath}${activeProject.image.replace(/^\//, "").replace(".jpg", "-low.jpg")}`;
  const highRes = `${basePath}${activeProject.image.replace(/^\//, "")}`;

  return (
    <div className="carousel-container" style={{ minHeight: "300px" }}>
      <div className="carousel-image-wrapper">
        <picture>
          <source srcSet={highRes} type="image/jpeg" />
          <img
            src={lowRes}
            alt={activeProject.alt || `Projet ${currentIndex + 1}`}
            className="carousel-image active"
            loading="lazy"
            style={{ willChange: "transform, opacity", transition: "opacity 0.5s ease" }}
          />
        </picture>
        <div
          className="carousel-title"
          style={{
            backgroundColor: getColor(currentIndex),
            willChange: "transform, opacity",
          }}
        >
          {activeProject.title}
        </div>
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

export default React.memo(ProjectCarousel);
