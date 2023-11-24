var perfilModel = require("../models/perfilModel");

function buscarUsuarioPorPerfil(req, res) {
  var fkUsuario = req.params.usuarioId;

  perfilModel.buscarUsuarioPorPerfil(fkUsuario).then((resultado) => {
    if (resultado.length > 0) {
      res.status(200).json(resultado);
    } else {
      res.status(204).json([]);
    }
  }).catch(function (erro) {
    console.log(erro);
    console.log("Houve um erro ao buscar os perfil: ", erro.sqlMessage);
    res.status(500).json(erro.sqlMessage);
  });
}


function cadastrar(req, res) {
  var idPerfilUsuario = req.params.fkUsuario;
  var idUsuario = req.params.id;


  if (idPerfilUsuario == undefined) {
    res.status(400).send("descricao está undefined!");
  } else if (idUsuario == undefined) {
    res.status(400).send("idUsuario está undefined!");
  } else {


    perfilModel.cadastrar(idPerfilUsuario, idUsuario)
      .then((resultado) => {
        res.status(201).json(resultado);
      }
      ).catch((erro) => {
        console.log(erro);
        console.log(
          "\nHouve um erro ao realizar o cadastro! Erro: ",
          erro.sqlMessage
        );
        res.status(500).json(erro.sqlMessage);
      });
  }
}

module.exports = {
  buscarUsuarioPorPerfil,
  cadastrar
}