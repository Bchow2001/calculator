var num1, num2, operator;
var displayDigits = [];
var cleanDigits = [];
const input = document.querySelector("#display-input");
const output = document.querySelector("#display-output");
const btns = document.querySelectorAll(".normal");
const equal = document.querySelector("#equal");
const ac = document.querySelector("#ac");


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
    if (b === 0) {
        return "Don't Try to Divide by zero you Bitch";
    } else {
        return a / b;
    } 
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

function toNum() {
    displayDigits = displayDigits.map(item => {
        if (!isNaN(item)) {
            item = +item;
        }
        return item;
    });
}

function concatenateArray() {
    // this function concatenates numbers next to each other
    // in an array while leaving NaNs as their own items
    toNum();
    displayDigits.reduce((digits, digit, i) => {
        if (i == displayDigits.length -1) {
            digits += digit.toString();
            cleanDigits.push(digits);
        } else if (!isNaN(digit)){
            return digits += digit.toString();
        } else {
            cleanDigits.push(digits);
            cleanDigits.push(digit);
            digits = "";
            return digits;
        } 
    });
}

function calculation(arrayOfThree) {
    num1 = parseInt(arrayOfThree[0]);
    num2 = parseInt(arrayOfThree[2]);
    return operate(arrayOfThree[1]);
}

function iterativeCalc(array) {
    if (array.length < 3) {
        return "Input more numbers/operators"
    } else if (array.length === 3){
        return calculation(array)
    } else {
        var firstThree = array.splice(0,3)
        var calculated = [calculation(firstThree)];
        return iterativeCalc(calculated.concat(array));
    }
}


function calculate() {
    concatenateArray();    
    output.textContent = iterativeCalc(cleanDigits);
    // console.log(iterativeCalc(cleanDigits));
}

function clear() {
    input.textContent = "";
    cleanDigits = [];
    displayDigits =[]
}


btns.forEach(btn => {
    btn.addEventListener("click", event =>{
        input.textContent += btn.textContent;
        displayDigits.push(btn.id);
    })
});

equal.addEventListener("click", calculate);

ac.addEventListener("click", clear);



