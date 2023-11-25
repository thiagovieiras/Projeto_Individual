var acessoModel = require("../models/acessoModel");
var musica = require("../../public/js/music");

function acesso(req, res) {
    var idUsuario = req.params.idUsuario;
    var idMusica = req.params.idMusica;
        console.log(idUsuario, idMusica);
    
        // Passe os valores como parâmetro e vá para o arquivo acessoModel.js
        acessoModel.acesso(idUsuario, idMusica)
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




function selecionarMusica(req, res) {
    var idUsuario = req.body.idUser

    
    acessoModel.selecionarMusica(idUsuario).then(result => {
        var idPerfilUsuario = result[0].idPerfilUsuario;
        var fkUsuario = result[0].fkUsuario;
        var nomeMusica = req.body.nomeMusicaServer;
        var nomeArtista = req.body.nomeArtistaServer;

        acessoModel.inserirMusica(fkUsuario , idPerfilUsuario, nomeArtista, nomeMusica)
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
    })
    
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
    selecionarMusica,
    buscarHistoricoEmTempoReal,
}

