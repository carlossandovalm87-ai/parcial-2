const marcador = document.querySelector('#score');
const totalClics = document.querySelector('#clicks');
const valorClic = document.querySelector('#click-value');
const mensaje = document.querySelector('#message');
const botonGalleta = document.querySelector('#cookie-button');
const botonMejora = document.querySelector('#upgrade-button');
const botonHorno = document.querySelector('#auto-button');
const botonDoble = document.querySelector('#boost-button');
const estadoHorno = document.querySelector('#auto-status');
const estadoDoble = document.querySelector('#boost-status');

let galletas = 0;
let clics = 0;
let nivelClic = 0;
let segundosHorno = 0;
let segundosDoble = 0;
let temporizador = null;

function galletasPorClic() {
    return (nivelClic + 1) * (segundosDoble > 0 ? 2 : 1);
}

function actualizarPantalla() {
    marcador.textContent = Math.floor(galletas);
    totalClics.textContent = clics;
    valorClic.textContent = galletasPorClic();
    estadoHorno.textContent = segundosHorno > 0
        ? `Horno activo: ${segundosHorno} s restantes.`
        : 'Genera 1 galleta por segundo durante 10 segundos.';
    estadoDoble.textContent = segundosDoble > 0
        ? `Doble clic activo: ${segundosDoble} s restantes.`
        : 'Duplica las galletas por clic durante 10 segundos.';
}

function iniciarTemporizador() {
    if (temporizador !== null) return;
    temporizador = setInterval(() => {
        if (segundosHorno > 0) {
            galletas += 1;
            segundosHorno -= 1;
        }
        if (segundosDoble > 0) segundosDoble -= 1;
        actualizarPantalla();
        if (segundosHorno === 0 && segundosDoble === 0) {
            clearInterval(temporizador);
            temporizador = null;
        }
    }, 1000);
}

botonGalleta.addEventListener('click', () => {
    galletas += galletasPorClic();
    clics += 1;
    mensaje.textContent = '¡Galleta horneada!';
    actualizarPantalla();
});

botonMejora.addEventListener('click', () => {
    nivelClic += 1;
    mensaje.textContent = `Mejora gratis: ahora ganas ${nivelClic + 1} por clic.`;
    actualizarPantalla();
});

botonHorno.addEventListener('click', () => {
    segundosHorno = 10;
    mensaje.textContent = 'Horno automático activado.';
    actualizarPantalla();
    iniciarTemporizador();
});

botonDoble.addEventListener('click', () => {
    segundosDoble = 10;
    mensaje.textContent = 'Doble clic activado.';
    actualizarPantalla();
    iniciarTemporizador();
});

actualizarPantalla();
