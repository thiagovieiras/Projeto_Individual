var acessada = require("../models/graficoModel");

function buscarUltimasCinco() {

// Obtenha o valor do atributo src
    const cincoEscutadas = 5;

    var idUsuario = req.params.idUsuario;

    console.log(`Recuperando as ultimas ${cincoEscutadas} medidas`);

    graficoModel.buscarUltimasCinco(idUsuario, cincoEscutadas).then(function (resultado) {
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
    buscarUltimasCinco
}