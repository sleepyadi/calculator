const numbers = document.querySelectorAll('.number');
const calcContainer = document.querySelector('.calculator');
const displayEquation = document.querySelector('.equation');
const displayCurrent = document.querySelector('.current-number');
const operatorBtns = document.querySelectorAll('.operator');

let currentNum = '';
let equationArr = [];

function handleNumbers(e) {
    currentNum += e.target.textContent;
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
}

function updateDisplay() {
    
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
