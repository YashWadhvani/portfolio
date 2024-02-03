// import logo from "./logo.svg";
import "./App.css";
import FeaturedProjects from "./components/FeaturedProjects";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
// import { Container } from "react-bootstrap";
import NavBar from "./components/Navbar";

function App() {
  return (
    <>
      <NavBar />
      <Hero />
      <FeaturedProjects />
      <Footer />
    </>
  );
}

export default App;
