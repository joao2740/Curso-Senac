export default function Sobre() {
  return (
    <section id="sobre" className="sobre">
      <div className="container sobre-conteudo">
        <div className="sobre-texto">
          <h2>Sobre a Clínica</h2>
          <p className="apresentacao">
            Com mais de 10 anos de excelência, a Clínica Santa Marta é referência no 
            cuidado com a saúde ocular. Nossa estrutura moderna e aconchegante foi pensada 
            especialmente para oferecer o máximo de conforto desde o momento de sua chegada.
          </p>
          <div className="missao-visao">
            <div className="mv-card">
              <h3>Nossa Missão</h3>
              <p>Proporcionar saúde e qualidade de vida por meio de um atendimento oftalmológico humanizado, ético e de alta precisão tecnológica.</p>
            </div>
            <div className="mv-card">
              <h3>Nosso Propósito</h3>
              <p>Ser a escolha de confiança das famílias quando o assunto é cuidar do bem mais precioso: a visão e a forma de enxergar o mundo.</p>
            </div>
          </div>
        </div>
        <div className="sobre-imagem">
          <img src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800" alt="Fachada e interior da Clínica Santa Marta" />
        </div>
      </div>
    </section>
  );
}
