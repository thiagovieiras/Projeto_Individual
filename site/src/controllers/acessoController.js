var acessoModel = require("../models/acessoModel");

function acesso(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var idCliente = sessionStorage.ID_USUARIO;
    

    // Faça as validações dos valores
    

        // Passe os valores como parâmetro e vá para o arquivo acessoModel.js
        acessoModel.acesso(idCliente)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

function buscarHistoricoEmTempoReal(req, res) {

    var idUsuario = req.params.idUsuario;

    console.log(`Recuperando medidas em tempo real`);

    acessoModel.buscarHistoricoEmTempoReal(idUsuario).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}


module.exports = {
    acesso,
    buscarHistoricoEmTempoReal
}

