const validarHeadersJson = (req, res, next) => {
    const accept = req.headers["accept"] || "*/*";
    if (!accept.includes("application/json") && !accept.includes("*/*")){
        return res.status(406).json({status: "Erro 406", mensagem: "A API responde exclusivamente em application/json."});
    }

    const metodosComBody = ["POST", "PUT", "PATCH"];
    if (metodosComBody.includes(req.method)) {
        const contentType = req.headers["content-type"] || "";
        if(!contentType.includes("application/json")) {
            return res.status(415).json({status: "Erro 415", mensagem: "Obrigatório enviar o Content-Type: application/json"});
        }
    }
    next();
};

const verificarToken = (req, res, next) => {
    const authHeader = req.headers["authorization"] || "";
    if (authHeader !== `Bearer ${process.env.API_TOKEN}`) {
        return res.status(401).json({status: "Erro 401", mensagem: "Acesso negado: Bearer Token Inválido."});
    }
    next();
};

module.exports = { validarHeadersJson, verificarToken};