require("dotenv").config();
const express = require("express");
const path = require("path");
const { validarHeadersJson } = require("./src/middlewares/segurancaMiddleware");
const produtoRoutes = require("./src/routes/veiculoRoutes");
const app = express();
const PORTA = process.env.PORT;

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use("/api", validarHeadersJson);
app.use("/api", produtoRoutes);
app.use((req, res) => {
    return res.status(404).json({ status: "Erro 404", mensagem: "Rota não encontrada na API"});
});

app.listen(PORTA, () => {
    console.log(`Servidor ativo em: http://localhost:${PORTA}`);
})