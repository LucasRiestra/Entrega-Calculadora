class Display {
    constructor(displayValorPrevio, displayValorActual) {
        this.displayValorActual = displayValorActual;
        this.displayValorPrevio = displayValorPrevio;
        this.calculadora = new Calculadora();
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

    agregarNumero(numero){
        if(numero === "." && this.valorActual.includes(".")) return
        this.valorActual = this.valorActual.toString() + numero.toString();
        this.imprimirValores();
    }

    borrarTodo(){
        this.valorActual = " ";
        this.valorPrevio = " ";
        this.tipoOperacion = undefined;
        this.imprimirValores();
    }

    masMenos() {
        switch (this.tipoOperacion) {
            case "sumar":
                this.tipoOperacion = "restar";
                break;
            case "restar":
                this.tipoOperacion = "multiplicar";
                break;
            case "multiplicar":
                this.tipoOperacion = "dividir";
                break;
            case "dividir":
                this.tipoOperacion = "divisionModular";
                break;
            case "divisionModular":
                this.tipoOperacion = "sumar";
                break;
            default:
                this.tipoOperacion = "sumar";
        }
    
        this.imprimirValores();
    }
  
    computar(tipo) {
        this.tipoOperacion !== "igual" && this.calcular();
        this.tipoOperacion = tipo;
        this.valorPrevio = this.valorActual || this.valorPrevio;
        if (this.ultimoResultado !== null) {
            this.valorPrevio = this.ultimoResultado;
          }
        this.valorActual = " ";
        this.imprimirValores();
        
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
            default: return;}

        this.valorActual = resultado;
        this.ultimoResultado = resultado;

    }
        


    
}