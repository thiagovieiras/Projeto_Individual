const { parse } = require("path");
var database = require("../database/config")

function selecionarPerfil(idUsuario) {
    
    var instrucao = `
        SELECT idPerfilUsuario, fkUsuario from PerfilUsuario where fkUsuario = ${idUsuario};
    `
    return database.executar(instrucao)
}


function inserirMusica(fkUsuario, idPerfilUsuario, nomeArtista, nomeMusica) {
    var instrucao = `
        INSERT INTO musicas (fkPerfilUsuario, fkUsuario, nome, artista) VALUES (${idPerfilUsuario}, ${fkUsuario}, "${nomeMusica}", "${nomeArtista}");
    `;
    console.log("Executando função sql: \n" + instrucao);
    return database.executar(instrucao).then(
        buscarTop10(idPerfilUsuario),
        historico(idPerfilUsuario)
    );
}


function buscarTop10(fkPerfil) {

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
            count(nome) as Repetições
                from musicas
                    where fkPerfilUsuario = ${fkPerfil}
                        group by nome
                            order by Repetições desc limit 10;`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarArtistas(fkPerfil) {

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
            artista as NomeArtista,
                count(artista) as TopArtistas
                    from musicas
                        where fkPerfilUsuario = ${fkPerfil}
                            group by artista
                                order by TopArtistas desc limit 10;`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function Top10() {

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
            artista as NomeArtista,
                count(nome) as Repetições
                    from musicas
                        group by nome, artista
                            order by Repetições desc limit 10;`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function historico(fkPerfil) {

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
            max(artista) as NomeArtista,
                count(nome) as Repetições
                    from musicas
                        group by nome
                            order by Repetições limit 10;`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    // console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = {
    buscarTop10,
    inserirMusica,
    selecionarPerfil,
    buscarArtistas,
    Top10
};



// .then(result => {
//     return selecionarPerfil();
// })
// .then(id => {
//     console.log(id, genero);
//     return inserirMusica(id, genero);
// })