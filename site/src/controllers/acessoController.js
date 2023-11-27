var acessoModel = require("../models/acessoModel");



function selecionarPerfil(req, res) {
    var idUsuario = req.body.idUser

    acessoModel.selecionarPerfil(idUsuario).then(result => {
        var idPerfilUsuario = result[0].idPerfilUsuario;
        var fkUsuario = result[0].fkUsuario;
        var nomeMusica = req.body.nomeMusicaServer;
        var nomeArtista = req.body.nomeArtistaServer;

        acessoModel.inserirMusica(fkUsuario, idPerfilUsuario, nomeArtista, nomeMusica)
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

function buscarTop10(req, res) {
    var idUsuario = req.body.idUser
    

    acessoModel.selecionarPerfil(idUsuario).then(result => {
        var idPerfil = result[0].idPerfilUsuario;
        
        
        acessoModel.buscarTop10(idPerfil)
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao buscar o top 10.", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        })
    })

}

function Top10(req, res) {

    acessoModel.Top10()
    .then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar o top 10 mundial.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    })

}


module.exports = {
    selecionarPerfil,
    buscarTop10,
    Top10
}

