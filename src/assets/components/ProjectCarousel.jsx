import React, { useState, useEffect, useRef } from 'react';
import './ProjectCarousel.scss';

const postitColors = ['#FFE55C', '#87CEEB', '#98FB98', '#FFB6C1'];

const ProjectCarousel = () => {
  const [projects, setProjects] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef(null);

  const getColor = (index) => postitColors[index % postitColors.length];

  // Charger les projets depuis projects.json au montage
  useEffect(() => {
    fetch('/projects.json')
      .then((response) => response.json())
      .then((data) => setProjects(data))
      .catch((error) => console.error('Erreur chargement JSON :', error));
  }, []);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const prevSlide = () => {
    if (projects.length === 0) return;
    goToSlide(currentIndex === 0 ? projects.length - 1 : currentIndex - 1);
    resetAutoSlide();
  };

  const nextSlide = () => {
    if (projects.length === 0) return;
    goToSlide(currentIndex === projects.length - 1 ? 0 : currentIndex + 1);
    resetAutoSlide();
  };

  const startAutoSlide = () => {
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        projects.length === 0
          ? 0
          : prevIndex === projects.length - 1
          ? 0
          : prevIndex + 1
      );
    }, 4000);
  };

  const resetAutoSlide = () => {
    clearInterval(intervalRef.current);
    startAutoSlide();
  };

  useEffect(() => {
    if (projects.length > 0) {
      startAutoSlide();
      return () => clearInterval(intervalRef.current);
    }
  }, [projects]);

  if (!projects || projects.length === 0) {
    return <div className="carousel-container">Aucun projet disponible.</div>;
  }

  return (
    <div className="carousel-container">
      <div className="carousel-image-wrapper">
        {projects.map((project, index) => (
          <img
            key={index}
            src={project.image}
            alt={project.title}
            className={`carousel-image ${
              index === currentIndex ? 'active' : ''
            }`}
          />
        ))}
        <div
          className="carousel-title"
          style={{ backgroundColor: getColor(currentIndex) }}
        >
          {projects[currentIndex].title}
        </div>
      </div>

      <button className="carousel-button left" onClick={prevSlide}>
        &#10094;
      </button>
      <button className="carousel-button right" onClick={nextSlide}>
        &#10095;
      </button>
    </div>
  );
};

export default ProjectCarousel;
