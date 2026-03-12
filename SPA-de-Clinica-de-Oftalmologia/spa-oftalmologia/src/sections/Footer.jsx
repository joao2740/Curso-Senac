import React from 'react';
import '../styles/global.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="clinic-info">
            <h2>Clínica Santa Marta</h2>
          </div>
          <div className="contact-info">
            <h3>Contato</h3>
            <p>Telefone: (11) 1234-5678</p>
            <p>E-mail: contato@clinicasantamarta.com.br</p>
            <p>Endereço: Rua Fictícia, 123 - Bairro Exemplo, Cidade/UF</p>
            <button className="contact-button">Entrar em contato</button>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Clínica Santa Marta. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;