const calculoTexto = document.querySelector("#calculoTexto");
const resultadoTexto = document.querySelector("#resultadoTexto");
const botoes = document.querySelectorAll("button");

class Calculator {
    constructor(calculoTexto, resultadoTexto) {
        this.calculoTexto = calculoTexto;
        this.resultadoTexto = resultadoTexto;
        this.calculo = ""; //Representará o cálculo em andamento
    }

    //Adiciona um digito
    addDigit(digit) {
        if (digit === "." && this.calculoTexto.innerText.includes(".")) { //Controla a inserção do ponto no cálculo
            return;
        }
        this.calculo += digit; //Concatena o digito ao cálculo em andamento
        this.updateScreen();
    }

    processOperation(operation) {

        let operationValue;

        let calculoAtual = parseFloat(this.calculoTexto.innerText);
        let resultadoAtual = parseFloat(this.resultadoTexto.innerText);

        switch(operation) {
            case "+":
                operationValue = parseFloat(calculoAtual) + parseFloat(resultadoAtual);
            break;
            case "-":
                operationValue = parseFloat(calculoAtual) - parseFloat(resultadoAtual)
            break;
            case "/":
                operationValue = parseFloat(calculoAtual) / parseFloat(resultadoAtual)
            break;
            case "*":
                operationValue = parseFloat(calculoAtual) * parseFloat(resultadoAtual)
            break;
                default:
                return;
               
        }
        this.updateScreen(operationValue, operation, resultadoAtual, calculoAtual)
    }

    updateScreen(operationValue = null, operation = null, calculoAtual = null, resultadoAtual = null) {
        console.log(operationValue, operation, resultadoAtual, calculoAtual)
        
        if(operationValue === null) {
            this.calculoTexto.innerText = this.calculo //Atualiza a área de cálculo
        } else {
            this.resultadoTexto.innerText = operationValue
        }
    }   
}

const calc = new Calculator(calculoTexto, resultadoTexto);


// Limpa a expressão de cálculo em andamento e o resultado
function clearScreen() {
    calc.calculo = "";
    calc.resultadoTexto.innerText = "0";
    calc.calculoTexto.innerText = "0";
}

botoes.forEach(botao => {
    const acao = botao.dataset.acao
    botao.addEventListener("click", (e) => {

        const value = e.target.innerText; //RECEBE VALOR DE TEXTO DOS BOTÕES

        if (+value >= 0 || value === ".") {
            calc.addDigit(value);
        } else if (value === "CE") {
            clearScreen();
        } else {
            calc.processOperation(value)
        }
    })
})