//SELECCION ELEMENTOS HTML//

const displayValorPrevio = document.getElementById("valor-previo");
const displayValorActual = document.getElementById("valor-actual");
const botonesNumeros = document.querySelectorAll(".numero");
const botonesOperadores = document.querySelectorAll(".operador");

//DISPLAY O PANTALLA//

class Display {
  constructor(displayValorPrevio, displayValorActual) {
      this.displayValorActual = displayValorActual;
      this.displayValorPrevio = displayValorPrevio;
      this.tipoOperacion = undefined;
      this.valorActual = " ";
      this.valorPrevio = " ";
      this.ultimoResultado = null;
      this.signos = {
          sumar: "+", restar: "-", multiplicar: "x", dividir:"/", divisionModular:"%" 
      }
  }

  imprimirValores() {
      this.displayValorActual.textContent = this.valorActual;
      this.displayValorPrevio.textContent = `${this.valorPrevio} ${this.signos[this.tipoOperacion] || " " }`;
  }
  
  agregarNumero(numero) {
    if (numero === "." && this.valorActual.includes(".")) return;
  
    if (this.tipoOperacion === "igual") {
      this.tipoOperacion = undefined;
      this.valorPrevio = " ";
    }
  
    if (numero === "." && this.valorActual === "0") {
      this.valorActual = numero.toString();
    } else {
      this.valorActual = this.valorActual.toString() + numero.toString();
    }
  
    this.imprimirValores();
  }

  borrarTodo(){
      this.valorActual = "";
      this.valorPrevio = "";
      this.tipoOperacion = undefined;
      this.imprimirValores();
  }

  masMenos() {
      switch (this.tipoOperacion) {
          case "sumar":
              this.tipoOperacion = "restar";
              break;
          case "restar":
              this.tipoOperacion = "sumar";
              break;
          default:
              this.tipoOperacion = "sumar";
      }
      this.imprimirValores();
  }

  computar(tipo) {
    if (this.tipoOperacion !== "igual") {
      this.calcular();
    }
    this.tipoOperacion = tipo;
    if (this.valorActual !== "") {
      this.valorPrevio = this.valorActual;
      this.valorActual = "";
      this.imprimirValores();
    }
  }

  calcular() {

      const valorPrevio = parseFloat(this.valorPrevio);
      const valorActual = parseFloat(this.valorActual);

    let resultado;
      switch (this.tipoOperacion) {
      case "sumar":
        resultado = eval(`${valorPrevio} + ${valorActual}`);
      break;
      case "restar":
        resultado = eval(`${valorPrevio} - ${valorActual}`);
      break;
      case "multiplicar":
        resultado = eval(`${valorPrevio} * ${valorActual}`);
      break;
        case "dividir":
      resultado = eval(`${valorPrevio} / ${valorActual}`);
      break;
        case "divisionModular":
      resultado = eval(`${valorPrevio} % ${valorActual}`);
      break;
        default:
      return;
  } 
      this.valorActual = resultado.toString();
      this.ultimoResultado = resultado.toString();
    }
  
}
//SELECCION DE BOTONES CON EVENTO CLICK//

const display = new Display(displayValorPrevio, displayValorActual);

botonesNumeros.forEach(boton => {
  boton.addEventListener("click", () => {
    display.agregarNumero(boton.innerHTML);});
});

botonesOperadores.forEach(boton => {
  boton.addEventListener("click", () => display.computar(boton.value))
});

//BOTON SWITCH!//
  const botonSwitch = document.querySelector(".switch");
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
