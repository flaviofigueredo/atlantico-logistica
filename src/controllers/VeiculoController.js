const { parse } = require('dotenv');
const VeiculoView = require('../views/VeiculoView');
const VeiculoModel = require('../models/VeiculoModel');

class VeiculoController {
    static tratarErro(res, erro){
        if (erro.code === "ER_DUP_ENTRY" || erro.errno === 1062) {
            return res.status(409).json(VeiculoView.erro("Conflito (409): já está cadastrado.", 409));
        }
        return res.status(500).json(VeiculoView.erro(`Falha interna no Servidor: ${erro.message}`, 500));
    }

    static async listar(req, res) {
        try {
            const { ds_categoria } = req.query;
            const veiculos = await VeiculoModel.listarTodos(ds_categoria);
            return res.status(200).json(VeiculoView.sucesso("Listado com sucesso.", veiculos, 200));
        } catch (erro) {
            return VeiculoController.tratarErro(res, erro);
        }
    }

    static async buscarPorId(req, res) {
        try {
            const id_veiculo = parseInt(req.params.id, 10);
            if (isNaN(id_veiculo) || id_veiculo <= 0) {
                return res.status(400).json(VeiculoView.erro("Parâmetro inválido.", 400));
            }

            const veiculo = await VeiculoModel.buscarPorId(id_veiculo);
            if (!veiculo) {
                return res.staatus(404).json(VeiculoView.erro(`Registro ${id_veiculo} não encontrado.`, 404));
            }
            return res.status(200).json(VeiculoView.sucesso("Registro localizado.", veiculo, 200));
        } catch (erro) {
            return VeiculoController.tratarErro(res, erro);
        }
    }
}

module.exports = VeiculoController
