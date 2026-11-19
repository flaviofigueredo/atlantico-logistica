const express = require("express");
const routes = express.Router();
const VeiculoControllers = require("../controllers/VeiculoController");
const { verificarToken } = require("../middlewares/segurancaMiddleware");


routes.get("/veiculo", VeiculoControllers.listar);
routes.get("/veiculo/:id", VeiculoControllers.buscarPorId);
routes.post("/veiculo", verificarToken, VeiculoControllers.cadastrar);
routes.put("/veiculo/:id", verificarToken, VeiculoControllers.substiruir);
routes.patch("/veiculo:id/estoque", verificarToken, VeiculoControllers.atualizarEstoque);
routes.delete("/veiculo/:id", verificarToken, VeiculoControllers.delete);

module.express = router;