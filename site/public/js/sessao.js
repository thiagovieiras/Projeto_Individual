const { query } = require("mssql");

// sessão
function validarSessao() {
    var email = sessionStorage.EMAIL_USUARIO;
    var nome = sessionStorage.NOME_USUARIO;

    var h4_cpf = document.getElementById("h4_cpf")
    var b_usuario = document.getElementById("b_usuario");

    if (email != null && nome != null) {
        b_usuario.innerHTML = nome;
        h4_cpf.innerHTML = cpf;
    } else {
        window.location = "../login.html";
    }
}

function limparSessao() {
    sessionStorage.clear();
    window.location = "../login.html";
}

// carregamento (loading)

function finalizarAguardar(texto) {

    var divErrosLogin = document.getElementById("div_erros_login");
    if (texto) {
        divErrosLogin.style.display = "flex";
        divErrosLogin.innerHTML = texto;
    }
}


// function curtir() {
//     var coracao = document.getElementById('coracao');
//     var listamusicas = document.querySelector('.audio-player');
    
    

//     for (c in listamusicas) {
//         if (c.src != paused) {
//             if (coracao.classList == 'bi-heart') {
//                 coracao.classList.remove('bi-heart');
//                 coracao.classList.add('bi-heart-fill');
//                 funcaoCurtir();
//             } else {
//                 coracao.classList.remove('bi-heart-fill');
//                 coracao.classList.add('bi-heart');
//                 funcaoDescurtir();
//             }
//         }
//         c++
//     }
// }
