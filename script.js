const numbers = document.querySelectorAll('.number');
const calcContainer = document.querySelector('.calculator');
const displayEquation = document.querySelector('.equation');
const displayCurrent = document.querySelector('.current-number');
const operatorBtns = document.querySelectorAll('.operator');
const decimalBtn = document.querySelector('.decimal');

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
        return a / b;
    },
    "%": function(a,b) {
        return a % b;
    }
};

function handleNumbers(e) {
    currentNum += e.target.textContent;
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

function handleOperators(e) {
    
    if (currentNum === '') {
        currentNum = (e.target.textContent === '-' || e.target.textContent === "+") ? e.target.textContent : '';
    } else if (!isNaN(currentNum)) {
        equationArr.push(Number(currentNum));
        equationArr.push(e.target.textContent);
        currentNum = '';
    } else {

        if (e.target.textContent === '-') {
        
            if (currentNum === '-') {
                currentNum = '+';
            } else if (currentNum === '+') {
                currentNum = '-';
            }
        }
    }
    
    simplifyExpression(equationArr, e.target.textContent);
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

numbers.forEach((number) => {

    number.addEventListener('click', handleNumbers)
});

operatorBtns.forEach((operatorBtn) => {

    operatorBtn.addEventListener('click', handleOperators)
});


calcContainer.addEventListener('click', (e) => {
    if (e.target.nodeName === 'BUTTON') {
        updateDisplay(e);
    }
});

decimalBtn.addEventListener('click', (event) => {

    let tempStr = currentNum.substring(currentNum.length-1);
    
    if(tempStr === '+' || tempStr === '-'|| !isNaN(tempStr)) {
        if (countDecimal(currentNum) < 1) {
            handleNumbers(event);
        }
    }
});