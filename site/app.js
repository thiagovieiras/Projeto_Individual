process.env.AMBIENTE_PROCESSO = "desenvolvimento";
// process.env.AMBIENTE_PROCESSO = "producao";

var express = require("express");
var cors = require("cors");
var path = require("path");
var PORTA = process.env.AMBIENTE_PROCESSO == "desenvolvimento" ? 3333 : 8080;

var app = express();

var acessoRouter = require("./src/routes/acesso")


var indexRouter = require("./src/routes/index");
var cadastroRouter = require("./src/routes/cadastrar");
var graficoRouter = require("./src/routes/grafico");
var perfilRouter = require("./src/routes/perfil");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());

app.use("/", indexRouter);
app.use("/cadastrar", cadastroRouter);
app.use("/grafico", graficoRouter);
app.use("/perfil", perfilRouter);
app.use("/acesso", acessoRouter);

app.listen(PORTA, function () {
    console.log(`Servidor do seu site já está rodando! Acesse o caminho a seguir para visualizar: http://localhost:${PORTA} \n
    Você está rodando sua aplicação em Ambiente de ${process.env.AMBIENTE_PROCESSO} \n
    \t\tSe "desenvolvimento", você está se conectando ao banco LOCAL (MySQL Workbench). \n`);
});
