function CardServico({ titulo, descricao }) {

  function mostrarMensagem({titulo, descricao}) {
    alert("Você clicou no serviço: " + titulo)
  }

  return (
    <div className="card-servico">
      <h3>{titulo}</h3>
      <p>{descricao}</p>
      <button onClick={() => mostrarMensagem({titulo, descricao})}>
        Saiba mais
        </button>
    </div>
  )
}

export default CardServico