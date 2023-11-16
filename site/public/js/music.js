const OQueÉIsso = new Audio('OQueÉIsso?')
// const music = new Audio('OQueÉIsso?')
// const music = new Audio('OQueÉIsso?')
// const music = new Audio('OQueÉIsso?')
// const music = new Audio('OQueÉIsso?')
// const music = new Audio('OQueÉIsso?')
// const music = new Audio('OQueÉIsso?')
// const music = new Audio('OQueÉIsso?')
// const music = new Audio('OQueÉIsso?')
// const music = new Audio('OQueÉIsso?')
// const music = new Audio('OQueÉIsso?')
// const music = new Audio('OQueÉIsso?')
// const music = new Audio('OQueÉIsso?')
// const music = new Audio('OQueÉIsso?')
// const music = new Audio('OQueÉIsso?')
// const music = new Audio('OQueÉIsso?')
// const music = new Audio('OQueÉIsso?')
// const music = new Audio('OQueÉIsso?')
// const music = new Audio('OQueÉIsso?')
// const music = new Audio('OQueÉIsso?')
// const music = new Audio('OQueÉIsso?')
// const music = new Audio('OQueÉIsso?')
// const music = new Audio('OQueÉIsso?')
// const music = new Audio('OQueÉIsso?')
// const music = new Audio('OQueÉIsso?')
// const music = new Audio('OQueÉIsso?')
// const music = new Audio('OQueÉIsso?')
// const music = new Audio('OQueÉIsso?')
// const music = new Audio('OQueÉIsso?')
// const music = new Audio('OQueÉIsso?')
// const music = new Audio('OQueÉIsso?')
// const music = new Audio('OQueÉIsso?')
// const music = new Audio('OQueÉIsso?')
// const music = new Audio('OQueÉIsso?')
// const music = new Audio('OQueÉIsso?')
// const music = new Audio('OQueÉIsso?')
// const music = new Audio('OQueÉIsso?')
// const music = new Audio('OQueÉIsso?')
// const music = new Audio('OQueÉIsso?')
// const music = new Audio('OQueÉIsso?')
// const music = new Audio('OQueÉIsso?')
// const music = new Audio('OQueÉIsso?')
// const music = new Audio('OQueÉIsso?')
// const music = new Audio('OQueÉIsso?')
// const music = new Audio('OQueÉIsso?')
// const music = new Audio('OQueÉIsso?')
// const music = new Audio('OQueÉIsso?')
// const music = new Audio('OQueÉIsso?')
// const music = new Audio('OQueÉIsso?')
// const music = new Audio('OQueÉIsso?')
// const music = new Audio('OQueÉIsso?')
// const music = new Audio('OQueÉIsso?')
// const music = new Audio('OQueÉIsso?')
// const music = new Audio('OQueÉIsso?')
// const music = new Audio('OQueÉIsso?')
// const music = new Audio('OQueÉIsso?')
// const music = new Audio('OQueÉIsso?')
// const music = new Audio('OQueÉIsso?')
// const music = new Audio('OQueÉIsso?')
// const music = new Audio('OQueÉIsso?')
// const music = new Audio('OQueÉIsso?')
// const music = new Audio('OQueÉIsso?')
// const music = new Audio('OQueÉIsso?')
// const music = new Audio('OQueÉIsso?')
// const music = new Audio('OQueÉIsso?')
// const music = new Audio('OQueÉIsso?')
// const music = new Audio('OQueÉIsso?')
// const music = new Audio('OQueÉIsso?')
// const music = new Audio('OQueÉIsso?')
// const music = new Audio('OQueÉIsso?')
// const music = new Audio('OQueÉIsso?')
// const music = new Audio('OQueÉIsso?')
// const music = new Audio('OQueÉIsso?')
// const music = new Audio('OQueÉIsso?')
// const music = new Audio('OQueÉIsso?')
// const music = new Audio('OQueÉIsso?')
// const music = new Audio('OQueÉIsso?')
// const music = new Audio('OQueÉIsso?')
// const music = new Audio('OQueÉIsso?')
// const music = new Audio('OQueÉIsso?')
// const music = new Audio('OQueÉIsso?')
// const music = new Audio('OQueÉIsso?')
// const music = new Audio('OQueÉIsso?')
// const music = new Audio('OQueÉIsso?')
// const music = new Audio('OQueÉIsso?')
// const music = new Audio('OQueÉIsso?')
// const music = new Audio('OQueÉIsso?')
// const music = new Audio('OQueÉIsso?')
// const music = new Audio('OQueÉIsso?')
// const music = new Audio('OQueÉIsso?')
// const music = new Audio('OQueÉIsso?')
// const music = new Audio('OQueÉIsso?')
// const music = new Audio('OQueÉIsso?')
// const music = new Audio('OQueÉIsso?')
// const music = new Audio('OQueÉIsso?')
// const music = new Audio('OQueÉIsso?')
// const music = new Audio('OQueÉIsso?')
// const music = new Audio('OQueÉIsso?')
// const music = new Audio('OQueÉIsso?')
// const music = new Audio('OQueÉIsso?')




function selecionar(musica) {
    
    var audio = musica.querySelector('.audio-player');
    var onda = document.getElementsByClassName('onda')[0];
    var play = musica.querySelector('.bi');
    
    var divStatus = document.querySelector(".status_musica");
    
    var capaSom = document.createElement("img");
    var bgImagem =  musica.querySelector(".img").style.backgroundImage;
    var url = bgImagem.match(/url\("(.+)"\)/);
    capaSom.src = url[1];
    var imgAnterior = divStatus.querySelector("img");
    
    var divCapa = document.createElement("div");
    divCapa.classList.add('capa_musica')
    var divCapaAnterior = divStatus.querySelector("div")

    var nomeSom = document.createElement("h4");
    nomeSom.innerHTML = musica.querySelector("h5").innerHTML;
    
    
    
    if (audio.paused) {
        audio.currentTime = 0
        audio.play();
        
        if (imgAnterior) {
            divStatus.removeChild(imgAnterior);
            divStatus.removeChild(divCapa);
        }
        divStatus.appendChild(capaSom);
        divStatus.appendChild(divCapa);
        divCapa.appendChild(nomeSom);
        
        play.classList.remove('bi-play-circle-fill');
        play.classList.add('bi-pause-circle-fill');
        onda.classList.add('ativo2');
    } else {
        audio.pause();
        divStatus.removeChild(imgAnterior);
        divStatus.removeChild(divCapa);
        play.classList.remove('bi-pause-circle-fill');
        play.classList.add('bi-play-circle-fill');
        onda.classList.remove('ativo2');
    }
    
}
