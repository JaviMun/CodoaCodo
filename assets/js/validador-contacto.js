//Declaramos las constantes de los elementos del formulario
const NOMBRE = document.getElementById('name');
const EMAIL = document.getElementById('email');
const SERVICIO = document.getElementById('servicio');
const CONSULTA = document.getElementById('consulta');
const FORM = document.querySelector('form');
//Creamos una función para validar el nombre a través de una expresión regular
function validarNombre() {
    //creamos la expresión regular para validar el nombre
    let regExpNombre = /^([A-ZÁÉÍÓÚ][a-zñáéíóú]+[\s]?)+$/;
    //validamos si el valor del input coincide con el formato y si consta de mas de tres caracteres
    if (regExpNombre.test(NOMBRE.value) && NOMBRE.value.length >= 3) {
        return true;
    } else {
        return false;
    }
}
/*Creamos una llamada a la api apelando al evento onchange para tener una validación previa*/
let respuesta;
let codigoRespuesta;
function validarEmailAPI(){
    //creamos los headers que llevara la llamada a la api
    let myHeaders = new Headers();
    myHeaders.append("apikey", "QwImUtMQjTDsYbAnznSCcphpuasVY0YT");
    //creamos las opciones que llevará el llamado a la api
    let requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: myHeaders
    };
    //creamos la cadena de texto que sera la url del endpoint de la api
    let urlFetch = "https://api.apilayer.com/email_verification/check?email=" + EMAIL.value;
    //hacemos un fetch llamando a la api
    fetch(urlFetch, requestOptions)
        .then(response => response.json())
        .then((result) => {
            respuesta = result
        })
        .catch(error => console.log('error', error));
}
EMAIL.addEventListener("change", validarEmailAPI);
/*Creamos una función para validar el email, la cual consume una api que realiza la validación por nosotros.
En caso de que falle la solicitud se creo de respaldo una expresion regular para comprobar el formato del input*/ 
function validarEmail(){
    //creamos la expresión regular de respaldo
    let regExpEmail = new RegExp("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$");
    if(respuesta.hasOwnProperty('message')){
        if(regExpEmail.test(EMAIL.value)){
            return true
        }else{
            return false
        }
    }else{
        if(respuesta.format_valid){
            return true
        }else{
            return false
        }
    }
}
//creamos una función para validar que el input consulta tenga mas de 20 caracteres
function validarConsulta(){
    if(CONSULTA.value.length >= 20){
        return true;
    }else{
        return false;
    }
}
//creamos la función que va a manejar el evento envio del formulario
function enviarDatos(e){
    e.preventDefault();
    let form = {
        message: "algo salio mal!"
    }
    if(validarNombre()){
        if(validarEmail()){
            if(validarConsulta()){
                //creamos un objeto que englobe todos los datos para enviarlos
                form = {
                    name: NOMBRE.value,
                    email: EMAIL.value,
                    servicio: SERVICIO.value,
                    consulta: CONSULTA.value
                }
                //limpiamos el formulario
                FORM.reset();
            }else{
                CONSULTA.focus();
            }
        }else{
            EMAIL.focus();
        }
    }else{
        NOMBRE.focus();
    }
}
//Vinculamos el evento submit con la función enviarDatos
FORM.addEventListener('submit', enviarDatos);


