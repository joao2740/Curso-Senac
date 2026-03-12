import Botao from "../components/Botao";

export default function Hero() {
    return (
        <section id="inicio" className="hero">
            <div className="container hero-conteudo">
                <h1>Clínica Santa Marta</h1>
                <h2>Enxergue o mundo com mais clareza e cuidado. Na Clínica Santa Marta, unimos tecnologia avançada e atendimento humanizado para proteger a saúde dos seus olhos.</h2>

                <Botao className="botao-hero" text="Venha agendar sua consulta" linkClick={ "https://wa.me/"}/>
            </div>
        </section>
    )
}