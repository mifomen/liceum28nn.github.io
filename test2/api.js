// import { points } from './data.js';
import {
  showRightAnswers,
  saveHowOpenAnswer,
  checkOnRightIdOnItems,
  sliceArrayForExam,
  getData,
  renderTextQuestion,
  shuffleArray,
  renderAnswerArray,
  showAnswerAsInTrainer,
} from "./utils.js";


let startTestNameBtn;
const template = /\d\w/;
// console.log(template.test("8Б"))

const person = {
  surname: "Фамилия",
  name: "Имя",
  class: "Стажер",
};
// console.log(`template.test(name)=${template.test(name)}`)

let randomLineQuests = []; // = shuffleArray(DATA);
const btnStartTest = document.querySelector(".btn-start-test");

const countQuestionBar = (countItems) => {
  const ul = document.createElement("ul");
  ul.className = "progress-bar";

  if (document.querySelector(".js-init-game")) {
    document.querySelector(".js-init-game").appendChild(ul);
  }

  for (let j = 1; j <= countItems.length; j++) {
    const button = document.createElement("button");
    button.className = "progress-bar__item";

    button.textContent = j;
    // button.onselectstart = 'return false';
    // button.onmousedown = 'return false'
    button.disabled = "true";
    ul.appendChild(button);
  }
};

let DATA_GET_URL = "./questions8-1с-all.json";

let exams = false;
let startSliced = 0;
const allBtns = document.querySelectorAll(".js-btn-start");

for (const allBtn of allBtns) {
  allBtn.addEventListener("click", (evt) => {
    DATA_GET_URL = allBtn.dataset.nameTest;
    // console.log();
    if (allBtn.dataset.nameRandom) {
      exams = true;
    }
    if (allBtn.dataset.startSliced) {
      startSliced = parseInt(allBtn.dataset.startSliced, 10);
      // console.log(`startSliced = ${startSliced}`)
    }

    startGame();
  });
}

const startGameListener = () => {
  const allBtns = document.querySelectorAll(".js-btn-start");

  for (const allBtn of allBtns) {
    allBtn.addEventListener("click", (evt) => {
      DATA_GET_URL = allBtn.dataset.nameTest;
      // console.log();
      if (allBtn.dataset.nameRandom) {
        exams = true;
      }
      if (allBtn.dataset.startSliced) {
        startSliced = parseInt(allBtn.dataset.startSliced, 10);
        // console.log(`startSliced = ${startSliced}`)
      }

      startGame();
    });
  }
};

const startGame = () => {
  document.querySelector(".bank-question").remove();
  saveHowOpenAnswer();
  document.querySelector(".frame-init-game").classList.add("hidden");
  // if (document.querySelector('.tester-info').value =='') {
  //   localStorage.userName = document.querySelector('.tester-info').placeholder
  // } else {
  //   localStorage.userName = document.querySelector('.tester-info').value;
  // }
  localStorage.user = `${inputTesterSurname.value} ${inputTesterName.value}  ${inputTesterClass.value}`;

  getData((questionArray) => {
    checkOnRightIdOnItems(questionArray);
    showAnswerAsInTrainer(sliceArrayForExam(questionArray, startSliced, 10));

    // if ((document.querySelector(".js-status-show-answer").checked = true)) {
    //   showAnswerAsInTrainer(sliceArrayForExam(questionArray, startSliced, 10));
    // } else {
    //   if (document.querySelector(".js-status-show-all-question").checked) {
    //     showRightAnswers(sliceArrayForExam(questionArray, startSliced, 10));
    //   } else {
    //     if (exams) {
    //       randomLineQuests = sliceArrayForExam(
    //         shuffleArray(questionArray),
    //         0,
    //         14
    //       );
    //     } else {
    //       randomLineQuests = sliceArrayForExam(questionArray, startSliced, 10);
    //       // randomLineQuests = sliceArrayForExam(shuffleArray(questionArray),startSliced);
    //       // shuffleArray(questionArray)
    //     }
    //   }
    // }
    // if (!document.querySelector(".js-status-show-all-question").checked) {
    //   countQuestionBar(randomLineQuests);
    //   document.querySelector(".js-init-game").classList.remove("hidden");
    //   if (document.querySelector(".progress-bar__item")) {
    //     document
    //       .querySelector(".progress-bar__item")
    //       .classList.add("progress-bar__item--active");
    //   }
    //   const fremeInitGame = document.querySelector(".js-init-game");

    //   if (document.querySelector(".js-status-show-answer").checked != true) {
    //     //  была ошбка потом решить
    //     renderTextQuestion(fremeInitGame, randomLineQuests[0]); //mifomen
    //     // const divUl = document.querySelector('.progress-bar'); //render 1 question
    //     renderAnswerArray(
    //       randomLineQuests,
    //       fremeInitGame,
    //       randomLineQuests[0].arrayAnswers
    //     );
    //   }
    // }
  });
};

// document.querySelector('body').onselectstart = 'return false';
// document.querySelector('body').onmousedown = 'return false';

const btnStartDisabled = (state) => {
  const btns = document.querySelectorAll(".js-btn-start");
  for (const btn of btns) {
    btn.disabled = state;
  }
};

const valueToArray = function (item) {
  // console.log(`item.value.split(' ')=${item.value.split(' ')}`)
  return item.value.split(" ");
};

const templateData = /[A-Za-zА-Яа-яЁё]/;

const testName = (item) => {
  if (templateData.test(item)) {
    return true;
  }
};

const checkEveryName = (item) => {
  if (item.length > 3) {
    return valueToArray(item).every(testName);
  }
};

const inputTesterName = document.querySelector(".js-tester-info__name");
export const inputTesterSurname = document.querySelector(
  ".js-tester-info__surname"
);
const inputTesterClass = document.querySelector(".js-tester-info__class");

// inputTesterName.value = `${name}`;

inputTesterName.placeholder = `${person.name}`;
inputTesterSurname.placeholder = `${person.surname}`;
inputTesterClass.placeholder = `${person.class}`;

inputTesterName.value = `${person.name}`;
inputTesterSurname.value = `${person.surname}`;
inputTesterClass.value = `${person.class}`;

inputTesterSurname.focus();
inputTesterSurname.addEventListener("input", () => {
  const valueLength = inputTesterSurname.value.length;
  // console.log(`valueToArray(inputTesterSurname).length=${valueToArray(inputTesterSurname).length}`);
  if (valueToArray(inputTesterSurname).length >= 1) {
    inputTesterSurname.value = inputTesterSurname.value.trim();
    // btnStartDisabled(false);
    // document.querySelector('.js-btn-start').disabled = false;
  } else {
    //  btnStartDisabled(false); //btnStartDisabled(true);
    // document.querySelector('.js-btn-start').disabled = true;
    inputTesterSurname.setCustomValidity("Должно быть только 1-а фамилия");
  }
  inputTesterSurname.reportValidity();
});

inputTesterName.addEventListener("input", () => {
  const valueLength = inputTesterName.value.length;
  // console.log(`valueToArray(inputTesterName).length=${valueToArray(inputTesterName).length}`);
  if (valueToArray(inputTesterName).length >= 1) {
    inputTesterName.value = inputTesterName.value.trim();
    btnStartDisabled(false);
    // document.querySelector('.js-btn-start').disabled = false;
  } else {
    btnStartDisabled(true);
    // document.querySelector('.js-btn-start').disabled = true;
    inputTesterName.setCustomValidity("Должно быть только имя");
  }
  inputTesterName.reportValidity();
});

inputTesterClass.addEventListener("input", () => {
  const valueLength = inputTesterClass.value.length;
  // console.log(`valueToArray(inputTesterClass).length=${valueToArray(inputTesterClass).length}`);
  if (inputTesterClass.value.length >= 2) {
    inputTesterClass.value = inputTesterClass.value.trim();
    btnStartDisabled(false);
    // document.querySelector('.js-btn-start').disabled = false;
  } else {
    btnStartDisabled(false);
    // document.querySelector('.js-btn-start').disabled = true;
    inputTesterClass.setCustomValidity(
      "Укажите класс 1 или 2 цифры и букву класса"
    );
  }
  inputTesterClass.reportValidity();
});

const btnShowAllQuestionsWithAnswer = document.querySelector(
  ".js-status-show-all-question"
);
btnShowAllQuestionsWithAnswer.checked = false;
const btnShowRightAnswerAfterChoise = document.querySelector(
  ".js-status-show-answer"
);
btnShowRightAnswerAfterChoise.checked = true;

// if (btnShowRightAnswerAfterChoise.checked) {

// } else {

// }

const btnStatExam = document.querySelector(".js-btn-exam ");
const labelShowAnswer = document.querySelector(".show-answer");
labelShowAnswer.checked;
btnShowAllQuestionsWithAnswer.addEventListener("click", (evt) => {
  if (evt.target.checked) {
    // console.log(`evt.this.checked=${evt.target.checked}`)
    btnShowRightAnswerAfterChoise.checked = false;
    localStorage.setItem("statusShowAnswer", "true");
    btnStatExam.classList.toggle("text-decor");
    btnStatExam.disabled = true;
    labelShowAnswer.classList.toggle("text-decor");
    btnShowRightAnswerAfterChoise.disabled = true;
  } else {
    // console.log(`evt.this.checked=${evt.target.checked}`)
    btnShowRightAnswerAfterChoise.disabled = false;
    localStorage.setItem("statusShowAnswer", "false");
    btnShowRightAnswerAfterChoise.classList.toggle("text-decor");
    btnStatExam.classList.toggle("text-decor");
    labelShowAnswer.classList.toggle("text-decor");
    btnStatExam.disabled = false;
  }
});

document.querySelector(".js-tester-info__class").classList.add("vh");

const startGameOnClick = (evt) => {

  startTestNameBtn = evt.target.textContent;
  DATA_GET_URL = evt.target.dataset.nameTest;
  if (evt.target.dataset.nameRandom) {
    exams = true;
  }
  if (evt.target.dataset.startSliced) {
    startSliced = parseInt(evt.target.dataset.startSliced, 10);
    // console.log(`startSliced = ${startSliced}`);
  }
  const nameSelected = `selected-${evt.target.dataset.selected}`;
  localStorage.setItem(`data-${nameSelected}`, evt.target.dataset.selected);
  // console.log(`evt.dataset.selected ${evt.target.dataset.selected}`);

  // console.log(localStorage.getItem(nameSelected))
  startGame();
};

document.addEventListener("DOMContentLoaded", btnStartDisabled(false));
document.addEventListener("DOMContentLoaded", () => {
  // console.log(`localStorage.getItem('statusShowAnswer') = ${localStorage.getItem('statusShowAnswer')}`)
  const inputCheckBox = document.querySelector(".js-status-show-answer");
  if (localStorage.getItem("statusShowAnswer") === "true") {
    inputCheckBox.checked = true;
  } else {
    inputCheckBox.checked = false;
  }


});

const clearLocalStorage = () => {
  const result = prompt("Снять зеленое выделение с открытых тестов?", "Да");
  if (result === "Да") {
    localStorage.clear();
    location.reload();
  }
}
const showBankQuestionPull = (length) => {
  const elemBankQUestion = document.querySelector(".js-bank-count");
  elemBankQUestion.addEventListener('click',clearLocalStorage)

  elemBankQUestion.innerHTML = `Платформа: ${length + 0}/${length + 0} ${
    Math.round(((length + 1) / (length + 1) * 10000) / 100)
  }%`;
};

const checkHowMany = (elem,mas) => {
  let i = 0;
  if (mas.includes(elem)) {
    i++;
  }
  if (i = 0)  {
    return 0
  }
  return i;
}

const showNumberBtn = (item) => {
  const arrSubThemes = new Array();
  const allSubThemes = new Set();
  item.forEach(item => {
    allSubThemes.add(item.subTheme);
    arrSubThemes.push(item.subTheme);
  })
  const arr  = new Array();
  allSubThemes.forEach(item => {
    arr.push(item)
  })
  // console.log(`${arrSubThemes.length}`);
  // console.log(arr[0] + arrSubThemes[555]);
  // console.log(checkHowMany(arr[1],arrSubThemes));

  length = item.length;
  const a = Math.floor(item.length / 10);
  const b = Math.floor(item.length % 10);

  const parent = document.querySelector(".js-all-pulls-buttons");

  for (let i = 0; i <= a; i++) {
    const btn = document.createElement("button");
    btn.classList.add("btn-start-test");
    btn.classList.add("js-btn-start");
    btn.type = "button";
    btn.addEventListener("click", startGameOnClick);
    btn.dataset.selected = i;
    btn.dataset.nameTest = "questions8-1с-all.json";
    if (i === a) {

      btn.textContent = `П:1С ${i * 10 + 1}-${i * 10 + b}`;
    } else {
      btn.textContent = `П:1С ${i * 10 + 1}-${i * 10 + 10}`;
    }

    if (b === 0) {
      btn.dataset.startSliced = `${item.length - 1}`;
    } else {
      btn.dataset.startSliced = `${i * 10}`;
    }
    parent.appendChild(btn);
  }

  // if (b != 0) {
  //   for (let i=0; i<=b; i++) {
  //     const btn = document.createElement('button')
  //     btn.classList.add('btn-start-test')
  //     btn.classList.add('js-btn-start')
  //     btn.type="button"
  //     btn.addEventListener('click', startGameOnClick);
  //     btn.dataset.nameTest="questions8-1с-all.json"
  //     btn.innerHTML=`П:1С ${i*15+1}-${i*15+15}`
  //     btn.dataset.startSliced=`${i*15}`
  //     parent.appendChild(btn)
  //   }
  // }

  // btn.dataset.startSliced="291"
};

const  checkChoosenQuestion = (length) => {
  const a = Math.floor(length / 10);
  const b = Math.floor(length % 10);
  // console.log(`a= ${a}`)
  for (let index = 0; index<= a; index++) {
    const checkItemInStorage = `data-selected-${index}`;
    if (localStorage.getItem(checkItemInStorage)) {
      document.querySelector(`[data-selected="${index}"]`).classList.add('btn-start-test--choosen');
    }
    if (localStorage.getItem('data-selected-1')) {
      // alert('123')
    }
    // const nameSelected = `selected-${evt.target.dataset.selected}`;
    // localStorage.setItem(`data-${nameSelected}`, evt.target.dataset.selected);
    // console.log(`evt.dataset.selected ${evt.target.dataset.selected}`);
  }
  // if (true) {
  //   const c = 'btn-start-test--choosen'
  // }
}

if (document.querySelector('.js-load-btns')) {
  document.querySelector('.js-load-btns').addEventListener('click',(evt) => {
    evt.target.disabled = true;
  })
}

if (document.querySelector('.js-load-input')) {
  const btns = document.querySelectorAll('.js-load-input')
  btns.forEach((item) => {
    item.addEventListener('click', (evt) => {
      evt.target.disabled = true;
    })
  })
}

// const allStartQuestBtns = querySelectorAll('.js-load-panel');
// for (const btn of allStartQuestBtns) {
//   btn.addEventListener('click', function (evt) {

//   })
// }





document.addEventListener("DOMContentLoaded", () => {
  // if (localStorage.getItem('loadTest') ==="buh") {
  //   document.querySelector('.js-test-1').checked;
  //   document.querySelector('.js-load-btns').click();
  //   return;
  // }


    if (document.querySelector('.js-load-btns')) {
      const name = setTimeout((evt) => {
        // document.querySelector('.js-load-btns').click() //mifomen
      },500
    )
  }

});

  const  loadQuestion = () => {
    getData((allArrayQuestions) => {
      // console.log(allArrayQuestions.length);
      showNumberBtn(allArrayQuestions);
      showBankQuestionPull(allArrayQuestions.length);
      checkChoosenQuestion(allArrayQuestions.length);
  })
}

  // const elem123 = document.querySelector('.js-load-btns');
  const elem123 = document.querySelectorAll('.input-btn');

for  (const elem of elem123) {
  elem.addEventListener('click', loadQuestion);
}

  // elem123.addEventListener('click', loadQuestion);



  // btnStartDisabled(false)
// });

// document.addEventListener("DOMContentLoaded", () => {

// });

document.addEventListener("load ", btnStartDisabled(false));

export { startTestNameBtn, DATA_GET_URL };
