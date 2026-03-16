import {api} from "../services/api"

export default function ClienteList({clientes,reload}){

const remover = async(id)=>{

await api.delete(`/clientes/${id}`)

reload()

}

return(

<div className="lista">

{clientes.map((c)=>(
<div key={c.id} className="card">

<h3>{c.nome}</h3>
<p>{c.email}</p>
<p>{c.telefone}</p>
<p>{c.empresa}</p>

<button onClick={()=>remover(c.id)}>Remover</button>

</div>
))}

</div>

)
}