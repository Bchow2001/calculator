var num1, num2, operator;

var displayDigits = [];

const display = document.querySelector("#display-output");

const btns = document.querySelectorAll(".normal");

const equal = document.querySelector("#equal");

const cleanDigits = [];

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b){
    return a * b;
}

function divide(a, b){
    return a / b;
}

function operate(operator) {
    if (operator === "+") {
        return add(num1, num2);
    } else if (operator === "-") {
        return subtract(num1, num2);
    } else if (operator === "*") {
        return multiply(num1, num2);
    } else if (operator === "/") {
        return divide (num1, num2);
    }
}


btns.forEach(btn => {
    btn.addEventListener("click", event =>{
        display.textContent += btn.textContent;
        displayDigits.push(btn.id);
    })
});

equal.addEventListener("click", calculate)

function calculate() {
    displayDigits.reduce((digits, digit) => {
        if (digit != NaN){
            return digits += digit.toString()
        } else {
            cleanDigits.push(digits);
            cleanDigits.push(digit);
            digits = null;
        }
        console.log(cleanDigits);
        // edit this so that it appends digits as a whole
        // and operators by themselves to cleanDigits
    });
}



