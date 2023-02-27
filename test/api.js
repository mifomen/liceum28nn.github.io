// import { points } from './data.js';
import { getData, renderTextQuestion, shuffleArray, renderAnswerArray } from './utils.js';


const template = /^\D\D\s\D\D\s?\d\D/;

const name = 'Горемыка Иван 11А';
console.log(`template.test(name)=${template.test(name)}`)

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
  if (document.querySelector('.tester-info').value =='') {
    localStorage.userName = document.querySelector('.tester-info').placeholder
  } else {
    localStorage.userName = document.querySelector('.tester-info').value;
  }


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

document.querySelector('body').onselectstart = 'return false';
document.querySelector('body').onmousedown = 'return false';

const btnStartDisabled = (state) => {
  const btns = document.querySelectorAll('.js-btn-start');
  for (const btn of btns) {
    btn.disabled = state;
  }
};

const valueToArray = function (item) {
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

const inputTesterName = document.querySelector('.tester-info');
inputTesterName.value = `${name}`
inputTesterName.focus();
inputTesterName.addEventListener('input', () => {
  const valueLength = inputTesterName.value.length;

  if (valueToArray(inputTesterName).length >= 2 && valueToArray(inputTesterName)[1].length >= 2) {
    inputTesterName.value = inputTesterName.value.trim();
    btnStartDisabled(false);
    // document.querySelector('.js-btn-start').disabled = false;
  } else {
    btnStartDisabled(true);
    // document.querySelector('.js-btn-start').disabled = true;
    inputTesterName.setCustomValidity('Должно быть только фамилия и имя, 2 слова');
  }

  inputTesterName.reportValidity();
});


export { DATA_GET_URL };
