
let proximaAtualizacao;

window.onload = () => {
    obterDadosGraficoTop();
    obterDadosGraficoArt();
    alterarTitulo();
}

function alterarTitulo() {

    // var idUsuario = sessionStorage.ID_USUARIO;

    var nomeUsuario = document.getElementById(`nomeUsuario`)
    nomeUsuario.innerHTML = sessionStorage.NOME_USUARIO
}


function obterDadosGraficoTop() {

    if (proximaAtualizacao != undefined) {
        clearTimeout(proximaAtualizacao);
    }

    fetch(`/acesso/buscarTop10`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            idUser: sessionStorage.ID_USUARIO
        }),
    })
        .then(function (resposta) {
            console.log("resposta: ", resposta);

            if (resposta.ok) {
                resposta.json().then(function (resposta) {
                    console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                    resposta.reverse();

                    plotarGraficoTop(resposta);
                });
            } else {
                throw "Nenhum dado encontrado ou erro na API";
            }
        })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });

}

function obterDadosGraficoArt() {

    if (proximaAtualizacao != undefined) {
        clearTimeout(proximaAtualizacao);
    }

    fetch(`/acesso/buscarArtistas`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            idUser: sessionStorage.ID_USUARIO
        }),
    })
        .then(function (resposta) {
            console.log("resposta: ", resposta);

            if (resposta.ok) {
                resposta.json().then(function (resposta) {
                    console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                    resposta.reverse();

                    plotarGraficoArt(resposta);
                });
            } else {
                throw "Nenhum dado encontrado ou erro na API";
            }
        })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });

}


function plotarGraficoTop(resposta) {

    console.log('iniciando plotagem do grafico...')

    var nome_musica = []

    var data = []


    for (i = 0; i < resposta.length; i++) {
        var registro = resposta[i];
        nome_musica.push(registro.NomeMúsica);
        data.push(registro.Repetições);
    }

    let Grafico = new Chart(
        document.getElementById(`grafico`), {
        type: 'bar',
        data: {
            labels: nome_musica,
            datasets: [{
                label: 'Músicas mais acessadas',
                data: data,
                borderWidth: 1,
                backgroundColor: '#ff1717b2',
                borderColor: '#ffffff'
            }]
        },
        options: {
            scales: {
                y: {
                    ticks: {color: 'white'}
                },
                x: {
                    ticks: {color: 'white'}
                }
            },
            plugins: {
                legend: {
                    labels: {color: 'white'}
                }
            }
        }
    });
}


function plotarGraficoArt(resposta) {

    console.log('iniciando plotagem do grafico...')

    var nome_artista = []

    var data = []


    for (i = 0; i < resposta.length; i++) {
        var registro = resposta[i];
        nome_artista.push(registro.NomeArtista);
        data.push(registro.TopArtistas);
    }

    let Artista = new Chart(
        document.getElementById(`artista`), {
        type: 'bar',
        data: {
            labels: nome_artista,
            datasets: [{
                label: 'Músicas mais acessadas',
                data: data,
                borderWidth: 1,
                backgroundColor: '#ff1717b2',
                borderColor: '#ffffff'
            }]
        },
        options: {
            scales: {
                y: {
                    ticks: {color: 'white'}
                },
                x: {
                    ticks: {color: 'white'}
                }
            },
            plugins: {
                legend: {
                    labels: {color: 'white'}
                }
            }
        }
    });
}

