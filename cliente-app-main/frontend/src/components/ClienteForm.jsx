import {useState} from "react"
import {api} from "../services/api"

export default function ClienteForm({reload}){

const [nome,setNome] = useState("")
const [email,setEmail] = useState("")
const [telefone,setTelefone] = useState("")
const [empresa,setEmpresa] = useState("")

const salvar = async(e)=>{
e.preventDefault()

await api.post("/clientes",{
nome,email,telefone,empresa
})

setNome("")
setEmail("")
setTelefone("")
setEmpresa("")

reload()
}

return(

<form onSubmit={salvar} className="form">

<input placeholder="Nome" value={nome} onChange={e=>setNome(e.target.value)}/>

<input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)}/>

<input placeholder="Telefone" value={telefone} onChange={e=>setTelefone(e.target.value)}/>

<input placeholder="Empresa" value={empresa} onChange={e=>setEmpresa(e.target.value)}/>

<button>Salvar</button>

</form>

)
}