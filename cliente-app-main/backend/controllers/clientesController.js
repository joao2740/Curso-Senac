import db from "../config/db.js"

export const listarClientes = (req,res)=>{
  db.query("SELECT * FROM clientes",(err,result)=>{
    if(err) return res.status(500).json(err)

    res.json(result)
  })
}

export const criarCliente = (req,res)=>{
  const {nome,email,telefone,empresa} = req.body

  db.query(
    "INSERT INTO clientes (nome,email,telefone,empresa) VALUES (?,?,?,?)",
    [nome,email,telefone,empresa],
    (err,result)=>{
      if(err) return res.status(500).json(err)

      res.json({id:result.insertId})
    }
  )
}

export const deletarCliente = (req,res)=>{
  const {id} = req.params

  db.query(
    "DELETE FROM clientes WHERE id=?",
    [id],
    (err)=>{
      if(err) return res.status(500).json(err)

      res.json({message:"removido"})
    }
  )
}