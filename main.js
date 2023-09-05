const previousOperationText = document.querySelector("#previous-operation");
const currentOperationText = document.querySelector("#current-operation");
const buttons = document.querySelectorAll("button");

class Calculator {
    constructor(previousOperationText, currentOperationText) {
        this.previousOperationText = previousOperationText;
        this.currentOperationText = currentOperationText;
        this.currentOperation = ""; //Representará o cálculo em andamento
    }

    //Adiciona um digito
    addDigit(digit) {
        if (digit === "." && this.currentOperationText.innerText.includes(".")) { //Controla a inserção do ponto no cálculo
            return;
        }
        this.currentOperation = digit; //Concatena o digito ao cálculo em andamento
        this.updateScreen();
    }

    processOperation(operation) {

        let operationValue;
        let previous = +this.previousOperationText.innerText.split(" ")[0];
        let current = +this.currentOperationText.innerText;
        switch (operation) {
            case "+":
                operationValue = previous + current;
                break;
            case "-":
                operationValue = previous - current;
                break;
            case "/":
                operationValue = previous / current;
                break;
            case "*":
                operationValue = previous * current;
                break;
            default:
                return;

        }
        this.updateScreen(operationValue, operation, previous, current)
    }

    updateScreen(
        operationValue = null,
        operation = null,
        current = null,
        previous = null
    ) {
        if (operationValue === null) {
            this.currentOperationText.innerText += this.currentOperation; //Atualiza a área de cálculo
        } else {
            if (previous === 0) {
                operationValue = current;
            }

            this.previousOperationText.innerText = `${operationValue} ${operation}`;
            this.currentOperationText.innerText = "";
        }
    }
}

const calc = new Calculator(previousOperationText, currentOperationText);


// Limpa a expressão de cálculo em andamento e o resultado
function clearScreen() {
    calc.currentOperation = ""; // Limpa o cálculo em andamento
    calc.currentOperationText.innerText = ""
    calc.previousOperationText.innerText = "0"; // Define o texto atual como "0"
}


buttons.forEach(botao => {
    const acao = botao.dataset.acao
    botao.addEventListener("click", (e) => {

        const value = e.target.innerText; //RECEBE VALOR DE TEXTO DOS BOTÕES

        if (+value >= 0 || value === ".") {
            calc.addDigit(value);
        } else if (value === "CE") {
            clearScreen()
        } else {
            calc.processOperation(value)
        }
    })
})