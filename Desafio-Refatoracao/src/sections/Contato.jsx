import { useState } from "react";

function Contato() {
    const[nome, setNome] = useState("");

    function enviarFormulario(event) {
        event.preventDefault();
        alert("Mensagem enviada por: " + nome)
   }

   return (
    <section className="contato">
        <h2>Contato</h2>
        <form onSubmit={enviarFormulario} className="form-contato">
            <input type="text" placeholder="Digite seu nome" value={nome} onChange={(e) => setNome(e.target.value)}/>

            <button type="submit">
                Enviar
            </button>
        </form>
    </section>
   )
}

export default Contato;