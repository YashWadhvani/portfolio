import { Route, Routes } from "react-router-dom";
import "./App.css";
import NavBar from "./components/Navbar";
import Footer from "./components/Footer";
import { SpeedInsights } from "@vercel/speed-insights/react";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";

function App() {
  return (
    <>
      <SpeedInsights />
      <NavBar />
      <Routes>
        <Route index element={<Home />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/projects" element={<Projects />} />
        <Route exact path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
