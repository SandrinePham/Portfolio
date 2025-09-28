// hooks/useFetchProjects.js
import { useState, useEffect } from "react";

export function useFetchProjects() {
  const [projectsData, setProjectsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const basePath = import.meta.env.BASE_URL || "";
        const res = await fetch(`${basePath}data/projects.json`);
        if (!res.ok) throw new Error(`Erreur HTTP : ${res.status}`);
        const data = await res.json();
        setProjectsData(data);
      } catch (err) {
        setError(err.message || "Erreur inconnue");
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return { projectsData, loading, error };
}
