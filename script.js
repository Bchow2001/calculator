var num1, num2, operator;
var displayDigits = [];
var cleanDigits = [];
const keyBoard = [1,2,3,4,5,6,7,8,9,0,"+","-","/","*","Backspace"]
const input = document.querySelector("#display-input");
const output = document.querySelector("#display-output");
const btns = document.querySelectorAll(".normal");
const equal = document.querySelector("#equal");
const ac = document.querySelector("#ac");
const clear = document.querySelector("#clear");


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
        } else if (!isNaN(digit) || digit === "."){
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
    num1 = parseFloat(arrayOfThree[0]);
    num2 = parseFloat(arrayOfThree[2]);
    return operate(arrayOfThree[1]);
}

function iterativeCalc(array) {
    if (array.length < 3) {
        return "Input more numbers/operators";
    } else if (array.length === 3){
        return calculation(array);
    } else {
        var firstThree = array.slice(0,3);
        var rest = array.slice(3);
        var calculated = [calculation(firstThree)];
        var newArray = calculated.concat(rest);
        return iterativeCalc(newArray);
    };
}


function calculate() {
    concatenateArray();
    if (!isNaN(iterativeCalc(cleanDigits))) {
        var rounded = Math.round((iterativeCalc(cleanDigits)*1000))/1000  
        displayDigits = [rounded];
        cleanDigits = [];
        return output.textContent = rounded;
    } else if (iterativeCalc(cleanDigits) === 
    "Don't Try to Divide by zero you Bitch") {
        return output.textContent = "Don't Try to Divide by zero you Bitch";
    } else {
        return output.textContent = "Syntax Error";
    }
}

function clearAll() {
    input.textContent = "";
    output.textContent = "";
    cleanDigits = [];
    displayDigits =[];
    equal.addEventListener("click", calculate);
}


function clearOne() {
    displayDigits.pop();
    input.textContent = displayDigits.join("");
}



btns.forEach(btn => {
    btn.addEventListener("click", event =>{
        displayDigits.push(btn.id);
        input.textContent = displayDigits.join("");
    })
});

document.addEventListener("keydown", event => {
    console.log(event.key);
    if (!isNaN(event.key)) {
        displayDigits.push(event.key);
        input.textContent = displayDigits.join("");
    } else if (event.key === "+" || 
    event.key === "-" || 
    event.key === "*" ||
    event.key === "/" ||
    event.key === ".") {
        displayDigits.push(event.key);
        input.textContent = displayDigits.join("");
    } else if (event.key === "=" || event.key === "Enter") {
        return calculate();
    } else if (event.key === "Backspace") {
        return clearOne();
    }
})

clear.addEventListener("click", clearOne);

equal.addEventListener("click", calculate);

ac.addEventListener("click", clearAll);


