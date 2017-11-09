const list = document.querySelector('ol');
const button = document.querySelector('button');
const timeDistance = 500;
const clickCount = {
  ONE: 1,
  TWO: 2
};

function doubleClick(element, doubleClickHandler, timeDelay) {
  let delay = 0;
  let clicked = false;

  element.addEventListener('click', () => {
    if (!clicked) {
      clicked = true;
      delay = setTimeout(() => {
        clicked = false;
        doubleClickHandler(clickCount.ONE);
      }, timeDelay);
    } else {
      clearTimeout(delay);
      clicked = false;
      doubleClickHandler(clickCount.TWO);
    }
  });
}

const addElemnt = count => {
  const li = document.createElement('li');

  li.textContent = `${count}xClick - ${new Date()}`;
  count < 2 ? li.style.color = 'red' : li.style.color = 'green';
  list.appendChild(li);
};


doubleClick(button, addElemnt, timeDistance);