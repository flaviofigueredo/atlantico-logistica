const VeiculoView = require('../views/VeiculoView');
const VeiculoModel = require('../models/VeiculoModel');

class VeiculoController {
    static tratarErro(res, erro){
        if (erro.code === "ER_DUP_ENTRY" || erro.errno === 1062) {
            return res.status(409).json(VeiculoView.erro("Conflito (409): a placa (cd_placa) já existe no sistema.", 409));
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
                return res.status(404).json(VeiculoView.erro(`Registro ${id_veiculo} não encontrado.`, 404));
            }
            return res.status(200).json(VeiculoView.sucesso("Registro localizado.", veiculo, 200));
        } catch (erro) {
            return VeiculoController.tratarErro(res, erro);
        }
    }
     static async cadastrar(req, res) {
        try {
            const { cd_placa, nm_modelo, ds_categoria, vl_diaria_frete, qt_quilometragem } = req.body || {};
            if (!cd_placa || !nm_modelo || !ds_categoria) {
                return res.status(400).json(VeiculoView.erro("Os campos cd_placa, nm_modelo e ds_categoria devem estar preenchidos.", 400));
            }
            const valorDiaria = Number(vl_diaria_frete);
            const quantidadeKm = qt_quilometragem !== undefined ? parseInt (qt_quilometragem, 10) : 0;
            if (isNaN(valorDiaria) || valorDiaria <= 0 || isNaN(quantidadeKm) || quantidadeKm <0) {
                return res.status(422).json(VeiculoView.erro("Erro 422: Os valores devem ser maior que 0 e não podem ser negativos.", 422));
            }

            const novoRegistro = await VeiculoModel.cadastrar({
                cd_placa: String(cd_placa).trim().toUpperCase(),
                nm_modelo: String(nm_modelo).trim(),
                ds_categoria: String(ds_categoria).trim(),
                vl_diaria_frete: valorDiaria,
                qt_quilometragem: quantidadeKm
            });
            return res.status(201).json(VeiculoView.sucesso("Cadastro feito com sucesso.", novoRegistro, 201));
        } catch (erro) {
            return VeiculoController.tratarErro(res, erro);
        }
     }
}

module.exports = VeiculoController
