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
let questionCount;
let score = 0;
let count = 21;
let countdown;

//Questions and Options array

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
    options: ["New york", "The White house", "Washington DC", "Manhattan"],
    correct: "Washington DC",
  },
  {
    id: "2",
    question: "What is the most important part of a computer?",
    options: ["System Unit", "Mouse", "Keyboard", "All above"],
    correct: "All above",
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
    options: ["49", "65", "48", "60"],
    correct: "48",
  },
  {
    id: "11",
    question: "Which country has the biggest population?",
    options: ["South Africa", "India", "China", "Tonga"],
    correct: "China",
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
    correct: "Hippopotamus",
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
    options: ["Bill Gates", "Martin Copper", "Berners Lee", "Thomas Edison"],
    correct: "Martin Copper",
  },
  {
    id: "19",
    question: "How many elements are in the periodic table?",
    options: ["100", "190", "118", "110"],
    correct: "Martin Copper",
  },
];

//Restart Quiz
restart.addEventListener("click", () => {
  initial();
  displayContainer.classList.remove("hide");
  scoreContainer.classList.add("hide");
});

//Next Button
nextBtn.addEventListener(
  "click",
  (displayNext = () => {
    //increment questionCount
    questionCount += 1;
    //if last question
    if (questionCount == quizData.length) {
      //hide question container and display score
      displayContainer.classList.add("hide");
      scoreContainer.classList.remove("hide");
      //user score
      userScore.innerHTML =
        "Your score is " + score + " out of " + questionCount;
    } else {
      //display questionCount
      countOfQuestion.innerHTML =
        questionCount + 1 + " of " + quizData.length + " Question";
      //display quiz
      quizDisplay(questionCount);
      count = 21;
      clearInterval(countdown);
      timerDisplay();
    }
  })
);

//Timer
const timerDisplay = () => {
  countdown = setInterval(() => {
    count--;
    timeLeft.innerHTML = `${count}s`;
    if (count == 0) {
      clearInterval(countdown);
      displayNext();
    }
  }, 1000);
};

//Display quiz
const quizDisplay = (questionCount) => {
  let quizCards = document.querySelectorAll(".container-mid");
  //Hide other cards
  quizCards.forEach((card) => {
    card.classList.add("hide");
  });
  //display current question card
  quizCards[questionCount].classList.remove("hide");
};

//Quiz Creation
function quizCreator() {
  //randomly sort questions
  quizData.sort(() => Math.random() - 0.5);
  //generate quiz
  for (let i of quizData) {
    //randomly sort options
    i.options.sort(() => Math.random() - 0.5);
    //quiz card creation
    let div = document.createElement("div");
    div.classList.add("container-mid", "hide");
    //question number
    countOfQuestion.innerHTML = 1 + " of " + quizData.length + " Question";
    //question
    let question_DIV = document.createElement("p");
    question_DIV.classList.add("question");
    question_DIV.innerHTML = i.question;
    div.appendChild(question_DIV);
    //options
    div.innerHTML += `
    <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
     <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
      <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
       <button class="option-div" onclick="checker(this)">${i.options[3]}</button>
    `;
    quizContainer.appendChild(div);
  }
}

//Checker Function to check if option is correct or not
function checker(userOption) {
  let userSolution = userOption.innerText;
  let question =
    document.getElementsByClassName("container-mid")[questionCount];
  let options = question.querySelectorAll(".option-div");


  let tickIconTag = '<div class="icon tick"><i class="fa-solid fa-check fa-beat-fade"></i></div>';
  let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

  //if user clicked answer == correct option stored in object
  if (userSolution === quizData[questionCount].correct) {
    userOption.classList.add("correct");
    userOption.insertAdjacentHTML("beforeend", tickIconTag);
    score++;
  } else {
    userOption.classList.add("incorrect");
    userOption.insertAdjacentHTML("beforeend", crossIconTag);
    //For marking the correct option
    options.forEach((element) => {
      if (element.innerText == quizData[questionCount].correct) {
        element.classList.add("correct");
      }

    });
  }

  //clear interval(stop timer)
  
  //disable all options
  options.forEach((element) => {
    element.disabled = true;
  });
  
}

//initial setup
function initial() {
  quizContainer.innerHTML = "";
  questionCount = 0;
  score = 0;
  count = 21;
  clearInterval(countdown);
  timerDisplay();
  quizCreator();
  quizDisplay(questionCount);
}

//when user click on start button
startButton.addEventListener("click", () => {
  startScreen.classList.add("hide");
  displayContainer.classList.remove("hide");
  document.querySelector("#info_box").remove();
  initial();
});

//hide quiz and display start screen
window.onload = () => {
  startScreen.classList.remove("hide");
  displayContainer.classList.add("hide");
};
