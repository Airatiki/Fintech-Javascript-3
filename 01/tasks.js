/**
 * найдите минимум и максимум в любой строке
 * @param  {string} string входная строка(числа отделены от других частей строки пробелами или знаками препинания)
 * @return {{min: number, max: number}} объект с минимумом и максимумом
 * '1 и 6.45, -2, но 8, а затем 15, то есть 2.7 и -1028' => { min: -1028, max: 15 }
 */
function getMinMax(string) {
  var regex = /(0[xX][+-]?[\dabcdefABCDEF]+)|([-]?\d*\.?\d+(?:[Ee]?[+-]?\d+)?)/g;
  var numbers = string.match(regex);

  numbers = numbers.sort((a, b) => Number(a) - Number(b));
  return { min: numbers[0], max: numbers[numbers.length - 1] };
}

/* ============================================= */

/**
 * Напишите рекурсивную функцию вычисления чисел Фибоначчи
 * @param {number} x номер числа
 * @return {number} число под номером х
 */
function fibonacciSimple(x) {
  return x > 1 ? fibonacciSimple(x - 1) + fibonacciSimple(x - 2) : x;
}

/* ============================================= */

/**
 * Напишите функцию для вычисления числа Фибоначчи с мемоизацией:
 * при повторных вызовах функция не вычисляет значения, а достает из кеша.
 * @param {number} x номер числа
 * @return {number} число под номером х
 */
var results = [0, 1];

function fibonacciWithCache(x) {
  if (x === 0) { return 0; }
  if (x === 1) { return 1; }
  if (!results[x]) { results[x] = fibonacciWithCache(x - 1) + fibonacciWithCache(x - 2); }

  return results[x];
}

/* ============================================= */

/**
 * Напишите функцию printNumbers, выводящую числа в столбцах
 * так, чтобы было заполнено максимальное число столбцов при
 * минимальном числе строк.
 * Разделитель межу числами в строке - один пробел,
 * на каждое число при печати - отводится 2 символа
 * Пример работы: printNumbers(11, 3)
 *  0  4  8
 *  1  5  9
 *  2  6 10
 *  3  7 11
 * @param  {number} max  максимальное число (до 99)
 * @param  {number} cols количество столбцов
 * @return {string}
 */
function printNumbers(max, cols) {
  var answer = '',
    rowCount = Math.ceil((max + 1) / cols),
    numbOnAdditionalRow = (max + 1) % cols,
    result = new Array(rowCount);

  for (var i = 0; i < rowCount; i++) {
    result[i] = new Array(cols);
    var dimension = cols,
      count = 0;

    if (i === rowCount - 1 && numbOnAdditionalRow > 0) { dimension = numbOnAdditionalRow; }

    for (var j = 0; j < dimension; j++) {
      if (j > numbOnAdditionalRow && numbOnAdditionalRow !== 0) {
        result[i][j] = (i + count - 1);
        count--;
      } else { result[i][j] = (i + count); }

      count += rowCount;
    }
  }
  result.forEach(arr => {
    arr.forEach(a => {
      a > 9 ? answer += `${a} ` : answer += ` ${a} `;
    });
    answer = answer.substr(0, answer.length - 1);
    answer += '\n';
  });
  answer = answer.substr(0, answer.length - 1);

  return answer;
}

/* ============================================= */

/**
 * Реализуйте RLE-сжатие: AAAB -> A3B, BCCDDDEEEE -> BC2D3E4
 * @param  {string} value
 * @return {string}
 */
function rle(input) {
  var result = [];
  var regex = /(.)\1*/g;

  input.match(regex).forEach(group => {
    group.length > 1 ? result.push(group[0], group.length) : result.push(group[0]);
  });

  return result.join('');
}

module.exports = {
  getMinMax,
  rle,
  printNumbers,
  fibonacciSimple,
  fibonacciWithCache
};
