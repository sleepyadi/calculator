const numbers = document.querySelectorAll('.number');
const calcContainer = document.querySelector('.calculator');
const displayEquation = document.querySelector('.equation');
const displayCurrent = document.querySelector('.current-number');


let currentNum = '';
let equationArr = [];

function handleNumbers(e) {
    currentNum += e.target.textContent;
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

calcContainer.addEventListener('click', (e) => {
    if (e.target.nodeName === 'BUTTON') {
        updateDisplay(e);
    }
});
