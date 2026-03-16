import { useState } from "react"

export default function ClienteSearch({ onSearch }) {
  const [nome, setNome] = useState("")
  const [email, setEmail] = useState("")
  const [empresa, setEmpresa] = useState("")

  const handleSearch = (e) => {
    e.preventDefault()
    onSearch({ nome, email, empresa })
  }

  const handleClear = () => {
    setNome("")
    setEmail("")
    setEmpresa("")
    onSearch({ nome: "", email: "", empresa: "" })
  }

  return (
    <div className="search-bar">
      <form onSubmit={handleSearch} style={{ display: 'flex', gap: '10px', width: '100%', flexWrap: 'wrap' }}>
        <input 
          style={{ flex: 1 }}
          placeholder="🔍 Buscar por nome..." 
          value={nome} 
          onChange={e => setNome(e.target.value)} 
        />
        <input 
          style={{ flex: 1 }}
          placeholder="✉️ Buscar por email..." 
          value={email} 
          onChange={e => setEmail(e.target.value)} 
        />
        <input 
          style={{ flex: 1 }}
          placeholder="🏢 Buscar por empresa..." 
          value={empresa} 
          onChange={e => setEmpresa(e.target.value)} 
        />
        <button type="submit" className="btn btn-primary">Filtrar</button>
        <button type="button" onClick={handleClear} className="btn" style={{ background: '#f1f5f9' }}>Limpar</button>
      </form>
    </div>
  )
}
