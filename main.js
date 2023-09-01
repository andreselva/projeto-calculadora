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
        console.log(operation);
    }

    updateScreen() {
        this.calculoTexto.innerText = this.calculo //Atualiza a área de cálculo
    }
}

const calc = new Calculator(calculoTexto, resultadoTexto);


botoes.forEach(botao => {
    const acao = botao.dataset.acao
    botao.addEventListener("click", (e) => {

        const value = e.target.innerText; //RECEBE VALOR DE TEXTO DOS BOTÕES

        if (+value >= 0 || value === ".") {
            calc.addDigit(value);
        } else {
            calc.processOperation(value)
        }
    })
})