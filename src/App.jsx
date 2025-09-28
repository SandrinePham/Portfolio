import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./assets/components/Header";
import Home from "./assets/pages/Home";
import About from "./assets/pages/About";
import Projects from "./assets/pages/Projects";
import Skills from "./assets/pages/Skills";
import Experience from "./assets/pages/Experience";
import Footer from "./assets/components/Footer";

const basename = "/Portfolio";  // <-- ici tu fixes la base

function App() {
  return (
    <Router basename={basename}>
      <div className="app">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/experience" element={<Experience />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

