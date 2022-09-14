const setHourName = (intInput) => {
  // const lastCiftIntInpit = intInput % 10;
  if (intInput === 1 || intInput === 21 ) {
    return 'Час';
  }
  if (intInput >= 2 && intInput <= 4  || intInput >= 22  && intInput <= 24) {
    console.log('часа')
    return 'Часа';
  }
  if (intInput === 0 || intInput >= 5 && intInput <= 20 ) {
    return 'Часов';
  }
};

const setMinName = (intInput) => {
  if (intInput === 1) {
    return 'Минута';
  }
  if (intInput ===0 || intInput >= 5 && intInput <= 59 ) {
    return 'Минут';
  }
  if (intInput >= 2 && intInput <= 4 ) {
    return 'Минуты';
  }
};

const setSecName = (intInput) => {
  if (intInput === 1) {
    return 'Секунда';
  }
  if (intInput ===0 || intInput >= 5 && intInput <= 59 ) {
    return 'Секунд';
  }
  if (intInput >= 2 && intInput <= 4 ) {
    return 'Секунды';
  }
};

const setDayName = (inputTime) => {
  if (inputTime === 1) {
    return 'День';
  }
  if ( inputTime >= 2 && inputTime <= 4 ) {
    return 'Дня';
  }
  if ( inputTime >= 5 && inputTime <= 100 ) {
    return 'Дня';
  }
  return 'Дня';
};

const setNameStepExam = (inputTime) => {
  const getHours = inputTime.getHours();
  const getMin = inputTime.getMinutes();

  if ( getHours === 9 && getMin >= 31 && getMin<= 59 ) {
    return 'До начала экзамена';
  }
  if ( getHours >= 8 && getHours <= 9 && getMin>= 0 && getMin <= 30 ) {
    return 'До получения ключа';
  }
  if ( getHours >= 10 && getHours <= 14 && getMin >= 0 && getMin <= 59 ) {
    return 'До завершения экзамена';
  }
  return 'До следующего экзамена';
};

const hideElement = (selector) => {
  if (document.querySelector(selector)) {
    document.querySelector(selector).classList.add('vh');
  }
};
const setTimeForExams = (hour,min) => {

  // const currentExamHour = hour; //change it is final hour to final exams
  // const currentExamMin = min; //change it is final minutes to final exams

  const targetDate = new Date();
  const getHours = targetDate.getHours();
  const getMin = targetDate.getMinutes();

  if ( getHours === 9 && getMin >= 31 && getMin<= 59 ) {
    const TimeForPrint = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate(), 10, 0, 0,  0 );
    return TimeForPrint;
  }
  if ( getHours >= 4 && getHours <= 9 && getMin>= 1 && getMin <= 30 ) {
    const TimeForKey = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate(), 9, 30, 0,  0 );
    return TimeForKey;
  }
  if ( getHours >= 10 && getHours <= 14 && getMin >= 0 && getMin <= 59 ) {
    const timeEnding = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate(), hour, min, 0, 0);
    return timeEnding;
  }
  return  new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate()+1, 10, 0, 0, 0);
};

const renderDifferenseTime = (endingExamsTime) => {

  const currentTime = new Date();
  if ( endingExamsTime < currentTime) {
    endingExamsTime = new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate()+1, currentTime.getHours(), currentTime.getMinutes(), 0, 0);
  }

  if (document.querySelector('.time__title').classList.contains('vh')) {
    document.querySelector('.time__title').classList.remove('vh');
  }

  const titleExams = document.querySelector('.time__title');
  titleExams.textContent = setNameStepExam(currentTime);

  const defferenceInTime = ( endingExamsTime -  currentTime) / 1000 ;

  if ( parseInt(document.querySelector('.js-time-now-days').textContent,10) === 0 ) {
    hideElement('.column-days');
  } else {
    const differenceDays = Math.floor(( defferenceInTime / 3600 ) / 24 );
    document.querySelector('.js-time-now-days').innerHTML    = differenceDays;
    document.querySelector('.js-description-days').innerHTML  = setDayName(differenceDays);
  }
  // console.log(`${parseInt(document.querySelector('.js-time-now-hours').textContent,10),10)}`)
  if ( parseInt(document.querySelector('.js-time-now-days').textContent,10) === 0 && parseInt(document.querySelector('.js-time-now-hours').textContent,10) === 0 ) {
    hideElement('.column-hours');
  } else {
    const differenceHours = Math.floor(( defferenceInTime / 3600 ) % 24 );
    document.querySelector('.js-time-now-hours').innerHTML   = differenceHours;
    document.querySelector('.js-description-hours').innerHTML = setHourName(differenceHours);
  }

  if ( parseInt(document.querySelector('.js-time-now-hours').textContent,10) === 0  && parseInt(document.querySelector('.js-time-now-mins').textContent,10)  === 0 ) {
    hideElement('.column-mins');
  } else {
    const differenceMins = Math.floor(( defferenceInTime / 60  ) % 60 );
    document.querySelector('.js-time-now-mins').innerHTML = differenceMins;
    document.querySelector('.js-description-mins').innerHTML = setMinName(differenceMins);
  }
    const differenceSeconds =  Math.floor( defferenceInTime % 60 );
    document.querySelector('.js-time-now-seconds').innerHTML = differenceSeconds;
    document.querySelector('.js-description-seconds').innerHTML  = setSecName(differenceSeconds);
};


export { setSecName, setMinName, setHourName,renderDifferenseTime, setTimeForExams };
