function CardServico({ titulo, descricao }) {

  return (
    <article className="card-servico">
      <h3>{titulo}</h3>
      <p>{descricao}</p>
      <button className="btn-primary" aria-label={`Saiba mais sobre ${titulo}`}>
        Saiba mais
      </button>
    </article>
  )
}

export default CardServico