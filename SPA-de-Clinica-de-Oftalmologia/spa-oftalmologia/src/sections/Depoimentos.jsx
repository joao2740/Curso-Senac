import CardDepoimento from "../components/CardDepoimento";

export default function Depoimentos() {
  const depoimentos = [
    {
      nome: "Ricardo Santos",
      foto: "https://randomuser.me/api/portraits/men/32.jpg",
      depoimento: "O atendimento na Clínica Santa Marta foi excepcional. Fiz minha cirurgia de catarata e recuperei minha visão completamente. Recomendo a todos!",
      estrelas: 5,
    },
    {
      nome: "Julia Mendes",
      foto: "https://randomuser.me/api/portraits/women/44.jpg",
      depoimento: "Levei meu filho para a consulta com a Dra. Ana Clara e ela foi super atenciosa. Excelente cuidado com as crianças.",
      estrelas: 5,
    },
    {
      nome: "Marcos Oliveira",
      foto: "https://randomuser.me/api/portraits/men/85.jpg",
      depoimento: "Equipamentos de última geração e profissionais extremamente qualificados. Me sinto seguro em cuidar da minha visão aqui.",
      estrelas: 4,
    },
  ];

  return (
    <section id="depoimentos" className="depoimentos">
      <div className="container">
        <h2>O que dizem nossos pacientes</h2>
        <div className="grid-depoimentos">
          {depoimentos.map((d, index) => (
            <CardDepoimento key={index} {...d} />
          ))}
        </div>
      </div>
    </section>
  );
}
