const combinacionesGanadoras = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], 
  [0, 3, 6], [1, 4, 7], [2, 5, 8], 
  [0, 4, 8], [2, 4, 6]            
];

let tablero = ["", "", "", "", "", "", "", "", ""];
let turno = "X";
let juegoTerminado = false;

const contenedorTablero = document.getElementById("tableroTresEnRaya");
const turnoActual = document.getElementById("turnoActual");
const mensaje = document.getElementById("mensajeTresEnRaya");
const btnReiniciar = document.getElementById("btnReiniciarTresEnRaya");

function crearTablero(combinacionGanadora = null) {
  contenedorTablero.innerHTML = "";

  tablero.forEach((valor, indice) => {
    const celda = document.createElement("div");
    celda.className = "celda";
    celda.dataset.indice = indice;
    celda.textContent = valor;

    if (combinacionGanadora && combinacionGanadora.includes(indice)) {
      celda.classList.add("ganadora");
    }

    contenedorTablero.appendChild(celda);
  });
}

function verificarGanador() {
  for (let i = 0; i < combinacionesGanadoras.length; i++) {
    const combinacion = combinacionesGanadoras[i];
    const [a, b, c] = combinacion;

    if (tablero[a] !== "" && tablero[a] === tablero[b] && tablero[a] === tablero[c]) {
      return { ganador: tablero[a], combinacion };
    }
  }
  return null;
}

function verificarEmpate() {
  return tablero.every((valor) => valor !== "");
}

contenedorTablero.addEventListener("click", (evento) => {
  const celda = evento.target.closest(".celda");

  if (!celda || juegoTerminado) return;

  const indice = Number(celda.dataset.indice);

  if (tablero[indice] !== "") return;

  tablero[indice] = turno;

  const resultado = verificarGanador();

  if (resultado) {
    crearTablero(resultado.combinacion);
    mensaje.textContent = `¡Ganó ${resultado.ganador}!`;
    juegoTerminado = true;
    return;
  }

  if (verificarEmpate()) {
    crearTablero();
    mensaje.textContent = "Empate.";
    juegoTerminado = true;
    return;
  }

  crearTablero();
  turno = turno === "X" ? "O" : "X";
  turnoActual.textContent = turno;
});

btnReiniciar.addEventListener("click", () => {
  tablero = ["", "", "", "", "", "", "", "", ""];
  turno = "X";
  juegoTerminado = false;
  mensaje.textContent = "";
  turnoActual.textContent = turno;
  crearTablero();
});
crearTablero();