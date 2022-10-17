const NOMBRE = document.getElementById('name');
const EMAIL = document.getElementById('email');
const SERVICIO = document.getElementById('servicio');
const CONSULTA = document.getElementById('consulta');
const FORM = document.querySelector('form');

function validarDatos(e){
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

FORM.addEventListener('submit', validarDatos);


