export default function CardServico({ icone, titulo, descricao }) {
  return (
    <div className="card-servico">
      <div className="servico-icone">{icone}</div>
      <h3>{titulo}</h3>
      <p>{descricao}</p>
    </div>
  );
}
