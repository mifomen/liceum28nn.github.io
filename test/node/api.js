// import { points } from './data.js';
import { getData, renderTextQuestion, shuffleArray, renderAnswerArray } from './utils.js';

const template = /\d\w/;
// console.log(template.test("8Б"))

const person = {
  surname:"Горемыка",
  name:"Иван",
  class:"8А"
};
// console.log(`template.test(name)=${template.test(name)}`)

let randomLineQuests = []; // = shuffleArray(DATA);
const btnStartTest = document.querySelector('.btn-start-test');


const countQuestionBar = (countItems) => {
  const ul = document.createElement('ul');
  ul.className = 'progress-bar';

  if (document.querySelector('.js-init-game')) {
    document.querySelector('.js-init-game').appendChild(ul);
  }

  for (let j = 1; j <= countItems.length; j++) {
    const button = document.createElement('button');
    button.className = 'progress-bar__item';

    button.textContent = j;
    button.onselectstart = 'return false';
    button.onmousedown = 'return false'
    button.disabled = 'true';
    ul.appendChild(button);
  }
};

let DATA_GET_URL = './questions1.json';

const allBtns = document.querySelectorAll('.js-btn-start');
for (const allBtn of allBtns) {
  allBtn.addEventListener('click', (evt) => {
    DATA_GET_URL = allBtn.dataset.nameTest;
    startGame();
  })
}

const startGame = () => {
  document.querySelector('.frame-init-game').classList.add('hidden');
  // if (document.querySelector('.tester-info').value =='') {
  //   localStorage.userName = document.querySelector('.tester-info').placeholder
  // } else {
  //   localStorage.userName = document.querySelector('.tester-info').value;
  // }
  localStorage.user = `${inputTesterSurname.value} ${inputTesterName.value}  ${inputTesterClass.value}`

  getData((questionArray) => {
    randomLineQuests = shuffleArray(questionArray);
    countQuestionBar(randomLineQuests);
    document.querySelector('.js-init-game').classList.remove('hidden');
    document.querySelector('.progress-bar__item').classList.add('progress-bar__item--active');
    const fremeInitGame = document.querySelector('.js-init-game');
    renderTextQuestion(fremeInitGame, randomLineQuests[0]);
    // const divUl = document.querySelector('.progress-bar'); //render 1 question
    renderAnswerArray(randomLineQuests, fremeInitGame, randomLineQuests[0].arrayAnswers);

  });

};

// document.querySelector('body').onselectstart = 'return false';
// document.querySelector('body').onmousedown = 'return false';

const btnStartDisabled = (state) => {
  const btns = document.querySelectorAll('.js-btn-start');
  for (const btn of btns) {
    btn.disabled = state;
  }
};

const valueToArray = function (item) {
  // console.log(`item.value.split(' ')=${item.value.split(' ')}`)
  return item.value.split(' ');
};

const templateData = /[A-Za-zА-Яа-яЁё]/;

const testName = (item) => {
  if (templateData.test(item)) {
    return true;
  }
};

const checkEveryName = (item) => {
  if (item.length > 3) {
    return (valueToArray(item).every(testName));
  }
};

const inputTesterName = document.querySelector('.js-tester-info__name');
const inputTesterSurname = document.querySelector('.js-tester-info__surname');
const inputTesterClass = document.querySelector('.js-tester-info__class');

// inputTesterName.value = `${name}`;

inputTesterName.placeholder = `${person.name}`;
inputTesterSurname.placeholder = `${person.surname}`;
inputTesterClass.placeholder = `${person.class}`;



inputTesterSurname.focus();
inputTesterSurname.addEventListener('input', () => {
  const valueLength = inputTesterSurname.value.length;
  // console.log(`valueToArray(inputTesterSurname).length=${valueToArray(inputTesterSurname).length}`);
  if (valueToArray(inputTesterSurname).length >= 1) {
    inputTesterSurname.value = inputTesterSurname.value.trim();
    // btnStartDisabled(false);
    // document.querySelector('.js-btn-start').disabled = false;
  } else {
    btnStartDisabled(true);
    // document.querySelector('.js-btn-start').disabled = true;
    inputTesterSurname.setCustomValidity('Должно быть только 1-а фамилия');
  }
  inputTesterSurname.reportValidity();
});

inputTesterName.addEventListener('input', () => {
  const valueLength = inputTesterName.value.length;
  // console.log(`valueToArray(inputTesterName).length=${valueToArray(inputTesterName).length}`);
  if (valueToArray(inputTesterName).length >= 1) {
    inputTesterName.value = inputTesterName.value.trim();
    // btnStartDisabled(false);
    // document.querySelector('.js-btn-start').disabled = false;
  } else {
    // btnStartDisabled(true);
    // document.querySelector('.js-btn-start').disabled = true;
    inputTesterName.setCustomValidity('Должно быть только имя');
  }
  inputTesterName.reportValidity();
});

inputTesterClass.addEventListener('input', () => {
  const valueLength = inputTesterClass.value.length;
  // console.log(`valueToArray(inputTesterClass).length=${valueToArray(inputTesterClass).length}`);
  if (inputTesterClass.value.length >= 2) {
    inputTesterClass.value = inputTesterClass.value.trim();
    btnStartDisabled(false);
    // document.querySelector('.js-btn-start').disabled = false;
  } else {
    btnStartDisabled(true);
    // document.querySelector('.js-btn-start').disabled = true;
    inputTesterClass.setCustomValidity('Укажите класс 1 или 2 цифры и букву класса');
  }
  inputTesterClass.reportValidity();
});


export { DATA_GET_URL };
