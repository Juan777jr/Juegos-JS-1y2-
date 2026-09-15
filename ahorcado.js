const palabras = ["javascript", "programacion", "computadora", "internet", "teclado"];

let palabraSecreta = palabras[Math.floor(Math.random() * palabras.length)];
let letrasAdivinadas = [];
let errores = 0;

const maxErrores = 6;
let juegoTerminado = false;

const dibujo = document.getElementById("dibujoAhorcado");
const palabraOcultaEl = document.getElementById("palabraOculta");
const teclado = document.getElementById("tecladoAhorcado");
const mensaje = document.getElementById("mensajeAhorcado");
const btnReiniciar = document.getElementById("btnReiniciarAhorcado");

function crearDibujoAhorcado(errores) {
  const partes = [
    "<circle cx='150' cy='70' r='16' fill='none' stroke='#1f2430' stroke-width='3'></circle>",
    "<line x1='150' y1='86' x2='150' y2='140' stroke='#1f2430' stroke-width='3'></line>",
    "<line x1='150' y1='100' x2='125' y2='120' stroke='#1f2430' stroke-width='3'></line>",
    "<line x1='150' y1='100' x2='175' y2='120' stroke='#1f2430' stroke-width='3'></line>",
    "<line x1='150' y1='140' x2='128' y2='175' stroke='#1f2430' stroke-width='3'></line>",
    "<line x1='150' y1='140' x2='172' y2='175' stroke='#1f2430' stroke-width='3'></line>"
  ];

  const base =
    "<line x1='20' y1='190' x2='120' y2='190' stroke='#1f2430' stroke-width='4'></line>" +
    "<line x1='50' y1='190' x2='50' y2='20' stroke='#1f2430' stroke-width='4'></line>" +
    "<line x1='50' y1='20' x2='150' y2='20' stroke='#1f2430' stroke-width='4'></line>" +
    "<line x1='150' y1='20' x2='150' y2='54' stroke='#1f2430' stroke-width='3'></line>";

  let contenido = base;

  for (let i = 0; i < errores; i++) {
    contenido = contenido + partes[i];
  }

  return "<svg viewBox='0 0 220 210' width='180' height='170'>" + contenido + "</svg>";
}

function mostrarPalabra() {
  const letras = palabraSecreta.split("");

  const visible = letras.map(function (letra) {
    if (letrasAdivinadas.indexOf(letra) !== -1) {
      return letra;
    }
    return "_";
  });

  palabraOcultaEl.textContent = visible.join(" ");
}

function verificarVictoria() {
  return palabraSecreta.split("").every(function (letra) {
    return letrasAdivinadas.indexOf(letra) !== -1;
  });
}

function crearTeclado() {
  teclado.innerHTML = "";
  const alfabeto = "abcdefghijklmnopqrstuvwxyz".split("");

  alfabeto.forEach(function (letra) {
    const boton = document.createElement("button");
    boton.textContent = letra;
    boton.className = "teclaAhorcado";
    boton.dataset.letra = letra;
    teclado.appendChild(boton);
  });
}

crearTeclado();
mostrarPalabra();
dibujo.innerHTML = crearDibujoAhorcado(errores);

teclado.addEventListener("click", function (evento) {
  const boton = evento.target.closest(".teclaAhorcado");

  if (!boton || boton.disabled || juegoTerminado) {
    return;
  }

  const letra = boton.dataset.letra;
  boton.disabled = true;

  if (palabraSecreta.indexOf(letra) !== -1) {
    letrasAdivinadas.push(letra);
    mostrarPalabra();

    if (verificarVictoria()) {
      mensaje.textContent = "Ganaste. La palabra era " + palabraSecreta + ".";
      juegoTerminado = true;
    }
  } else {
    errores = errores + 1;
    dibujo.innerHTML = crearDibujoAhorcado(errores);

    if (errores === maxErrores) {
      mensaje.textContent = "Perdiste. La palabra era " + palabraSecreta + ".";
      juegoTerminado = true;
    }
  }
});

btnReiniciar.addEventListener("click", function () {
  palabraSecreta = palabras[Math.floor(Math.random() * palabras.length)];
  letrasAdivinadas = [];
  errores = 0;
  juegoTerminado = false;
  mensaje.textContent = "";
  dibujo.innerHTML = crearDibujoAhorcado(errores);
  mostrarPalabra();
  crearTeclado();
});