var database = require("../database/config")

function autenticar(email, senha) {
    var instrucao = `
        SELECT id, nome, email, genero FROM cadastro_usuarios WHERE email = '${email}' AND senha = '${senha}';
    `;
    
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


// Coloque os mesmos parâmetros aqui. Vá para a var instrucao
function cadastrar(nome, email, senha, genero) {
    var instrucao = `
        INSERT INTO cadastro_usuarios (nome, email, senha, genero) VALUES ('${nome}', '${email}', '${senha}', '${genero}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao).then(result => {
        const idUsuario = result.insertId;
        return inserirPefil(idUsuario)
    })
}

function inserirPefil(idUsuario) {
    var query = `
        insert into PerfilUsuario(fkUsuario) values (${idUsuario});
    `
    return database.executar(query)
}

module.exports = {
    autenticar,
    cadastrar
};