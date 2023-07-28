import Notiflix from 'notiflix';

const delayEl = document.querySelector('.form [name="delay"]');
const stepEl = document.querySelector('.form [name="step"]');
const amountEl = document.querySelector('.form [name="amount"]');
const form = document.querySelector('.form');
form.addEventListener('submit', onCreatePromise);
// console.log(btnSubmit);
// console.log(delayEl);
// console.log(stepEl);
// console.log(amountEl);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function onCreatePromise(event) {
  event.preventDefault();
  const {
    elements: { delay, step, amount },
  } = event.currentTarget;
  let delayEl = Number(delay.value);
  let stepEl = Number(step.value);
  let amountEl = Number(amount.value);

  for (let i = 1; i <= amountEl; i += 1) {
    createPromise(i, delayEl)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
    delayEl += stepEl;
  }
  event.currentTarget.reset();
}
