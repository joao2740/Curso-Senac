import express from "express"

import {
listarClientes,
criarCliente,
deletarCliente
} from "../controllers/clientesController.js"

const router = express.Router()

router.get("/",listarClientes)

router.post("/",criarCliente)

router.delete("/:id",deletarCliente)

export default router