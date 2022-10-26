//Declaramos las constantes de los elementos del formulario
const NOMBRE = document.getElementById('name');
const EMAIL = document.getElementById('email');
const SERVICIO = document.getElementById('servicio');
const CONSULTA = document.getElementById('consulta');
const FORM = document.querySelector('form');
//Creamos una función para validar el nombre a través de una expresión regular
function validarNombre() {
    //creamos la expresión regular para validar el nombre
    let regExpNombre = /^([A-ZÁÉÍÓÚ a-zñáéíóú]+[\s]?)+$/;
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
    myHeaders.append("apikey", "JmHeLX8WrHVC3YrrOcEk45QK0taKSR2m");
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
    /*
        La api en caso de consumir las peticiones gratis nos devuelve un objeto con la propiedad message,
        por lo que preguntamos si el objeto respuesta donde almacenamos los datos que devuelve posee la 
        propiedad message. En caso de que sea verdadero, utilizamos el respaldo que es la expresión regular
        que creamos
    */
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
//creamos una función para validar que el input consulta tenga más de 20 caracteres
function validarConsulta(){
    if(CONSULTA.value.length >= 20){
        return true;
    }else{
        return false;
    }
}
//creamos la función que va a manejar el evento envio del formulario
function enviarDatos(e){
    //prevenimos el evento por default para manejar todo nosotros
    e.preventDefault();
    //primero consultamos la validez del input nombre
    if(validarNombre()){
        //En caso de que estemos mostrando un error anterior vaciamos el span
        NOMBRE.nextElementSibling.innerHTML = "";
        //luego preguntamos la validez del campo email
        if(validarEmail()){
            //En caso de que estemos mostrando un error anterior vaciamos el span
            EMAIL.nextElementSibling.innerHTML = "";
            //por último validamos la consulta
            if(validarConsulta()){
                //En caso de que estemos mostrando un error anterior vaciamos el span
               CONSULTA.nextElementSibling.innerHTML = "";
               //creamos un objeto que englobe todos los datos para enviarlos
               form = {
                    name: NOMBRE.value,
                    email: EMAIL.value,
                    servicio: SERVICIO.value,
                    consulta: CONSULTA.value
                }
                //creamos los parametros adicionales que llevará nuestra peticion
                let parametros = {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(form)
                }
                //realizamos la conexión con la api de mail, mandando los datos y los parametros.
                fetch('./mail-api/enviar.php', parametros)
                    .then(response => response.json())
                    .then(data => console.log(data));
                //limpiamos el formulario
                FORM.reset();
                //avisamos al final del formulario que la consulta fue enviada con éxito
                FORM.lastElementChild.innerHTML = `<i class="fa-solid fa-circle-check"></i> El formulario se ha enviado con éxito`;
                //Dejamos el mensaje uno segundos y volvemos a cero el contenido del elemento
                setTimeout(function(){
                    FORM.lastElementChild.innerHTML = ""
                }, 2000);
            }else{
                //Alertamos el error en un span en caso de que la consulta no tenga el formato necesario y volvemos a poner el foco en el input
                CONSULTA.nextElementSibling.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> La consulta debe tener al menos 20 caracteres`;
                CONSULTA.focus();
            }
        }else{
            //Alertamos el error en un span en caso de que el email no tenga el formato necesario y volvemos a poner el foco en el input
            EMAIL.nextElementSibling.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> El email debe existir y tener un formato válido`;
            EMAIL.focus();
        }
    }else{
        //Alertamos el error en un span en caso de que el nombre no tenga el formato necesario y volvemos a poner el foco en el input
        NOMBRE.nextElementSibling.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> El nombre debe contener solo caracteres alfabéticos y al menos tres letras`;
        NOMBRE.focus();
    }
}
//Vinculamos el evento submit con la función enviarDatos
FORM.addEventListener('submit', enviarDatos);


