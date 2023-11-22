var express = require("express");
var router = express.Router();

var graficoController = require("../controllers/graficoController");

router.get("/ultimas/:idUsuario", function (req, res) {
    graficoController.buscarUltimasMedidas(req, res);
});

module.exports = router;