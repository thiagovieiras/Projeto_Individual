var express = require("express");
var router = express.Router();

var acessoController = require("../controllers/acessoController");

router.post("/buscarTop10", function (req, res) {
    acessoController.buscarTop10(req, res);
})

router.post("/buscarArtistas", function (req, res) {
    acessoController.buscarArtistas(req, res);
})

router.post("/top10", function(req, res) {
    acessoController.Top10(req, res);
})

router.post("/selecionarPerfil", function(req, res) {
    acessoController.selecionarPerfil(req, res)
})


module.exports = router;