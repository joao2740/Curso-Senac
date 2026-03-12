export default function CardProfissionais({imagem, nome, especialidade, descricao}) {
    return (
        <div className="card-profissionais">
            <img src={imagem}/>
            <h4>{nome}</h4>
            <p>{especialidade}</p>
            <p>{descricao}</p>
        </div>
    )
}