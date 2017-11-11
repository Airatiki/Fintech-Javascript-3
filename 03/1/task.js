/**
 * Исправьте проблему с таймером: должны выводиться числа от 0 до 9.
 * Доп. задание: предложите несколько вариантов решения.
 */
function throttle(time, callback) {
  let lastTime = 0;

  return (...args) => {

    const currentTime = Date.now();

    if(currentTime - lastTime > time) {
      callback.call(this, ...args);
      lastTime = currentTime;
    }
  }
}

module.exports = { throttle };
