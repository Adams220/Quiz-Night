//variables
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

//array for questions and answers

const quizData = [
  {
    id: "0",
    question: "Who were the first humans scientifically?",
    options: ["Homo erectus", "Homo habilis", "Homo sapiens", "Homo heidelbergensis"],
    correct: "Homo erectus",
  },
  {
    id: "1",
    question: "What is the capital of USA?",
    options: ["New york", "Alaska", "Washington DC", "Manhattan"],
    correct: "Washington DC",
  },
  {
    id: "2",
    question: "What is the most important part of a computer?",
    options: ["System Unit", "Mouse", "Keyboard", "All options"],
    correct: "All options",
  },
  {
    id: "3",
    question: "If you were born 10 years ago, How old are you today?",
    options: ["1 day old", "13 yrs", "10yrs", "10 yrs 1 day"],
    correct: "10yrs",
  },
  {
    id: "4",
    question: "Which of the languages is Germanic?",
    options: ["French", "Polish", "English", "Greek"],
    correct: "English",
  },
  {
    id: "5",
    question: "Where in the world would you find the Spanish steps?",
    options: ["Porto", "Rome", "Barcelona", "Casablanca"],
    correct: "Rome",
  },
  {
    id: "6",
    question: "Which of below is an element of the universe?",
    options: ["Stars", "Sun", "Earth", "All options"],
    correct: "All options",
  },
  {
    id: "7",
    question: "Where is Russia located?",
    options: ["Europe", "Eastern Europe", "Eurasia", "Asia"],
    correct: "Asia",
  },
  {
    id: "8",
    question: "Which of below is vegetarian?",
    options: ["Rat", "Hawk", "Hippopotamus", "Monkey"],
    correct: "Hippopotamus",
  },
  {
    id: "9",
    question: "Who was the first king of Mesopotamia?",
    options: ["Gilgamesh", "Shar-kali-sharri", "Sargon", "Nebuchadnezzar"],
    correct: "Sargon",
  },
  {
    id: "10",
    question: "How many countries are in Asia?",
    options: ["49", "65", "48", "51"],
    correct: "51",
  },
  {
    id: "11",
    question: "Which country has the biggest population?",
    options: ["South Africa", "Russia", "China", "India"],
    correct: "India",
  },
  {
    id: "12",
    question: "Which animal is the strongest?",
    options: ["Crocodile", "Aligator", "Cheetah", "Hippopotamus"],
    correct: "Hippopotamus",
  },
  {
    id: "13",
    question: "What is the first computer processor?",
    options: ["Pentium 1", "Windows xp", "Intel 4004", "Pentium"],
    correct: "Intel 4004",
  },
  {
    id: "14",
    question: "Which is the only body part that is fully grown from birth?",
    options: ["Ears", "Mouth", "Nose", "Eyes"],
    correct: "Eyes",
  },
  {
    id: "15",
    question: "Where is the strongest human muscle located?",
    options: ["Knee", "Hand", "Shoulder", "Jaw"],
    correct: "Jaw",
  },
  {
    id: "16",
    question: "What is the oldest language in the world?",
    options: ["English", "Arabic", "Sumerian", "Mandarin"],
    correct: "Sumerian",
  },
  {
    id: "17",
    question: "Where do the Atlantic and Pacific ocean meet?",
    options: ["Carribean", "Cape horn", "Portugal", "St.Martin"],
    correct: "Cape horn",
  },
  {
    id: "18",
    question: "Who invented mobile phones?",
    options: ["Bill Gates", "Martin Cooper", "Berners Lee", "Thomas Edison"],
    correct: "Martin Cooper",
  },
  {
    id: "19",
    question: "How many elements are in the periodic table?",
    options: ["100", "190", "118", "110"],
    correct: "118",
  },
];

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
