import CardServico from "../components/CardServico";

export default function Servicos() {
  const servicos = [
    {
      icone: "👓",
      titulo: "Consultas de Rotina",
      descricao: "Avaliação completa da acuidade visual, prescrição de óculos e lentes de contato."
    },
    {
      icone: "🔬",
      titulo: "Exames Especializados",
      descricao: "Mapeamento de retina, topografia de córnea, paquimetria e ultrassonografia ocular."
    },
    {
      icone: "👁️",
      titulo: "Cirurgia de Catarata",
      descricao: "Procedimento moderno, rápido e seguro para devolução da visão cristalina."
    },
    {
      icone: "⚕️",
      titulo: "Tratamento de Glaucoma",
      descricao: "Acompanhamento clínico minucioso e procedimentos a laser para controle da pressão intraocular."
    },
    {
      icone: "🧒",
      titulo: "Oftalmopediatria",
      descricao: "Cuidado especializado para a visão infantil, de bebês a adolescentes."
    },
    {
      icone: "⚡",
      titulo: "Pronto Atendimento Clínico",
      descricao: "Suporte e assistência em casos de urgência como inflamações e corpo estranho ocular."
    }
  ];

  return (
    <section id="servicos" className="servicos">
      <div className="container">
        <h2>Nossos Serviços</h2>
        <p className="servicos-subtitulo">Oferecemos cuidado integral para a sua saúde ocular com a mais alta tecnologia.</p>
        <div className="grid-servicos">
          {servicos.map((servico, index) => (
            <CardServico key={index} {...servico} />
          ))}
        </div>
      </div>
    </section>
  );
}
