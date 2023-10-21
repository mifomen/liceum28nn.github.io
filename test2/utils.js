import {startTestNameBtn, DATA_GET_URL,inputTesterSurname} from './api.js';

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
  span.classList.add('question-text');
  span.textContent = data.qustionText;
  // span.onselectstart = 'return false';
  // span.onmousedown = 'return false';

  if (data.questionImg !== "" && data.questionImg !== undefined) {
    const img = document.createElement('img');
    img.className = 'question-img';
    img.src=data.questionImg;

    span.classList.add('question-text-with-img');
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

  // for (const answer of shuffleArray(item)) {
    let numberAnswer = 1;
    for (const answer of item) {


    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'answer';
    // button.innerHTML = `${numberAnswer}. ${answer}`;
    button.innerHTML = answer;
    // button.onselectstart = 'return false';
    // button.onmousedown = 'return false';

    const allProgressItems = document.querySelectorAll('.progress-bar__item');
    button.onclick = (evt) => {

      document.querySelector('.progress-bar__item--active').disabled = 'true';
      choosenAnswers.push(evt.target.textContent);
      // console.log("choosenAnswers " + choosenAnswers)


      clearQuestionArea();
      // console.log(`i=${i} allProgressItems.length=${allProgressItems.length} allProgressItems=${allProgressItems[0]}`);
      // allProgressItems[i].classList.add('progress-bar__item--active');
      if (i < allProgressItems.length) {
        // if (document.querySelector('.js-status-show-all-question').checked) {
          allProgressItems[i].classList.add('progress-bar__item--active');
          let obj = findItemById(data, data[i].id);
          // let obj = findItemByText(data, data[i].qustionText);
          // console.log('obj= ',obj);
          renderTextQuestion(document.querySelector('.js-init-game'), obj);
        // }
        renderAnswerArray(data, document.querySelector('.js-init-game'), obj.arrayAnswers);
      }
      i++;
      // numberAnswer++;
      if ( allProgressItems.length + 1 == i ) {
        showAnswers(data, choosenAnswers);
      }

    }
    div.appendChild(button);
    // numberAnswer++

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
if (numberItem >= Math.round(rightAnswerLength*0.85) ) {
  // console.log(`${Math.round(rightAnswerLength*0.92)} >= ${numberItem}`)
   return '5';
 }
 if (numberItem >= Math.floor(rightAnswerLength*0.70)  ) {

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


const hideElements = () => {
  console.log('hide')
  if (document.querySelector('.js-load-panel')) {
    document.querySelector('.js-load-btns').style.display='none';

    const all = document.querySelectorAll('.js-load-panel')
    console.log(all.length)
    all.forEach((item) => {
      item.style.display='none';
      // item.remove()
    })
  }
}

// let URL;
const choosePullQuestions= (evt) => {

  if (document.querySelector('#buh').checked) {
    // console.log('выбрана бухгалтерия')
    // URL = 'buh.json';
    return 'buh.json';
  }
  if (document.querySelector('#platform').checked) {
    console.log('выбрана платформа')
    // URL = 'platform.json';
    return 'platform.json';
  }
};

const renderChoiseTest = () => {
  // document.querySelector('.js-body') ||
  if (false ) {
  const body = document.querySelector('.js-body')
  console.log('nice find body')

  const labelChoise = document.createElement('label');
  labelChoise.type="radio";
  labelChoise.textContent="Тест 1С Бухгалтерия по платформе"
  labelChoise.classList.add('label-btn');
  labelChoise.for="testChoose";
  labelChoise.classList.add('js-load-pangel');



  const inputChoise = document.createElement('input');
  inputChoise.type="radio";
  // inputChoise.classList.add('vh');
  // inputChoise.textContent="Тест 1С Профессионал по платформе"
  inputChoise.classList.add('input-btn');
  inputChoise.id="buh";
  inputChoise.name="test"
  inputChoise.checked = true;
  inputChoise.classList.add('js-load-pangel');
  labelChoise.appendChild(inputChoise);
  body.appendChild(labelChoise);

  const labelChoise2 = document.createElement('label');
  labelChoise2.type="radio";
  labelChoise2.textContent="Тест 1С Профессионал по платформе"
  labelChoise2.classList.add('label-btn');
  labelChoise2.classList.add('js-load-pangel');
  labelChoise2.for="testChoose";
  body.appendChild(labelChoise2);


  const inputChoise2 = document.createElement('input');
  inputChoise2.type="radio";
  // inputChoise2.style.cssText="display: none;";
  inputChoise2.textContent="";
  inputChoise2.classList.add('js-load-pangel');
  inputChoise2.name="test";
  inputChoise2.classList.add('input-btn');
  inputChoise2.id="platform";
  labelChoise2.appendChild(inputChoise2);
  body.appendChild(labelChoise2);
  // body.appendChild(inputChoise2);



  const btnForLoad = document.createElement('button');
  btnForLoad.type="button";
  // btnForLoad.style.cssText="display: none;";
  btnForLoad.textContent="Загрузить вопросы";
  btnForLoad.name="load-test";
  btnForLoad.classList.add('load-button');
  btnForLoad.classList.add('js-load-pangel');
  btnForLoad.classList.add('js-load-btns')
  btnForLoad.addEventListener('click', hideElements);
  btnForLoad.addEventListener('click', choosePullQuestions);
  body.appendChild(btnForLoad);
 }
};


const btnForLoad = document.querySelector('.js-load-btns')
btnForLoad.addEventListener('click', hideElements);
btnForLoad.addEventListener('click', choosePullQuestions);


// renderChoiseTest();
// console.log('renderChoiseTest();= ' + renderChoiseTest());

const pullQuestion = ['buh.json', 'platform.json'];

const getData = (onSuccess) => {
  // const URL = choosePullQuestions()
  fetch(choosePullQuestions())
    .then((response) => response.json())
    .then((questionsArray) => {
      onSuccess(questionsArray);
    });
};

let pointsTesting = 0;

// const showAnswers = (arrayRightAnswer, arrayGetAnswer) => {


const fillArray = (arr,elem) => {
  arr.forEach(item => {
    const areaQuestion = document.createElement('div');
    areaQuestion.classList.add('frame-lose-question')

    const spanQuestion = document.createElement('span');
    spanQuestion.classList.add('frame-lose-question__question')
    spanQuestion.innerHTML = item.qustionText;
    areaQuestion.appendChild(spanQuestion);

    const spanAnswer = document.createElement('span');
    spanAnswer.classList.add('frame-lose-question__question-answer')
    const rightNumber = [item.numberRightAnswer-1];
    spanAnswer.innerHTML = item.arrayAnswers[rightNumber];
    areaQuestion.appendChild(spanAnswer);

    elem.appendChild(areaQuestion);

  })
}



const pullLoseQuestion = new Array();
const showAnswerAsInTrainer = (questionArray) => {
  document.querySelector('.js-init-game').classList.add('hidden');
  const div = document.createElement('div');
  div.className = 'frame-resault-game';
  // let i = 0;
  let numberQuestion = 0;
  let numberRightAnswer = 0;
  // console.log(`questionArray.length =${questionArray.length}`);
  const renderAnswer = (number) => {

  questionArray.forEach((item, count ) => {


      if (count === number) {
        const spanElement = document.createElement('span');
        spanElement.classList.add('resaultAnswer');
        // spanElement.classList.add('rightResaultAnswer');
        const rightNumber = [item.numberRightAnswer-1];
        const allRightAnswer = [];

        spanElement.innerHTML = `${startTestNameBtn}. Вопрос №${++count}: <u>${item.qustionText}</u>`;
          // Все ответы: ${allRightAnswer}
          // <span class="red">
          //   Правильный ответ: <br>
          //   </span>
            // ${item.arrayAnswers[rightNumber]}


            const checkRightAnswer = (evt) => {
              if (document.querySelector('.js-btn-next-question')) {
                document.querySelector('.js-btn-next-question').disabled=false;
              }
              // if (parseInt(evt.target.dataset.count,10) === parseInt(rightNumber,10)) {
                if (evt.target.classList.contains('js-mark')) {
                // console.log('checkRightAnswer')
                evt.target.classList.add('rightAnswerOnCLick')
                // console.log(`numberRightAnswer=${numberRightAnswer}`)
                // if (!evt.target.classList.contains('rightAnswerOnCLick')) {
                  numberRightAnswer++
                // }
              } else {
                document.querySelector('.js-mark').classList.add('rightAnswerOnCLick')

                evt.target.classList.add('loseAnswerOnCLick')
                pullLoseQuestion.push(item)
                // document.querySelector('.resaultAnswer .js-mark').classList.add('rightAnswerOnCLick')
              }
              // console.log(`evt.target.dataset.count = ${evt.target.dataset.count}`)
              // console.log(`rightNumber = ${rightNumber} evt.dataset.count = ${evt.target.dataset.count}`);

            }
            const changeWidthImage = (evt) => {
              evt.target.classList.toggle('question-image--clicked');

            }
            if (item.questionImg != undefined || item.questionImg != "") {
              const elemImage = document.createElement('img');
              elemImage.src = item.questionImg;
              elemImage.classList.add("question-image");
              elemImage.alt = item.questionImg;
              elemImage.width="320"
              elemImage.addEventListener('click',changeWidthImage)
              spanElement.appendChild(elemImage);
            }

          let arrShuffleAnswers = item.arrayAnswers;
          if (item.shuffleAnswers) {
            arrShuffleAnswers = shuffleArray(arrShuffleAnswers);
          }



        //  const shuffleAnswers = shuffleArray(item.arrayAnswers);
          let index = 0;

          let rightAnswer = item.arrayAnswers[rightNumber];
          rightAnswer = rightAnswer.substring(3, rightAnswer.length).trim();


          arrShuffleAnswers.forEach((item1,count) => {  //отрисовываем все ответы на вопрос
            let strItem = '';
          // if (item1 != item.arrayAnswers[rightNumber]) {
            const answerElement = document.createElement('span');

            if (item.clearAnswers) {
              strItem =  item1.substring(3,item1.length);
              strItem = strItem.trim();
              // strItem = `${++index}. ${strItem}`;
            } else {
              strItem = item1.substring(3,item1.length);
            }

            answerElement.textContent = `${++index}. ${strItem}`;;
            answerElement.classList.add("resaultAnswerSpan")
            answerElement.dataset.count = count;


            if (rightAnswer === strItem) {
              console.group()
              console.log(`rightAnswer= ${rightAnswer}`);
              console.log((`strItem = ${strItem}`));
              console.groupEnd();
              answerElement.classList.add('js-mark')
              // answerElement.classList.add("red")
            }
            answerElement.addEventListener('click', checkRightAnswer)
            spanElement.appendChild(answerElement);
        })

        div.appendChild(spanElement);
        // count


        const btnNextQuestion = document.createElement('button');
        btnNextQuestion.textContent="Следующий вопрос"
        btnNextQuestion.classList.add("btn-next-question")
        btnNextQuestion.classList.add("js-btn-next-question")
        btnNextQuestion.disabled=true;
        btnNextQuestion.addEventListener('click', renderNextQuestion)
        div.appendChild(btnNextQuestion);



        // const btnConst = document.createElement('button');
        // div.appendChild(btnConst);
      }
    })
    }
     function renderNextQuestion () {
      // console.log(`renderNextQuestion`)
      document.querySelector('.frame-resault-game').innerHTML="";
      numberQuestion++;


      const a = Math.floor(questionArray.length / 10);
      const b = Math.floor(questionArray.length % 10);

      const btnReloadPage = () => {
        location.reload();
      }
      if (numberQuestion === 10 ) { //10 это количество вопросов
        const resaultWork = document.createElement('span');
        resaultWork.innerHTML=`${startTestNameBtn}.<br>Набрали правильных ${numberRightAnswer}/10 <br> Клик, чтобы начать сначала!`
        resaultWork.classList.add("resault-work");
        resaultWork.addEventListener('click', btnReloadPage)

        div.appendChild(resaultWork);

        fillArray(pullLoseQuestion,div)
      } else if (questionArray.length <= 9 && numberQuestion<=9) {
        const resaultWork = document.createElement('span');
        resaultWork.innerHTML=`${startTestNameBtn}.<br.Набрали правильных ${numberRightAnswer}/2 <br> Клик, чтобы начать сначала!`
        resaultWork.classList.add("resault-work");
        resaultWork.addEventListener('click', btnReloadPage)

        div.appendChild(resaultWork);


        fillArray(pullLoseQuestion,div)
      }

      renderAnswer(numberQuestion);


    }

    renderAnswer(numberQuestion)



    // renderAnswer(1)
    // renderAnswer(2)


  document.body.appendChild(div);
}

const showRightAnswers = (questionArray) => {
  document.querySelector('.js-init-game').classList.add('hidden');
  const div = document.createElement('div');
  div.className = 'frame-resault-game';
  // let i = 0;
  questionArray.forEach((item, count ) => {
    const spanElement = document.createElement('span');
    spanElement.classList.add('resaultAnswer');
    spanElement.classList.add('rightResaultAnswer');
    const rightNumber = [item.numberRightAnswer-1];


    const allRightAnswer = [];



    spanElement.innerHTML = `
      В вопросе №${++count}: <u> ${item.qustionText}</u><br>
      Все ответы: ${allRightAnswer}
      <span class="red">
        Правильный ответ: <br>
        ${item.arrayAnswers[rightNumber]}
      </span>
    `;

    item.arrayAnswers.forEach((item1) => {
      // if (item1 != item.arrayAnswers[rightNumber]) {
        const spanElement1 = document.createElement('span');
        spanElement1.innerHTML = item1;
        spanElement.appendChild(spanElement1);
        // const s = `${item1} <br>`
        // allRightAnswer.push(s)
      // }
    })

    div.appendChild(spanElement);
    // count
  })
  document.body.appendChild(div);
}

const showAnswers = (arrayRightAnswer, arrayGetAnswer) => {
  document.querySelector('.js-init-game').classList.add('hidden');
  const div = document.createElement('div');
  div.className = 'frame-resault-game';
  // div.onselectstart = 'return false';
  // div.onmousedown = 'return false';

  for (let i = 0; i < arrayGetAnswer.length; i++) {
    const spanElement = document.createElement('span');
    spanElement.classList.add('resaultAnswer');

    // spanElement.onselectstart = 'return false';
    // spanElement.onmousedown = 'return false';

    // if (choosenAnswers[i] === arrayRightAnswer[i].arrayAnswers[0]) {
    // console.log("allMass.numberRightAnswer " + allMass)
    const indexRightAnswer = arrayRightAnswer[i].arrayAnswers[arrayRightAnswer[i].numberRightAnswer-1]

    // if (choosenAnswers[i] === arrayRightAnswer[i].arrayAnswers[0]) {
    if (choosenAnswers[i] === indexRightAnswer) {
      spanElement.classList.add('rightResaultAnswer');
      spanElement.innerHTML = `
        В вопросе №${i + 1}: <u> ${arrayRightAnswer[i].qustionText}</u>
        <span>Ваш ответ: <span class="red">правильный</span></span>
        <span class="corrent-answer">${indexRightAnswer}</span>`;
        {/* <span class="corrent-answer">${arrayRightAnswer[i].arrayAnswers[0]}</span>`; */}

      pointsTesting++
    } else {
      spanElement.classList.add('loseResaultAnswer');
      spanElement.innerHTML = `
        В вопросе №${i + 1}: <u> ${arrayRightAnswer[i].qustionText} </u>
        <span>Ваш ответ: <span class="red">неправильный</span></span>
        <span class="not-corrent-answer">${arrayGetAnswer[i]}</span>
        <span>Правильный ответ: ${indexRightAnswer}</span>`;
        // <span>Правильный ответ: ${arrayRightAnswer[i].arrayAnswers[0]}</span>`;
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
  Оценка 4 если >= ${Math.round(choosenAnswers.length*0.70)} правильных ответов (75%)<br>
  Оценка 5 если >= ${Math.floor(choosenAnswers.length*0.85)} правильных ответов (90%)<br>
  `;

  const optionsTime  = {
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
  // console.log(localStorage)
  // alert(localStorage)
  div.appendChild(spanElement);
  document.body.appendChild(div);
};


const sliceArrayForExam = (startArray,startSliced, endSliced = 15) => {
  let newArr = new Array();
  for (const elementBasicArray of startArray) {
    newArr.push(elementBasicArray);
  }
  // newArr.sort(() => Math.random() - 0.5)
  const bArray = newArr.slice(startSliced,startSliced + endSliced)
  return bArray;
}

const checkOnRightIdOnItems = (dataArray) => {
  const set = new Set();
  let number = 0;
  const setSubThemes = new Set();
  dataArray.forEach(item => {
    if (item.subTheme != "") {
     number++
      setSubThemes.add(item.subTheme);
    }
    if (set.has(item.qustionText)) {
      console.log(`!set.has(item.id) = ${!set.has(item.id)} ${item.id}`);
    }
    set.add(item.qustionText);
    // console.log(`item.id= ${item.id}`)
  });
  // console.log(`set length = ${set.size} dataArray length = ${dataArray.length} `);

  // console.log(setSubThemes.forEach(item => {
  //   // console.log(`item=${item}`)
  // }))
  // console.log(`number= ${number}`)
}

const saveHowOpenAnswer = () => {
  const inputCheckBox = document.querySelector('.js-status-show-answer');

  if (inputCheckBox.checked) {
    // console.log(`localStorage.getItem('statusShowAnswer') = ${localStorage.getItem('statusShowAnswer')}`)
    localStorage.setItem('statusShowAnswer', 'true');
    // chrome.storage.local.set(packet);
  } else {
    localStorage.setItem('statusShowAnswer', 'false');
    // chrome.storage.local.set(packet);
    // console.log(`localStorage.getItem('statusShowAnswer') = ${localStorage.getItem('statusShowAnswer')}`)
  }
}




export {showAnswerAsInTrainer,showRightAnswers, saveHowOpenAnswer,checkOnRightIdOnItems,sliceArrayForExam,getData, showLocal, clearQuestionArea, shuffleArray, renderTextQuestion, getRandomInt, renderAnswerArray };
