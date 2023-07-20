const displayValorPrevio = document.getElementById("valor-previo");
const displayValorActual = document.getElementById("valor-actual");
const botonesNumeros = document.querySelectorAll(".numero");
const botonesOperadores = document.querySelectorAll(".operador");
const botonSwitch = document.querySelector(".switch");
const botonBorrar = document.querySelector(".borrarC");
const botonMasMenos = document.querySelector(".masMenos");
const botonIgual = document.querySelector(".igual");

let valorPrevio = "";
let valorActual = "";
let operador = null;
let tipoOperacion = "";

function actualizarDisplay() {
  displayValorPrevio.textContent = valorPrevio + " " + tipoOperacion;
  displayValorActual.textContent = valorActual;
}

botonesNumeros.forEach(boton => {
  boton.addEventListener("click", () => {
    if (valorActual === "0" || operador === "=") {
      valorActual = boton.innerHTML;
      operador = null;
      tipoOperacion = "";
    } else {
      valorActual += boton.innerHTML;
    }
    actualizarDisplay();
  });
});

botonesOperadores.forEach(boton => {
  boton.addEventListener("click", () => {
    if (operador !== null && operador !== "=") {
      calcular();
    }
    valorPrevio = valorActual;
    valorActual = "";
    operador = boton.innerHTML;
    tipoOperacion = boton.value;
    actualizarDisplay();
  });
});

function calcular() {
  const expresion = valorPrevio + operador + valorActual;
  valorPrevio = "";
  valorActual = eval(expresion.replace('x', '*')).toString();
  tipoOperacion = operador;
  operador = null;
  actualizarDisplay();
}

botonBorrar.addEventListener("click", () => {
  valorPrevio = "";
  valorActual = "";
  operador = null;
  tipoOperacion = "";
  actualizarDisplay();
});

botonMasMenos.addEventListener("click", () => {
  if (valorActual === "") {
    valorActual = "-";
  } else if (valorActual === "-") {
    valorActual = "";
  } else {
    valorActual = (-parseFloat(valorActual)).toString();
  }
  actualizarDisplay();
});

botonIgual.addEventListener("click", () => {
  if (operador !== null && operador !== "=") {
    calcular();
  }
  operador = "=";
  actualizarDisplay();
});

botonSwitch.addEventListener("click", () => {
  const body = document.querySelector("body");
  const calculadora = document.querySelector(".calculadora");
  const botones = document.querySelectorAll(".calculadora button");

  body.classList.toggle("dark-mode");
  calculadora.classList.toggle("dark-mode");
  botones.forEach((boton) => {
    boton.classList.toggle("dark-mode");
  });
});
