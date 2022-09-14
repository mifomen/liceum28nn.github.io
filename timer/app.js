import {renderDifferenseTime,setTimeForExams } from './utils.js';

const currentExamHour = 14; //change it is final hour to final exams
const currentExamMin = 54; //change it is final minutes to final exams

const timerId = setInterval(() => {
  renderDifferenseTime(setTimeForExams(currentExamHour,currentExamMin));
  const nowTimeTime = document.querySelector('.js-current-time');
  nowTimeTime.innerHTML=`${new Date().toLocaleTimeString()}`;

  const nowTimeDate = document.querySelector('.js-current-date');
  nowTimeDate.innerHTML=`${new Date().toLocaleDateString()}`;
} , 1000);

document.addEventListener('DOMContentLoaded',() => timerId);
