import React from 'react';
import '../styles/global.css';

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="container nav-content">
        <div className="logo">
          <h2>Clínica <span>Santa Marta</span></h2>
        </div>
        <nav className="nav-links">
          <a href="#inicio">Início</a>
          <a href="#sobre">Sobre a Clínica</a>
          <a href="#servicos">Serviços</a>
          <a href="#profissionais">Profissionais</a>
          <a href="#depoimentos">Depoimentos</a>
          <a href="#contato">Contato</a>
        </nav>
      </div>
    </header>
  );
}
