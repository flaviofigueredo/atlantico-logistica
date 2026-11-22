class VeiculoView {
    static sucesso(mensagem, dados, statusHttp = 200) {
        return {status: "Sucesso", codigoHttp: statusHttp, mensagem: mensagem, dados: dados};
    }

    static erro(mensagem, statusHttp = 400) {
        return { status: statusHttp >= 500 ? "Erro Critico do Servidor (5xx)" : "Erro do Cliente (4xx)", codigoHttp: statusHttp, mensagem: mensagem};
    }
}

module.exports = VeiculoView