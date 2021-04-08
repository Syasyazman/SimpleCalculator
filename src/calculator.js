let runningTotal = 0;
let buffer = "0";
let previousOperator;

const screen = document.querySelector('.screen');

function buttonClick(value) {
    if (isNaN(value)) {
        // symbol
        handleSymbol(value);
    } else {
        // integer
        handleNumber(value);
    }

    screen.innerText = buffer; // display value on the screen
}

function handleSymbol(value) {
    switch (value) {
        case 'C' :
            buffer = "0";
            runningTask = 0;
            break;
        case '=' :
            if (previousOperator === null) {
                return;
            }
            flushOperation(parseInt(buffer));
            previousOperator = null;
            buffer = runningTotal;
            runningTotal = 0;
            break;
        case '←' :
            if (buffer.length === 1) {
                buffer = "0";
            } else {
                buffer = buffer.substring(0, buffer.length - 1);
            }
        case '−' :
        case '÷' :
        case '+' :
        case '×' :   
            handleMath(value);
            break;
    }
}

function handleMath(symbol) {
    if (buffer === "0") {
        // do nothing
        return;
    }

    const intBuffer = parseInt(buffer);
    
    if (runningTotal === 0) {
        runningTotal = intBuffer;
    } else {
        flushOperation(intBuffer);
    }

    previousOperator = symbol;
    
    buffer = "0";
}

function flushOperation(intBuffer) {
    if (previousOperator === '×') {
        runningTotal *= intBuffer;
    } else if (previousOperator === '÷') {
        runningTotal /= intBuffer;
    } else if (previousOperator === '−') {
        runningTotal -= intBuffer;
    } else {
        runningTotal += intBuffer;
    }
}

function handleNumber(value) {
    // integer is a string
    if (buffer === "0") {
        buffer = value;
    } else {
        buffer += value; // concactenating numbers
    }
}

// set up calculator
function init() {
    document.querySelector(".calc-buttons")
        .addEventListener('click', function(event) {
            buttonClick(event.target.innerText);
        });
}

init();