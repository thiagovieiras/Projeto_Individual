var date = new Date();

var dd = date.getDate();
var mm = date.getMonth()+1;
var aaaa = date.getFullYear();

aaaa = Number(aaaa) - 18;

function orientar() {
    input_data.placeholder = 'DD-MM-AAAA';
}


var mas = input_mas.checked = true
var fem = input_fem.checked = true

var radio_sexo = document.querySelectorAll("input[type=radio]")


    if (mas == true) input_fem.checked = false;
    else input_mas.checked = false
