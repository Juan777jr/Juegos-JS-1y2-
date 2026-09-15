const botonesColor = document.querySelectorAll(".colorSimon");
const rondaTexto = document.getElementById("rondaSimon");
const mensaje = document.getElementById("mensajeSimon");
const btnIniciar = document.getElementById("btnIniciarSimon");

let secuencia = [];
let secuenciaUsuario = [];
let bloqueado = true;

function generarPaso() {
  const nuevoColor = Math.floor(Math.random() * botonesColor.length);
  secuencia.push(nuevoColor);
}

function encenderBoton(indiceColor) {
  const boton = botonesColor[indiceColor];
  boton.classList.add("activo");
  setTimeout(() => {
    boton.classList.remove("activo");
  }, 400);
}

function reproducirSecuencia() {
  bloqueado = true;
  secuenciaUsuario = [];
  rondaTexto.textContent = secuencia.length;

  let indice = 0;

  const intervalo = setInterval(() => {
    encenderBoton(secuencia[indice]);
    indice++;

    if (indice === secuencia.length) {
      clearInterval(intervalo);
      setTimeout(() => {
        bloqueado = false;
      }, 500);
    }
  }, 700);
}

botonesColor.forEach((boton) => {
  boton.addEventListener("click", () => {
    if (bloqueado) return;

    const indiceColor = Number(boton.dataset.color);
    encenderBoton(indiceColor);
    secuenciaUsuario.push(indiceColor);

    const pasoActual = secuenciaUsuario.length - 1;

    if (secuenciaUsuario[pasoActual] !== secuencia[pasoActual]) {
      mensaje.textContent = `Te equivocaste. Llegaste a la ronda ${secuencia.length}.`;
      bloqueado = true;
      return;
    }

    if (secuenciaUsuario.length === secuencia.length) {
      mensaje.textContent = "Bien hecho. Preparando la siguiente ronda...";
      setTimeout(() => {
        mensaje.textContent = "";
        generarPaso();
        reproducirSecuencia();
      }, 900);
    }
  });
});

btnIniciar.addEventListener("click", () => {
  secuencia = [];
  secuenciaUsuario = [];
  mensaje.textContent = "";
  generarPaso();
  reproducirSecuencia();
});