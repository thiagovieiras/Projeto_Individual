var database = require("../database/config")

function autenticar(email, senha) {
    var instrucao = `
        SELECT id, nome FROM cadastro_usuarios WHERE email = '${email}' AND senha = '${senha}';
    `;
    
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


// Coloque os mesmos parâmetros aqui. Vá para a var instrucao
function cadastrar(nome, email, senha, genero) {
    var instrucao = `
        INSERT INTO cadastro_usuarios (nome, email, senha) VALUES ('${nome}', '${email}', '${senha}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao).then(result => {
        autenticar(email, senha).then(function (id){
            return inserirPerfil(id[0].id, genero)

        })
        // const idUsuario = result.insertId;
        // console.log(`chegou aqui ${idUsuario}, ${genero}`)
    })
}

function inserirPerfil(idUsuario, genero) {
    var query = `
        insert into PerfilUsuario(fkUsuario, genero) values (${idUsuario}, '${genero}');
    `;
    console.log(`foi inserido o perfil(${query})`)
    return database.executar(query)
}

module.exports = {
    autenticar,
    cadastrar
};