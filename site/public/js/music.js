var audioAtual = undefined;
var unPlay;

function selecionar(musica) {

    
    var audio = musica.querySelector('.audio-player');
    var onda = document.getElementsByClassName('onda')[0];
    var play = musica.querySelector('.bi');
    

    var h5 = musica.querySelector('h5')

    var nomeArtista = h5.children[0]
    var nomeMusica = h5.children[1]

    console.log(sessionStorage.ID_USUARIO)



    var capaSom = document.getElementById("capa");
    var bgImagem =  musica.querySelector(".img").style.backgroundImage;
    var url = bgImagem.match(/url\("(.+)"\)/);
    capaSom.src = url[1];
    
    var nomeSom = document.getElementById("nomeSom");
    var nome = musica.querySelector("h5").innerHTML
    nomeSom.innerHTML = nome;
    
    var divViewer = document.querySelector('.view')

    var botao = document.getElementById("play");

    if (divViewer) divViewer.style.display = 'flex';


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

    if (audioAtual && audioAtual !== audio) {
        audioAtual.pause();
        audioAtual.currentTime = 0;
        unPlay.classList.remove('bi-pause-circle-fill');
        unPlay.classList.add('bi-play-circle-fill');
    }

    audioAtual = audio;
    unPlay = play

    if (audio.paused) {
        audio.play();
    
        botao.classList.remove('bi-play-circle-fill');
        botao.classList.add('bi-pause-circle-fill');
        play.classList.remove('bi-play-circle-fill');
        play.classList.add('bi-pause-circle-fill');
        onda.classList.add('ativo2');

        inserirMusica(nomeArtista, nomeMusica);


    } else {
        audio.pause();
        
        botao.classList.remove('bi-pause-circle-fill');
        botao.classList.add('bi-play-circle-fill');
        play.classList.remove('bi-pause-circle-fill');
        play.classList.add('bi-play-circle-fill');
        onda.classList.remove('ativo2');
    }


    var AlturaDivAreaMusic = document.getElementById('areaMusic').clientHeight;
    var AlturaNomeSom = document.getElementById("nomeSom").clientHeight; 
        if (AlturaNomeSom >= AlturaDivAreaMusic) nomeSom.classList.add('h4Ativo');
        else nomeSom.classList.remove('h4Ativo'); 

        var atualComeco = document.getElementById("atual_comeco");
        var atualFinal = document.getElementById("atual_final");
        var procura = document.getElementById('procura');
        var barra2 = document.getElementById('barra2');
        var ponto = document.getElementsByClassName('ponto')[0];
        
        setInterval(()=> {
            if (!audio.paused) {
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
                
                var progressoBarra = parseInt((audio.currentTime / audio.duration) * 100);
                procura.value = progressoBarra;
                var procuraBarra = procura.value;
                barra2.style.width = `${procuraBarra}%`;
                ponto.style.left = `${procuraBarra}%`;
            }
        }, 500)

}

function inserirMusica(nomeArtista, nomeMusica) {

    if (
        nomeArtista == "" ||
        nomeMusica == ""
    ) {
      alert("(Mensagem de erro para todos os campos em branco)");

      finalizarAguardar();
      return false;
    } else {
      setInterval(sumirMensagem, 5000);
    }

    // Enviando o valor da nova input
    fetch("/cadastrar/cadastrar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // crie um atributo que recebe o valor recuperado aqui
        // Agora vá para o arquivo routes/usuario.js
        nomeServer: nomeVar,
        emailServer: emailVar,
        senhaServer: senhaVar,
        generoServer: generoVar
      }),
    })
      .then(function (resposta) {
        console.log("resposta: ", resposta);

        if (resposta.ok) {
          cardErro.style.display = "block";

          mensagem_erro.innerHTML =
            "Cadastro realizado com sucesso! Redirecionando para tela de Login...";

          setTimeout(() => {
            window.location = "login.html";
          }, "2000");

          limparFormulario();
          finalizarAguardar();
        } else {
          throw "Houve um erro ao tentar realizar o cadastro!";
        }
      })
      .catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
        finalizarAguardar();
      });

    return false;
  }


