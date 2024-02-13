let prevNumber = 0.0;
let currentNumber = 0.0;
let operator = "+";
let dotMode = 0;
let justCalculated = false;
const numbersButtons = document.querySelectorAll(".numbers");
const display = document.querySelector(".result");
const dot = document.querySelector(".dot");
const operatorButtons = document.querySelectorAll(".operators");
const backSpace = document.querySelector(".canc");
const clear = document.querySelector(".clear");
const history = document.querySelector(".history");


function operate(num1, num2, op) {
    switch (op) {
        case "+":
            return (num1 + num2);
        case "-":
            return (num1 - num2);
        case "x": case "*":
            return (num1 * num2);
        case "/":
            return (num1 / num2);
    }
}
// Displays the number on the calculator
function displayNum(number) {
    display.innerHTML = number < 1e6 ? number : number.toExponential(4);

}
// edits and add the number 
function insertNumber(inputNumber) {
    if (dotMode === 0) {
        currentNumber = currentNumber * 10 + parseFloat(inputNumber);
    } else {
        currentNumber += parseFloat(inputNumber) * Math.pow(10, dotMode);
        dotMode--;
    }
    currentNumber = Math.round(currentNumber * 1e6) / 1e6;
    displayNum(currentNumber);
    justCalculated = false;

}

// ADDS EVENT LISTENER TO NUMBERS BUTTONS
numbersButtons.forEach((button) => {
    button.addEventListener("click", () => {
        insertNumber(button.innerHTML);
    })
})

dot.addEventListener("click", () => {
    if (dotMode === 0) {
        dotMode = -1;
        display.textContent += ".";
    }
})

function resetCalc() {
    dotMode = 0;
    operator = "+";
    currentNumber = 0;
    prevNumber = 0;
    justCalculated = false;
    history.innerHTML = "";
}

function insertOperator(inputOp) {
    if (justCalculated === true) {
        operator = inputOp;
        if (inputOp !== "=" && inputOp !== "Enter") {
            history.textContent = (history.textContent).substring(0, history.textContent.length - 1) + inputOp;
        }
        return;

    }
    if (operator === "/" && currentNumber === 0) {
        resetCalc();
        return display.innerHTML = "Error: / 0";
    }

    prevNumber = Math.round(operate(prevNumber, currentNumber, operator) * 1e6) / 1e6;
    displayNum(prevNumber);
    operator = inputOp;
    currentNumber = 0;
    dotMode = 0;
    if (inputOp !== "=" && inputOp !== "Enter") {
        justCalculated = true;
    }

    if (inputOp === "=" || inputOp === "Enter") {
        operator = "+";
        history.textContent = "";

    } else {
        if (inputOp === "*") operator = "x";
        history.textContent = (prevNumber < 1e6 ? prevNumber : prevNumber.toExponential(4)) + " " + operator;
    }


}

// Event listener on operators
operatorButtons.forEach((operator) => {
    operator.addEventListener("click", () => {
        insertOperator(operator.innerHTML);

    })
})


// Keyboard responsive
window.addEventListener("keydown", (event) => {
    console.log(event.key)
    switch (event.key) {
        case "+": case "-": case "*": case "/": case "Enter":
            insertOperator(event.key);
            break;
        case "1": case "2": case "3": case "4": case "5": case "6": case "7": case "8": case "9": case "0":
            insertNumber(event.key);
            break;
        case "Backspace":
            deleteNumbers();
            break;
        case "Delete": case "c": case "C":
            resetCalc();
            displayNum(currentNumber);
    }
})

//Delete digits
function deleteNumbers() {
    if (dotMode === 0) {
        currentNumber = Math.floor(currentNumber / 10);
    } else if (dotMode === -1) {
        dotMode = 0;
    } else {
        currentNumber = Math.floor(currentNumber / Math.pow(10, (dotMode + 2))) * Math.pow(10, dotMode + 2);
        dotMode++;
    }

    currentNumber = Math.round(currentNumber * 1e6) / 1e6;
    displayNum(currentNumber);
    if (dotMode === -1) display.textContent += ".";
}

backSpace.addEventListener("click", () => {
    deleteNumbers();
})

clear.addEventListener("click", () => {
    resetCalc();
    displayNum(currentNumber);
})

resetCalc();

