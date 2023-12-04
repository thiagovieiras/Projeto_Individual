var audioAtual = undefined;
var unPlay;
var audio = '';
var onda = '';
var play = '';
var botao = '';


function selecionar(musica) {

  audio = musica.querySelector('.audio-player');
  onda = document.getElementsByClassName('onda')[0];
  play = musica.querySelector('.bi');


  var h5 = musica.querySelector('h5')

  var nomeArtista = h5.children[0].innerHTML
  var nomeMusica = h5.children[1].innerHTML


// the peacocks feat. Stan Getz

  var capaSom = document.getElementById("capa");
  var bgImagem = musica.querySelector(".img").style.backgroundImage;
  var url = bgImagem.match(/url\("(.+)"\)/);
  capaSom.src = url[1];

  var nomeSom = document.getElementById("nomeSom");
  var nome = musica.querySelector("h5").innerHTML
  nomeSom.innerHTML = nome;

  var divViewer = document.querySelector('.view')
  

  botao = document.getElementById("play");
  
  if (audioAtual && audioAtual !== audio) {
    audioAtual.pause();
    audioAtual.currentTime = 0;
    unPlay.classList.remove('bi-pause-circle-fill');
    unPlay.classList.add('bi-play-circle-fill');
  }

  audioAtual = audio;
  unPlay = play

  if (divViewer) divViewer.style.display = 'flex';

  if (audio.paused) {
    audio.play();

    botao.classList.remove('bi-play-circle-fill');
    botao.classList.add('bi-pause-circle-fill');
    play.classList.remove('bi-play-circle-fill');
    play.classList.add('bi-pause-circle-fill');
    onda.classList.add('ativo2');

    fetch(`/acesso/selecionarPerfil`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nomeArtistaServer: nomeArtista,
        nomeMusicaServer: nomeMusica,
        idUser: sessionStorage.ID_USUARIO
      }),
    })
      .then(function (resposta) {
        console.log("resposta: ", resposta);

        if (resposta.ok) {
          console.log('Everthing OK')
          finalizarAguardar();
        } else {
          throw "Houve um erro ao tentar inserir a musica!";
        }
      })
      .catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
      });

    var AlturaDivAreaMusic = document.getElementById('areaMusic').clientHeight;
    var AlturaNomeSom = document.getElementById("nomeSom").clientHeight;
    if (AlturaNomeSom >= AlturaDivAreaMusic) nomeSom.classList.add('h4Ativo');
    else nomeSom.classList.remove('h4Ativo');

    var atualComeco = document.getElementById("atual_comeco");
    var atualFinal = document.getElementById("atual_final");
    var procura = document.getElementById('procura');
    var barra2 = document.getElementById('barra2');
    var ponto = document.getElementsByClassName('ponto')[0];

    audio.addEventListener('timeupdate', () => {
      var music_atual = audio.currentTime;
      var music_duracao = audio.duration;


      var min = Math.floor(music_atual / 60);
      var sec = Math.floor(music_atual % 60);
      if (sec < 10) sec = `0${sec}`;
      atualComeco.innerHTML = `${min}:${sec}`;


      var min1 = Math.floor(music_duracao / 60);
      var sec1 = Math.floor(music_duracao % 60);
      if (sec1 < 10) sec1 = `0${sec1}`;
      atualFinal.innerHTML = `${min1}:${sec1}`;


      var progressoBarra = parseInt((music_atual / music_duracao) * 100);
      procura.value = progressoBarra;
      var procuraBarra = procura.value;
      barra2.style.width = `${procuraBarra}%`;
      ponto.style.left = `${procuraBarra}%`;

      if (music_atual == music_duracao) {
        for (n in listaMusic) {
          var srcaudio = audio.getAttribute('src');
          if (srcaudio == listarMusic[n]) {
          var proximoAudioSrc = listarMusic[Number(n) + 1];
          audio.setAttribute('src', proximoAudioSrc);
          audio.play();
          break
          }
        }
      }
    })

    procura.addEventListener('change', ()=>{
      audio.currentTime = procura.value * audio.duration / 100
    })

    var vol_icon = document.getElementById('volIcon');
    var vol = document.getElementById("volume");
    var volbarra = document.getElementById("volBarra");
    var vol_ponto = document.getElementById("vol_ponto");

    vol.addEventListener('change', ()=> {
      if (vol.value == 0) {
        vol_icon.classList.remove('bi-volume-down');
        vol_icon.classList.add('bi-volume-off-fill');
      } else {
        vol_icon.classList.remove('bi-volume-off-fill');
        vol_icon.classList.add('bi-volume-down');
      }
      var vol_a = vol.value;
      volbarra.style.width = `${vol_a}%`
      vol_ponto.style.left = `${vol_a}%`
      audio.volume = vol_a/100;
    })

    return false;

  } else {
    audio.pause();

    botao.classList.remove('bi-pause-circle-fill');
    botao.classList.add('bi-play-circle-fill');
    play.classList.remove('bi-pause-circle-fill');
    play.classList.add('bi-play-circle-fill');
    onda.classList.remove('ativo2');
  }

}



window.onload = function() {
  obterDadosGrafico(); 
  listarMusicas();

  
  audio = document.querySelector('.audio-player');
  onda = document.getElementsByClassName('onda')[0];
  play = document.querySelector('.bi');
  botao = document.getElementById("play");

  botao.addEventListener('click', () => {
    if (audio.paused) {
      audio.play();

      botao.classList.remove('bi-play-circle-fill');
      botao.classList.add('bi-pause-circle-fill');
      play.classList.remove('bi-play-circle-fill');
      play.classList.add('bi-pause-circle-fill');
      onda.classList.add('ativo2');
    } else {
      audio.pause();

      botao.classList.remove('bi-pause-circle-fill');
      botao.classList.add('bi-play-circle-fill');
      play.classList.remove('bi-pause-circle-fill');
      play.classList.add('bi-play-circle-fill');
      onda.classList.remove('ativo2');
    }
  });
}

var listarMusic = []

function listarMusicas() {
  
  var musicas = document.querySelectorAll('.audio-player');
  
  for(var i = 0; i < musicas.length; i++) {
    listarMusic.push( musicas[i].getAttribute('src'));
  }
}

function obterDadosGrafico() {

  fetch(`/acesso/top10`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(function (resposta) {
      console.log("resposta: ", resposta);

      if (resposta.ok) {
        resposta.json().then(function (resposta) {
          console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
          resposta;

          plotarGrafico(resposta);

        });
      } else {
        throw "Nenhum dado encontrado ou erro na API";
      }
    })
    .catch(function (error) {
      console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });

}


function plotarGrafico(resposta) {

  var listaMusicas = document.querySelectorAll(".musica");

  console.log(listaMusicas[i])

  for (var i = 0; i < resposta.length; i++) {

    var registro = resposta[i];

    listaMusicas[i].querySelector('.subtitulo').innerHTML = (registro.NomeArtista);
    listaMusicas[i].querySelector('#titulo').innerHTML = (registro.NomeMúsica);
    listaMusicas[i].querySelector('.detalhe span').innerHTML = (registro.Repetições);
  }

}
