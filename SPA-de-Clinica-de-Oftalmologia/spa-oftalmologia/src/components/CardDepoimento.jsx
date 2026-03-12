export default function CardDepoimento({ foto, nome, depoimento, estrelas }) {
  return (
    <div className="card-depoimento">
      <div className="estrelas">
        {"★".repeat(estrelas)}{"☆".repeat(5 - estrelas)}
      </div>
      <p className="depoimento-texto">"{depoimento}"</p>
      <div className="paciente-info">
        <img src={foto} alt={nome} />
        <h5>{nome}</h5>
      </div>
    </div>
  );
}
