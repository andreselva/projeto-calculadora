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
    // Controla a operação
    processOperation(operation) {
        if (this.currentOperationText.innerText === "" && operation !== "C") {
            if (previousOperationText.innerText !== "") {
                this.changeOperation(operation);
            }
            return
        }

        let operationValue;
        let previous = +this.previousOperationText.innerText.split(" ")[0];
        let current = +this.currentOperationText.innerText;
        switch (operation) {
            case "+":
                operationValue = previous + current;
                this.updateScreen(operationValue, operation, current, previous)
                break;
            case "-":
                operationValue = previous - current;
                this.updateScreen(operationValue, operation, current, previous)
                break;
            case "/":
                operationValue = previous / current;
                this.updateScreen(operationValue, operation, current, previous)
                break;
            case "*":
                operationValue = previous * current;
                this.updateScreen(operationValue, operation, current, previous)
                break; 
            case "DEL":
                this.processDelOperation();
                break;
            case "CE":
                this.processClearCurrentOperation();
                break;
            case "C":
                this.processClearAllOperation();
                break;
            case "=":
                this.processEqualsOperation();
                break;
            default:
                return;

        }
    }

    updateScreen(
        operationValue = null,
        operation = null,
        current = null,
        previous = null
    ) {
        console.log(operationValue, operation, current, previous)
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

    changeOperation(operation) {
        const mathOperations = ["-", "+", "*", "/"]

        // Verifica se os sinais já estão inseridos na operação
        if (!mathOperations.includes(operation)) {
            return
        }

        // O SLICE realiza a troca de sinal na operação
        this.previousOperationText.innerText = this.previousOperationText.innerText.slice(0, -1) + operation
    }

    // Apaga o último dígito
    processDelOperation() {
        this.currentOperationText.innerText = this.currentOperationText.innerText.slice(0, -1);
    }

    //Apaga a próxima operação (visor de baixo)
    processClearCurrentOperation() {
        this.currentOperationText.innerText = ""
    }

    processClearAllOperation() {
        this.currentOperationText.innerText = "";
        this.previousOperationText.innerText = "";
        this.currentOperation = "";
    }

    processEqualsOperation() {
        const operation = previousOperationText.innerText.split(" ")[1];
        this.processOperation(operation);
    }
}

const calc = new Calculator(previousOperationText, currentOperationText);


buttons.forEach(botao => {
    botao.addEventListener("click", (e) => {

        const value = e.target.innerText; //RECEBE VALOR DE TEXTO DOS BOTÕES

        if (+value >= 0 || value === ".") {
            calc.addDigit(value);
        } else {
            calc.processOperation(value)
        }
    })
})