function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo-area">
          <h1>Dashboard de Serviços</h1>
        </div>
        <nav className="nav-main" role="navigation" aria-label="Navegação principal">
          <a href="#" className="nav-link">Home</a>
          <a href="#" className="nav-link">Serviços</a>
          <a href="#" className="nav-link">Contato</a>
        </nav>
      </div>
    </header>
  )
}

export default Header