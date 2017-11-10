const input = document.querySelector('.input-tel');
const link = document.querySelector('a');
const mask = '+7 (';
const isDigitCode = x => x > 47 && x < 58;
const isBackspaceCode = x => x === 8;
const dashNumbers = [7, 9];
const codeOperator = 4;
const overflow = 11;


function changeHref(tel) {
  link.href = `tel:${tel.replace(/[^\d]/g, '')}`;
  link.textContent = `Позвонить на ${tel}`;
}

function modifyInput(result) {
  const numbers = result.match(/\d/g);
  let res = mask;

  if (numbers.length > overflow) {
    return;
  }

  for (let i = 1; i < numbers.length; i++) {
    if (i === codeOperator) {
      res += ')-';
    }

    if (dashNumbers.indexOf(i) > -1) {
      res += '-';
    }
    res += numbers[i];

    if (i === overflow - 1) {
      changeHref(res);
    }
  }
  input.value = res;
}

function addDigit(event) {
  const digit = String.fromCharCode(event.keyCode);
  const left = input.selectionStart;
  let prevInput = input.value;

  if (prevInput.length < mask.length) {
    prevInput = mask + digit;
  } else {
    prevInput = prevInput.substr(0, left) + digit + prevInput.substr(left, prevInput.length);
  }

  modifyInput(prevInput);
}

function deleteDigit() {
  let prevInpit = input.value;
  const left = input.selectionStart;
  const right = input.selectionEnd;

  if (left !== right) {
    prevInpit = prevInpit.substr(0, left) + prevInpit.substr(right, prevInpit.length);
  } else {
    prevInpit = prevInpit.substr(0, left - 1) + prevInpit.substr(left, prevInpit.length);
  }
  modifyInput(prevInpit);
  input.selectionStart = left - 1;
  input.setSelectionRange(left, left);
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
