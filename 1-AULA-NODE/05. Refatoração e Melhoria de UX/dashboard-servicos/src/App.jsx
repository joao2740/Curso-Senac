import Header from "./components/Header"
import Servicos from "./sections/Servicos"

function App() {

  return (
    <>
      <Header />
      <Servicos />
      <footer className="footer">
        <p>&copy; 2025 Dashboard de Serviços. Todos os direitos reservados.</p>
      </footer>
    </>
  )
}

export default App