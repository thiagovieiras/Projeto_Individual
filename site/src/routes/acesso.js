var express = require("express");
var router = express.Router();

var acessoController = require("../controllers/acessoController");

router.post("/acesso", function (req, res) {
    acessoController.acesso(req, res);
})

router.get("/tempo-real/:idUsuario", function (req, res) {
    acessoController.buscarHistoricoEmTempoReal(req, res);
})

router.post("/selecionarMusica", function(req, res) {
    acessoController.selecionarMusica(req, res)
})


module.exports = router;