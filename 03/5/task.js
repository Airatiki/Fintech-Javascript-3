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
  return [...Array(result || 0)].map((v, i) => i);
}


const handler = {
  get(target, name) {
    if (name.split('').every(x => (roman.indexOf(x) >= 0))) { return fromRoman(name); }
  }
};

const proto = Object.getPrototypeOf(Number);
const p = new Proxy(proto, handler);

Object.setPrototypeOf(Number.prototype, p);

