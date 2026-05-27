import CardArea from "../components/CardArea";

function Areas() {
  return (
    <section className="areas">
      <div className="container">
        <h2 className="section-title">Áreas de Atuação</h2>

        <div className="areas-grid">
          <CardArea
            titulo="Direito Civil"
            descricao="Atuação em contratos, indenizações, responsabilidade civil e questões patrimoniais."
          />

          <CardArea
            titulo="Direito Trabalhista"
            descricao="Defesa de direitos trabalhistas e assessoria jurídica para empresas."
          />

          <CardArea
            titulo="Direito Empresarial"
            descricao="Consultoria estratégica para empresas, elaboração de contratos e planejamento jurídico."
          />
        </div>
      </div>
    </section>
  );
}

export default Areas;
