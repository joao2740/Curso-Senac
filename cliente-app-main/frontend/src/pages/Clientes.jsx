import {useEffect,useState} from "react"

import ClienteForm from "../components/ClienteForm"
import ClienteList from "../components/ClienteList"

import {api} from "../services/api"

export default function Clientes(){

const [clientes,setClientes] = useState([])

const carregar = async()=>{

const res = await api.get("/clientes")

setClientes(res.data)

}

useEffect(()=>{
carregar()
},[])

return(

<div className="container">

<h1>Cadastro de Clientes</h1>

<ClienteForm reload={carregar}/>

<ClienteList clientes={clientes} reload={carregar}/>

</div>

)
}