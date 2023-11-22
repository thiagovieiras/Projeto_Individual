var express = require("express");
var router = express.Router();

var perfilController = require("../controllers/perfilController");

router.get("/:usuarioId", function (req, res) {
  perfilController.buscarUsuarioPorPerfil(req, res);
});

router.post("/cadastrar", function (req, res) {
  perfilController.cadastrar(req, res);
})

module.exports = router;