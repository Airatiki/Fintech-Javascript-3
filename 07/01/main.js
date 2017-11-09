const input = document.querySelector('.input-tel');
const link = document.querySelector('a');
const mask = '+7 (';
const isDigitCode = x => x > 47 && x < 58;
const isBackspaceCode = x => x === 8;
const dashNumbers = [8, 10];
const codeOperator = 5;
const overflow = 11;


function changeHref(tel) {
  link.href = `tel:${tel.replace(/[^\d]/g, '')}`;
  link.textContent = `Позвонить на ${tel}`;
}

function modifyInput(result) {
  const numbersCount = result.match(/\d/g).length;

  const add = char => {
    input.value = result.slice(0, -1) + char + result[result.length - 1];

    if (numbersCount === overflow) {
      changeHref(result);
    }
  };

  if (numbersCount > overflow) {
    return;
  }

  if (dashNumbers.indexOf(numbersCount) > -1) {
    add('-');
    return;
  }

  if (numbersCount === codeOperator) {
    add(')-');
    return;
  }

  add('');
}

function addDigit(event) {
  const digit = String.fromCharCode(event.keyCode);
  let prevInput = input.value;

  if (prevInput.length < mask.length) {
    prevInput = mask;
  }

  modifyInput(prevInput + digit);
}

function deleteDigit() {
  let prevInpit = input.value;

  prevInpit = prevInpit.substr(0, prevInpit.length - 1);

  const numbers = prevInpit.match(/\d/g);

  if (!numbers) {
    input.value = '';
    return;
  }

  input.value = prevInpit.substr(0, prevInpit.lastIndexOf(numbers[numbers.length - 1]) + 1);
}

function checkCondition(event) {
  if (isDigitCode(event.keyCode)) {
    addDigit(event);
  }

  if (isBackspaceCode(event.keyCode)) {
    deleteDigit(event);
  }

  event.preventDefault();
}

input.addEventListener('keydown', checkCondition);

