const express = require("express");
const router = express.Router();
const VeiculoControllers = require("../controllers/VeiculoController");

router.get("/veiculos", VeiculoControllers.listar);
router.get("/veiculos/:id", VeiculoControllers.buscarPorId);
router.post("/veiculos", VeiculoControllers.cadastrar);
router.put("/veiculos/:id", VeiculoControllers.substituir);

module.exports = router;