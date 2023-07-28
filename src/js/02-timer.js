import flatpickr from 'flatpickr';
import Notiflix from 'notiflix';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

const dataTimeEl = document.querySelector('#datetime-picker');
const startBtnEl = document.querySelector('[data-start]');
const timerEl = document.querySelector('.timer');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

// dataTimeEl.addEventListener('input', dateTime);

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);

    if (selectedDates < new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      startBtnEl.setAttribute('disabled', 'disabled');
    }
    return startBtnEl.removeAttribute('disabled', 'null');
  },
};
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
// function dateTime() {}
flatpickr(dataTimeEl, options);

startBtnEl.addEventListener('click', () => {
  const selectedDate = flatpickr.parseDate(dataTimeEl.value);
  const currentDate = new Date();
  const differenceDate = selectedDate - currentDate;
  if (differenceDate <= 0) {
    Notiflix.Notify.failure('Please choose a date in the future');
    startBtnEl.setAttribute('disabled', 'disabled');
    return;
  }
  const timerInterval = setInterval(() => {
    const leftTime = convertMs(selectedDate - new Date());
    daysEl.textContent = addLeadingZero(leftTime.days);
    hoursEl.textContent = addLeadingZero(leftTime.hours);
    minutesEl.textContent = addLeadingZero(leftTime.minutes);
    secondsEl.textContent = addLeadingZero(leftTime.seconds);

    if (
      leftTime.days === 0 &&
      leftTime.hours === 0 &&
      leftTime.minutes === 0 &&
      leftTime.seconds === 0
    ) {
      clearInterval(timerInterval);
      Notiflix.Notify.success('Time is up!');
      startBtnEl.setAttribute('disabled', 'disabled');
    }
  }, 1000);
});
