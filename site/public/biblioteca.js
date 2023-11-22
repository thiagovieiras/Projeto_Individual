sessionStorage.ACESSO = JSON.stringify(json.acesso)

function obterdados(idUsuario) {
  fetch(`/acesso/tempo-real/${idUsuario}`)
      .then(resposta => {
          if (resposta.status == 200) {
              resposta.json().then(resposta => {

                  console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

                  alertar(resposta, idUsuario);
              });
          } else {
              console.error(`Nenhum dado encontrado para o id ${idUsuario} ou erro na API`);
          }
      })
      .catch(function (error) {
          console.error(`Erro na obtenção dos dados do Usuario p/ gráfico: ${error.message}`);
      });

}

function atualizacaoPeriodica() {
  JSON.parse(sessionStorage.ACESSO).forEach(item => {
      obterdados(item.id)
  });
  setTimeout(atualizacaoPeriodica, 5000);
}