const decimal = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
const roman = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'];

function fromRoman(str) {
  let result = 0;

  for (let i = 0; i <= decimal.length; i++) {
    while (str.indexOf(roman[i]) === 0) {
      result += decimal[i];
      str = str.replace(roman[i], '');
    }
  }
  return [...Array(result)].map((v, i) => i);
}

function parseRoman(str) {
  const badRomanParse = str.split('').some(x => roman.indexOf(x) === -1);

  return badRomanParse ? undefined : fromRoman(str);
}


const handler = {
  get(target, name) {
    return parseRoman(name) || target[name];
  }
};

const proto = Object.getPrototypeOf(Number);
const proxy = new Proxy(proto, handler);

Object.setPrototypeOf(Number.prototype, proxy);

