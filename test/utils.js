import {DATA_GET_URL,inputTesterSurname} from './api.js';

const findItemById = function (items, resolve) {
  return items.find(item => item.id === resolve);
};

const findItemByText = function (items, resolve) {
  return items.find(item => item.qustionText.toString() === resolve);
};

const getRandomInt = (min, max) => {
  if (min >= max) {
    return Math.floor(Math.random() * (min - max + 1)) + max;
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
};


const clearQuestionArea = () => {
  if (document.querySelector('.area-choose-answer')) {
    document.querySelector('.area-choose-answer').remove();
  }
  if (document.querySelector('.question-text')) {
    document.querySelector('.question-text').remove();
  }
}

const renderTextQuestion = (parent, data) => {
  const span = document.createElement('span');
  span.className = 'question-text';
  span.innerHTML = data.qustionText;
  span.onselectstart = 'return false';
  span.onmousedown = 'return false';

  if (data.questionImg !== "" && data.questionImg !== undefined) {
    const img = document.createElement('img');
    img.className = 'question-img';
    img.src=data.questionImg;
    // console.log(data.questionImg)
    // img.alt="data.questionImg"
    span.appendChild(img);
  }
  parent.appendChild(span);
}

const shuffleArray = (basicArray) => {
  let newArr = new Array();
  for (let elementBasicArray of basicArray) {
    newArr.push(elementBasicArray);
  }
  return newArr.sort(() => Math.random() - 0.5);
  // return newArr;
};



let i = 1;
const choosenAnswers = [];
const renderAnswerArray = (data, parent, item) => {
  if (document.querySelector('.area-choose-answer')) {
    document.querySelector('.area-choose-answer').remove();
  }

  const div = document.createElement('div');
  div.classList.add('area-choose-answer');
  if (item.length <= 4) {
    div.classList.add('grid-2x2');
  } else {
    div.classList.add('grid-3x3');
  }

  for (const answer of shuffleArray(item)) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'answer';
    button.innerHTML = answer;
    button.onselectstart = 'return false';
    button.onmousedown = 'return false';

    const allProgressItems = document.querySelectorAll('.progress-bar__item');
    button.onclick = (evt) => {
      document.querySelector('.progress-bar__item--active').disabled = 'true';
      choosenAnswers.push(evt.target.textContent);
      clearQuestionArea();
      // console.log(`i=${i} allProgressItems.length=${allProgressItems.length} allProgressItems=${allProgressItems[0]}`);
      // allProgressItems[i].classList.add('progress-bar__item--active');
      if (i < allProgressItems.length) {
        allProgressItems[i].classList.add('progress-bar__item--active');
        let obj = findItemById(data, data[i].id);
        // console.log('obj= ',obj);
        renderTextQuestion(document.querySelector('.js-init-game'), obj);
        renderAnswerArray(data, document.querySelector('.js-init-game'), obj.arrayAnswers);
      }
      i++;
      if ( allProgressItems.length + 1 == i ) {
        showAnswers(data, choosenAnswers);
      }
    }
    div.appendChild(button);
  }
  parent.appendChild(div);

};

//  установить значение для ключа
// localStorage.test = 2;
//  получить значение по ключу
// alert( localStorage.test ); // 2
// удалить ключ
// delete localStorage.test;

const showLocal = () => {
  for (let key in localStorage) {
    console.log(`key=${key}`);
  }
};

// showLocal();
const pointsResault = (numberItem,rightAnswerLength) => {
//  if (Math.round(numberItem*0.52) < numberItem) {
//    return '2';
//  }
if (numberItem >= Math.round(rightAnswerLength*0.92) ) {
  // console.log(`${Math.round(rightAnswerLength*0.92)} >= ${numberItem}`)
   return '5';
 }
 if (numberItem >= Math.floor(rightAnswerLength*0.75)  ) {

   return '4';
 }
 if (numberItem >= Math.floor(rightAnswerLength*0.5) ) {

   return '3';
 }
 return '2';
//  Оценка 3 если >= ${Math.floor(choosenAnswers.length*0.5)} правильных ответов (50%)<br>
// Оценка 4 если >= ${Math.round(choosenAnswers.length*0.75)} правильных ответов (75%)<br>
// Оценка 5 если >= ${Math.floor(choosenAnswers.length*0.92)} правильных ответов (90%)<br>
}

const getData = (onSuccess) => {
  fetch(DATA_GET_URL)
    .then((response) => response.json())
    .then((questionsArray) => {
      onSuccess(questionsArray);
    });
};

let pointsTesting = 0;
const showAnswers = (arrayRightAnswer, arrayGetAnswer) => {
  document.querySelector('.js-init-game').classList.add('hidden');
  const div = document.createElement('div');
  div.className = 'frame-resault-game';
  div.onselectstart = 'return false';
  div.onmousedown = 'return false';

  for (let i = 0; i < arrayGetAnswer.length; i++) {
    const spanElement = document.createElement('span');
    spanElement.classList.add('resaultAnswer');

    spanElement.onselectstart = 'return false';
    spanElement.onmousedown = 'return false';

    if (choosenAnswers[i] === arrayRightAnswer[i].arrayAnswers[0]) {
      spanElement.classList.add('rightResaultAnswer');
      spanElement.innerHTML = `
        В вопросе №${i + 1}: <u> ${arrayRightAnswer[i].qustionText}</u>
        <span>Ваш ответ: <span class="red">правильный</span></span>
        <span class="corrent-answer">${arrayRightAnswer[i].arrayAnswers[0]}</span>`;
      pointsTesting++
    } else {
      spanElement.classList.add('loseResaultAnswer');
      spanElement.innerHTML = `
        В вопросе №${i + 1}: <u> ${arrayRightAnswer[i].qustionText} </u>
        <span>Ваш ответ: <span class="red">неправильный</span></span>
        <span class="not-corrent-answer">${arrayGetAnswer[i]}</span>
        <span>Правильный ответ: ${arrayRightAnswer[i].arrayAnswers[0]}</span>`;
    }
    div.appendChild(spanElement);
  }
  // console.log(`pointsTesting=${pointsTesting}`)
  localStorage.pointsTesting = pointsTesting;
  localStorage.pointsLength = arrayGetAnswer.length;

  const spanElement = document.createElement('span');
  spanElement.classList.add('resaultAnswer');
  spanElement.classList.add('resaultAnswerFinal');
  spanElement.onselectstart = 'return false';
  spanElement.onmousedown = 'return false';
  spanElement.innerHTML=`${localStorage.user} овтетил:<br>${pointsTesting} правильных ответ(а) из ${choosenAnswers.length}<br>
  Ваша оценка ${pointsResault(pointsTesting,choosenAnswers.length)} <br>
  Оценка 3 если >= ${Math.floor(choosenAnswers.length*0.5)} правильных ответов (50%)<br>
  Оценка 4 если >= ${Math.round(choosenAnswers.length*0.75)} правильных ответов (75%)<br>
  Оценка 5 если >= ${Math.floor(choosenAnswers.length*0.92)} правильных ответов (90%)<br>
  `;

  const   optionsTime  = {
    // era: 'short', //long
    // year: 'numeric',
    // month: 'long',
    // day: 'numeric',
    // weekday: 'long',
    // timezone: 'UTC',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  };

  const uniqId = `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString('ru',optionsTime)}`;
  // console.log('uniqId',uniqId)
  localStorage.setItem(uniqId,`${inputTesterSurname.value} ${uniqId} ${localStorage.user} ${pointsTesting} из ${choosenAnswers.length}`);
  // console.log(`${parseInt(new Date().getTime() / 1000)}`)
  console.log(localStorage)
  // alert(localStorage)
  div.appendChild(spanElement);
  document.body.appendChild(div);
};

export { getData, showLocal, clearQuestionArea, shuffleArray, renderTextQuestion, getRandomInt, renderAnswerArray };
