const NOMBRE = document.getElementById('name');
const EMAIL = document.getElementById('email');
const SERVICIO = document.getElementById('servicio');
const CONSULTA = document.getElementById('consulta');
const FORM = document.querySelector('form');

function validarNombre() {
    let regExpNombre = new RegExp("[A-Za-z\s]");
    if (regExpNombre.test(NOMBRE.value) && NOMBRE.value.length >= 5) {
        return true;
    } else {
        return false;
    }
}
NOMBRE.addEventListener('keyup', validarNombre);
function validarEmail(){
    /*let regExpEmail = new RegExp("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$");
    if(regExpEmail.test(EMAIL.value)){
        console.log(true);
        return true;
    }else{
        console.log(true);
        return false;
    }*/
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

function enviarDatos(e){
    e.preventDefault()
    let form = {
        name: NOMBRE.value,
        email: EMAIL.value,
        servicio: SERVICIO.value,
        consulta: CONSULTA.value
    }
    console.table(form);
    FORM.reset();
}

FORM.addEventListener('submit', enviarDatos);


