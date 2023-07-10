//calling variables
let timeLeft = document.querySelector(".time-out");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".question-que");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart-button");
let userScore = document.getElementById("score");
let startScreen = document.querySelector(".start-page");
let startButton = document.getElementById("start-button");
let nameInput = document.getElementById("name-input");
let questionCount;
let score = 0;
let count = 21;
let countdown;

//username
function getNameFromStorage() {
  return localStorage.getItem("username");
}

function setNameToStorage(name) {
  localStorage.setItem("username", name);
}

//to restart the question after score
restart.addEventListener("click", () => {
  starter();
  displayContainer.classList.remove("hide");
  scoreContainer.classList.add("hide");
  countOfQuestion.classList.remove("hide");
});

//button to forward the quiz or submit
nextBtn.addEventListener("click", displayNext);

function displayNext() {
  //to increase question count
  questionCount += 1;
  //hide the questions and display the final score
  if (questionCount === quizData.length) {
    countOfQuestion.classList.add("hide");
    displayContainer.classList.add("hide");
    scoreContainer.classList.remove("hide");
    //score and name from storage
    userScore.innerHTML = `Hi ${getNameFromStorage()}, your score is ${score} out of ${questionCount}`;
    //display number of questions and time left
  } else {
    countOfQuestion.innerHTML = `${questionCount + 1} of ${quizData.length} Question`;
    countOfQuestion.classList.remove("hide");
    quizDisplay(questionCount);
    count = 21;
    clearInterval(countdown);
    timerDisplay();
  }
}

//timer
function timerDisplay() {
  countdown = setInterval(() => {
    count--;
    timeLeft.innerHTML = `${count}s`;
    if (count === 0) {
      clearInterval(countdown);
      displayNext();
    }
  }, 1000);
}

//creates and makes the quiz with random questions
function quizDisplay(questionCount) {
  let quizCards = document.querySelectorAll(".container-mid");

  quizCards.forEach((card) => {
    card.classList.add("hide");
  });

  quizCards[questionCount].classList.remove("hide");
}

function quizCreator() {
  quizData.sort(() => Math.random() - 0.5);

  for (let i of quizData) {
    i.options.sort(() => Math.random() - 0.5);

    let div = document.createElement("div");
    div.classList.add("container-mid", "hide");

    countOfQuestion.innerHTML = `1 of ${quizData.length} Question`;

    let question_DIV = document.createElement("p");
    question_DIV.classList.add("question");
    question_DIV.innerHTML = i.question;
    div.appendChild(question_DIV);

    // button for quiz answers
    div.innerHTML += `
            <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
            <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
            <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
            <button class="option-div" onclick="checker(this)">${i.options[3]}</button>
          `;
    quizContainer.appendChild(div);
  }
}

//icon for user answers
function checker(userOption) {
  let userSolution = userOption.innerText;
  let question = document.getElementsByClassName("container-mid")[questionCount];
  let options = question.querySelectorAll(".option-div");

  let tickIconTag = '<div class="icon tick"><i class="fa-solid fa-check fa-beat-fade"></i></div>';
  let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

  if (userSolution === quizData[questionCount].correct) {
    userOption.classList.add("correct");
    userOption.insertAdjacentHTML("beforeend", tickIconTag);
    score++;
  } else {
    userOption.classList.add("incorrect");
    userOption.insertAdjacentHTML("beforeend", crossIconTag);

    options.forEach((element) => {
      if (element.innerText == quizData[questionCount].correct) {
        element.classList.add("correct");
      }
    });
  }

  //disables user options
  options.forEach((element) => {
    element.disabled = true;
  });
}

//game startup
function starter() {
  quizContainer.innerHTML = "";
  questionCount = 0;
  score = 0;
  count = 21;
  clearInterval(countdown);
  timerDisplay();
  quizCreator();
  quizDisplay(questionCount);
}

//when user clicks on start
startButton.addEventListener("click", () => {
  const name = nameInput.value.trim();
  if (name === "") {
    alert("Please enter your name!");
  } else {
    setNameToStorage(name);
    startScreen.classList.add("hide");
    displayContainer.classList.remove("hide");
    starter();
  }
});

//hides quiz, display start screen and username
window.onload = () => {
  const name = getNameFromStorage();
  if (name) {
    nameInput.value = name;
  }
  startScreen.classList.remove("hide");
  displayContainer.classList.add("hide");
};
