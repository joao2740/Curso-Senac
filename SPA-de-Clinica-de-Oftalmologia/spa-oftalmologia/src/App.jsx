// Colocar os imports
import Hero from "./sections/Hero";
import Sobre from "./sections/Sobre";
import Servicos from "./sections/Servicos";
import Profissionais from "./sections/Profissionais";
import Depoimentos from "./sections/Depoimentos";
import Footer from "./sections/Footer";
import Navbar from "./components/Navbar";

export default function App() {

  return (
    <>
    <Navbar />
    <Hero />
    <Sobre />
    <Servicos />
    <Profissionais />
    <Depoimentos />
    <Footer />
    </>
  )
}