
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

    setTimeout(() => atualizarGraficoTop(data, nome_musica, Grafico))
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

    setTimeout(() => atualizarGraficoArt(data, nome_artista, Artista))
}

function atualizarGraficoTop(data, nome_musica, Grafico) {


    fetch(`/acesso/buscarTop10`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            idUser: sessionStorage.ID_USUARIO
        }),
    }).then(function (response) {
        if (response.ok) {
            response.json().then(function (novoRegistro) {

                console.log(`Dados recebidos: ${JSON.stringify(novoRegistro)}`);
                console.log(`Dados atuais do gráfico:`);
                console.log(data, nome_musica);



                if (novoRegistro[0].NomeMúsica == nome_musica[nome_musica.length - 1]) {
                    console.log("Como não há dados novos para captura, o gráfico não atualizará.")
                } else {
                    // tirando e colocando valores no gráfico
                    nome_musica.shift(); // apagar o primeiro
                    nome_musica.push(novoRegistro[0].NomeMúsica); // incluir um novo momento

                    data.shift();  // apagar o primeiro de umidade
                    data.push(novoRegistro[0].Repetições); // incluir uma nova medida de umidade

                    Grafico.update();
                }

                // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
                proximaAtualizacao = setTimeout(() => atualizarGraficoTop(data, nome_musica, Grafico), 2000);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
            // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
            proximaAtualizacao = setTimeout(() => atualizarGraficoTop(data, nome_musica, Grafico), 2000);
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });


}

function atualizarGraficoArt(data, nome_artista, Artista) {


    fetch(`/acesso/buscarArtistas`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            idUser: sessionStorage.ID_USUARIO
        }),
    }).then(function (response) {
        if (response.ok) {
            response.json().then(function (novoRegistro) {

                console.log(`Dados recebidos: ${JSON.stringify(novoRegistro)}`);
                console.log(`Dados atuais do gráfico:`);
                console.log(data, nome_artista);



                if (novoRegistro[0].NomeArtista == nome_artista[nome_artista.length - 1]) {
                    console.log("Como não há dados novos para captura, o gráfico não atualizará.")
                } else {
                    // tirando e colocando valores no gráfico
                    nome_artista.shift(); // apagar o primeiro
                    nome_artista.push(novoRegistro[0].NomeArtista); // incluir um novo momento

                    data.shift();  // apagar o primeiro de umidade
                    data.push(novoRegistro[0].TopArtistas); // incluir uma nova medida de umidade

                    Artista.update();
                }

                // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
                proximaAtualizacao = setTimeout(() => atualizarGraficoArt(data, nome_artista, Artista), 2000);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
            // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
            proximaAtualizacao = setTimeout(() => atualizarGraficoArt(data, nome_artista, Artista), 2000);
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });


}