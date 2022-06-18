const numbers = document.querySelectorAll('.number');
const calcContainer = document.querySelector('.calculator');
const displayEquation = document.querySelector('.equation');
const displayCurrent = document.querySelector('.current-number');
const operatorBtns = document.querySelectorAll('.operator');
const decimalBtn = document.querySelector('.decimal');
const allClearBtn = document.querySelector('.allclear');
const backspaceBtn = document.querySelector('.backspace');
const equalBtn = document.querySelector('.equal');

let currentNum = '';
let equationArr = [];

let operate = {
    '+': function(a,b) {
        return a + b;
    },
    '-': function(a,b) {
        return a - b;
    },
    '*': function(a, b) {
        return a * b;
    },
    '/': function(a,b) {
        if (b === 0) {
            currentNum = '';
            equationArr = [];
            alert('Cannot Divide by zero.');
            return 0;
        }
        return a / b;
    },
    '%': function(a,b) {
        return a % b;
    },
    '^': function(a,b) {
        return a ** b;
    }
};

function handleNumbers(num) {
    currentNum += num;
}

function countArr(arr) {
    return arr.filter((n) => {return !isNaN(n);}).length;
}

function countDecimal(str) {
    return str.split('').filter((e) => {return e == '.';}).length;
}

function simplifyExpression(arr, operator) {
    
    if (countArr(arr) === 2) {
        let answer = operate[arr[1]](arr[0], arr[2]);
        equationArr = [answer, operator];
    }

}

function handleOperators(operator) {
    
    if (currentNum === '') {
        currentNum = (operator === '-' || operator === "+") ? operator : '';
    } else if (!isNaN(currentNum)) {
        equationArr.push(Number(currentNum));
        equationArr.push(operator);
        currentNum = '';
    } else {

        if (operator === '-') {
        
            if (currentNum === '-') {
                currentNum = '+';
            } else if (currentNum === '+') {
                currentNum = '-';
            }
        }
    }
    
    simplifyExpression(equationArr, operator);
}

function updateDisplay() {
    // can use equationArr.join('') + currentNum for live expression probably maybe
    if (currentNum) {
        displayCurrent.textContent = `${currentNum}`;
    } else {
        displayCurrent.textContent = '0';
    }

    if (equationArr.join('')) {
        displayEquation.textContent = `${equationArr.join('')}`;
    } else {
        displayEquation.textContent = '0';
    }


}

function allClear() {
    currentNum = '';
    equationArr = [];
}

function backspace() {
    if (currentNum.length <= 1) {
        currentNum = '';
    } else {
        currentNum = currentNum.substring(0, currentNum.length - 1);
    }
}

function showResult() {

    if (equationArr.length == 2 && !isNaN(currentNum)) {
        let answer = operate[equationArr[1]](equationArr[0], Number(currentNum));
        currentNum = answer;
        equationArr = [];
    }
}

numbers.forEach((number) => {

    number.addEventListener('click', (event) => {

        let num = event.target.textContent;
        handleNumbers(num);
    });
});

operatorBtns.forEach((operatorBtn) => {

    operatorBtn.addEventListener('click', (event) => {
        let operator = event.target.textContent;
        handleOperators(operator);
    });
});


decimalBtn.addEventListener('click', (event) => {
    // need to abstract this into a function probably
    let symbol = event.target.textContent;
    let tempStr = currentNum.substring(currentNum.length-1);
    
    if(tempStr === '+' || tempStr === '-'|| !isNaN(tempStr)) {
        if (countDecimal(currentNum) < 1) {
            handleNumbers(symbol);
        }
    }
});

allClearBtn.addEventListener('click', allClear);

backspaceBtn.addEventListener('click', backspace);

equalBtn.addEventListener('click', showResult);

calcContainer.addEventListener('click', (e) => {
    if (e.target.nodeName === 'BUTTON') {
        updateDisplay(e);
    }
});