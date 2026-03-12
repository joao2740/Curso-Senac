import React from 'react';
import '../styles/global.css';

function Contato() {
  return (
    <section className="contact-section" id="contato">
      <h2>Contato</h2>
      <p>Telefone: (11) 1234-5678</p>
      <p>E-mail: contato@clinicasantamarta.com.br</p>
      <p>Endereço: Rua Fictícia, 123 - Bairro Exemplo, Cidade/UF</p>
      <button className="contact-button">Entrar em contato</button>
    </section>
  );
}

export default Contato;