import CardServico from "../components/CardServico"

function Servicos(){

  const listaServicos = [
    {
      titulo:"Consultoria",
      descricao:"Ajudamos empresas a crescer."
    },
    {
      titulo:"Desenvolvimento Web",
      descricao:"Criamos aplicações modernas."
    },
    {
      titulo:"Automação",
      descricao:"Automatizamos processos."
    }
  ]

  return(

    <main>
      <section className="servicos">

        <div className="servicos-container">
          <h2>Nossos Serviços</h2>
          <p className="servicos-subtitle">Soluções completas para o seu negócio</p>

          <div className="grid-servicos">

            {listaServicos.map((servico, index) => (
              
              <CardServico
                key={index}
                titulo={servico.titulo}
                descricao={servico.descricao}
              />

            ))}

          </div>
        </div>

      </section>
    </main>

  )
}

export default Servicos