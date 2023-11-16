var lista_rock = [
    {
        id: '1',
        nome: 'Como Tudo Deve Ser',
        artista: 'Charlie Brown Jr',
        album: '../assets/imagens/charlie\ brown.png'
    },

    {
        id: '2',
        nome: 'Como Tudo Deve Ser',
        artista: 'Charlie Brown Jr',
        album: '../assets/imagens/charlie\ brown.png'
    },
    {
        id: '3',
        nome: 'Como Tudo Deve Ser',
        artista: 'Charlie Brown Jr',
        album: '../assets/imagens/charlie\ brown.png'
    },
    {
        id: '4',
        nome: 'Como Tudo Deve Ser',
        artista: 'Charlie Brown Jr',
        album: '../assets/imagens/charlie\ brown.png'
    },
    {
        id: '5',
        nome: 'Como Tudo Deve Ser',
        artista: 'Charlie Brown Jr',
        album: '../assets/imagens/charlie\ brown.png'
    },
    {
        id: '6',
        nome: 'Como Tudo Deve Ser',
        artista: 'Charlie Brown Jr',
        album: '../assets/imagens/charlie\ brown.png'
    }
]


function clickAudio() {
    var audio = document.getElementById('audioPlayer');
    var playPauseButton = document.getElementById('playPauseButton')

    if (audio.paused) {
        audio.play();
        playPauseButton.classList.remove('bi-play-circle-fill');
        playPauseButton.classList.add('bi-pause-circle-fill');
    } else {
        audio.pause();
        playPauseButton.classList.remove('bi-pause-circle-fill');
        playPauseButton.classList.add('bi-play-circle-fill');
    }
}

function clickAudio() {
    var audio = document.getElementById('audioPlayer');
    var playPauseButton = document.getElementById('playPauseButton')

    if (audio.paused) {
        audio.play();
        playPauseButton.classList.remove('bi-play-circle-fill');
        playPauseButton.classList.add('bi-pause-circle-fill');
    } else {
        audio.pause();
        playPauseButton.classList.remove('bi-pause-circle-fill');
        playPauseButton.classList.add('bi-play-circle-fill');
    }
}