import CardProfissionais from "../components/CardProfissionais";

export default function Profissionais() {
    return (
        <section id="profissionais" className="profissionais">
            <div className="container">
                <h2>Nossos Profissionais</h2>
                <div className="grid-profissionais">
                    <CardProfissionais imagem="https://marcelovilar.com.br/vews/765ad57fdc/assets/img/foto-dr-marcelo-vilar.jpg" nome="Cleiton Maia" especialidade="Oftalmologista" descricao="Profissional em oftalmologia"/>
                    <CardProfissionais imagem="https://tse2.mm.bing.net/th/id/OIP.kT-30NjdYO-pkWhSWW0lmgHaHa?rs=1&pid=ImgDetMain&o=7&rm=3" nome="Rodrigo Vasconcelos" especialidade="Neuro-Oftalmologista" descricao="Especialista em cirurgias neurológicas"/>
                    <CardProfissionais imagem="https://tse2.mm.bing.net/th/id/OIP.B3AUUj0qlYlndc361VxjIwAAAA?rs=1&pid=ImgDetMain&o=7&rm=3" nome="Ana Clara" especialidade="Oftalmologista Pediátrica" descricao="Profissional em atendimentos pediátricos"/>

                </div>
            </div>
        </section>
    )
}