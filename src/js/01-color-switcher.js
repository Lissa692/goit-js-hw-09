const startEl = document.querySelector('[data-start]');
const stopEl = document.querySelector('[data-stop]');
// const bodyEl = document.querySelector('.body');
// console.log(bodyEl);

let changeColor = null;

startEl.addEventListener('click', () => {
  changeColor = setInterval(() => {
    startEl.setAttribute('disabled', 'disabled');
    stopEl.removeAttribute('disabled', 'null');
    document.body.style.backgroundColor = `#${Math.floor(
      Math.random() * 16777215
    )
      .toString(16)
      .padStart(6, 0)}`;
    console.log(setInterval);
  }, 1000);
});
stopEl.addEventListener('click', () => {
  stopEl.setAttribute('disabled', 'disabled');

  startEl.removeAttribute('disabled', 'null');

  clearInterval(changeColor);
  console.log(clearInterval);
});

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
