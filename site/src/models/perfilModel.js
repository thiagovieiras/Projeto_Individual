var database = require("../database/config");

function buscarUsuarioPorPerfil(fkUsuario) {

  instrucaoSql = `select * from PerfilUsuario a where fkUsuario = ${fkUsuario}`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function cadastrar(idPerfilUsuario, fkUsuario) {
  
  instrucaoSql = `insert into PerfilUsuario values (${idPerfilUsuario}, ${fkUsuario})`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}


module.exports = {
  buscarUsuarioPorPerfil,
  cadastrar
}
