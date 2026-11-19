const express = require("express");
const router = express.Router();
const VeiculoControllers = require("../controllers/VeiculoController");
const { verificarToken } = require("../middlewares/segurancaMiddleware");


router.get("/veiculo", VeiculoControllers.listar);
router.get("/veiculo/:id", VeiculoControllers.buscarPorId);
router.post("/veiculo", verificarToken, VeiculoControllers.cadastrar);
router.put("/veiculo/:id", verificarToken, VeiculoControllers.substiruir);
router.patch("/veiculo:id/estoque", verificarToken, VeiculoControllers.atualizarEstoque);
router.delete("/veiculo/:id", verificarToken, VeiculoControllers.delete);

module.exports = router;