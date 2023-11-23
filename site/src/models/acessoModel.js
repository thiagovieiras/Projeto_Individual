var database = require("../database/config")




function acesso(idCliente, idMusica) {
    // AQUI ANTES DE REGISTRAR O ACESSO PRECISO RECONHECER A MUSICA E O USUARIO
    var instrucao = `
        INSERT INTO acesso_às_musicas (fkUsuario, fkMusica) VALUES (${idCliente}, ${idMusica});
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function buscarHistoricoEmTempoReal(idUsuario) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select top 1
        dht11_temperatura as temperatura, 
        dht11_umidade as umidade,  
                        CONVERT(varchar, momento, 108) as momento_grafico, 
                        fk_aquario 
                        from acesso_às_musicas where fkUsuario = ${idUsuario} 
                    order by id desc`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select 
        nome as NomeMúsica, 
            data_acesso as Data,
                from acesso_às_musicas
                    JOIN musicas ON fkMusica = idMusica
                        where fkUsuario = ${idUsuario} 
                            order by idAcesso desc limit 10`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = {
    acesso,
    buscarHistoricoEmTempoReal
};