const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.textContent = '¡Formulario completado!';
    document.body.appendChild(successMessage);
function validacionInput(event){
    event.preventDefault();
    let validaciones = true;

    const error1 = document.getElementById('NombreError');
    const error2 = document.getElementById('NumeroError');
    const error3 = document.getElementById('EmailError');
    const error4 = document.getElementById('FechaError');
    const error5 = document.getElementById('GeneroError');
    const error6 = document.getElementById('MotivoError');

    error1.textContent = ' ';
    error2.textContent = ' ';
    error3.textContent = ' ';
    error4.textContent = ' ';
    error5.textContent = ' ';
    error6.textContent = ' ';

//Validacion nombre
    const nombre = document.getElementById('Nombre');
    const isNumbre = /\d/.test(nombre.value);
    if(nombre.value.trim() === ''){
        error1.textContent = 'Digite su nombre completo.'
        validaciones = false;
    }
    if(isNumbre){
        error1.textContent = 'Digite correctamente su nombre.'
        validaciones = false;
        nombre.value = ''
    }

//Validacion telefono
    const telefono = document.getElementById('Numero')
    if(telefono.value.trim() === ''){
        error2.textContent = 'Digite su numero teléfonico.'
        validaciones = false;
    }

//Validacion email
const email = document.getElementById('Email');
const emailRegimen = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

if (email.value.trim() === '') {
    error3.textContent = 'Digite un email.';
    validaciones = false;
} else if (!emailRegimen.test(email.value)) {
    error3.textContent = 'Digite correctamente su email. Debe contener solo caracteres válidos antes del @ y terminar en gmail.com';
    validaciones = false;
    email.value = '';
}

// Validar Fecha
const fecha = document.getElementById('date');
if (fecha.value.trim() === '') {
    error4.textContent = 'La fecha de nacimiento no puede estar vacía.';
    validaciones = false;
}

//Validar sexo
    const sexo = document.querySelector('input[name="sexo"]:checked');
    if(!sexo){
        error5.textContent = 'Seleccione su sexo.'
    }
//Validar motivo
const motivo = document.getElementById('Motivo');
if (motivo.value.trim() === '') {
    error6.textContent = 'Escriba algo en el motivo de consulta. Si no desea escribir su motivo escriba n/a';
    validaciones = false;
}

    if(validaciones){
        successMessage.classList.add('show');
                    setTimeout(() => {
                        successMessage.classList.remove('show');
                    }, 1500); 
        nombre.value = ''
        email.value = ''
        telefono.value = ''
        sexo.checked = false;
        fecha.value = ''
        motivo.value = ''
    }


}

document.getElementById('menuButton').addEventListener('click', function () {
    document.getElementById('Menu').classList.toggle('open');
});

document.getElementById('closeButton').addEventListener('click', function () {
    document.getElementById('Menu').classList.remove('open');
});
function initializeMap(lat, lng) {
    var map = L.map('map').setView([lat, lng], 19);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        minZoom: 1,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    L.marker([lat, lng]).addTo(map)
        .bindPopup('We are here')
        .openPopup();
}

const latitude = 9.9385886;
const longitude = -84.1058818;

initializeMap(latitude, longitude);