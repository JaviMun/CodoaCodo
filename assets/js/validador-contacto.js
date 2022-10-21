const NOMBRE = document.getElementById('name');
const EMAIL = document.getElementById('email');
const SERVICIO = document.getElementById('servicio');
const CONSULTA = document.getElementById('consulta');
const FORM = document.querySelector('form');

function validarNombre() {
    let regExpNombre = /^([A-ZÁÉÍÓÚ][a-zñáéíóú]+[\s]?)+$/;
    if (regExpNombre.test(NOMBRE.value) && NOMBRE.value.length >= 3) {
        return true;
    } else {
        return false;
    }
}

function validarEmail(){
    let regExpEmail = new RegExp("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$");
    if(regExpEmail.test(EMAIL.value)){
        return true;
    }else{
        return false;
    }
    /*API PARA LA VALIDACIÓN DE DIRECCIONES DE EMAIL
    var myHeaders = new Headers();
    myHeaders.append("apikey", "QwImUtMQjTDsYbAnznSCcphpuasVY0YT");

    var requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: myHeaders
    };
    //FALTA AGREGAR LA VARIABLE MAIL PARA QUE FUNCIONE
    fetch("https://api.apilayer.com/email_verification/check?email=email", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    */
}
function validarConsulta(){
    if(CONSULTA.value.length >= 20){
        return true;
    }else{
        return false;
    }
}
function enviarDatos(e){
    e.preventDefault();
    let form = {
        message: "algo salio mal!"
    }
    if(validarNombre()){
        console.log("el nombre esta bien, como el nene");
        if(validarEmail()){
            console.log("el email esta bien, como el nene");
            if(validarConsulta()){
                console.log("la consulta esta bien, como el nene");
                form = {
                    name: NOMBRE.value,
                    email: EMAIL.value,
                    servicio: SERVICIO.value,
                    consulta: CONSULTA.value
                }
                FORM.reset();
            }else{
                console.log("la consulta no esta bien");
                CONSULTA.focus();
            }
        }else{
            console.log("el email no esta bien");
            EMAIL.focus();
        }
    }else{
        console.log("el nombre no esta bien");
        NOMBRE.focus();
    }
    console.table(form);
    //FORM.reset();
}

FORM.addEventListener('submit', enviarDatos);


