var database = require("../database/config");

function buscarUltimasCinco(idUsuario, cincoEscutadas) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select top ${cincoEscutadas}
        nome as NomeMúsica, 
            from musicas
                where fkUsuario = ${idUsuario}
                    order by idMusica desc;`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select 
        nome as NomeMúsica, count(nome) as Repetições
            from musicas
                where fkUsuario = ${idUsuario}
                    group by nome
                        order by Repetições desc limit ${cincoEscutadas};`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}



module.exports = {
    buscarUltimasCinco,
}
