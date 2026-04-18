let quizData = [
  {
    question: "What is JavaScript primarily used for?",
    options: [
      "Styling web pages",
      "Structuring web pages",
      "Adding interactivity to web pages",
      "Database management",
    ],
    correctIndex: 2,
  },
  {
    question: "Which keyword is used to declare a variable in JavaScript?",
    options: ["var", "let", "const", "All of the above"],
    correctIndex: 3,
  },
  {
    question: "What will `typeof undefined` return?",
    options: ["undefined", "object", "string", "number"],
    correctIndex: 0,
  },
  {
    question: "Which method is used to convert JSON to a JavaScript object?",
    options: [
      "JSON.parse()",
      "JSON.stringify()",
      "JSON.convert()",
      "JSON.toObject()",
    ],
    correctIndex: 0,
  },
  {
    question: "Which operator is used for strict equality?",
    options: ["==", "=", "===", "!="],
    correctIndex: 2,
  },
  {
    question: "What will be the output of `1 + '2' + 3`?",
    options: ["6", "123", "15", "Error"],
    correctIndex: 1,
  },
  {
    question: "Which function is used to delay execution in JavaScript?",
    options: ["setTimeout()", "setInterval()", "delay()", "wait()"],
    correctIndex: 0,
  },
  {
    question: "What is a closure in JavaScript?",
    options: [
      "A loop structure",
      "A function with access to its outer scope",
      "An object property",
      "A variable type",
    ],
    correctIndex: 1,
  },
  {
    question: "Which array method removes the last element?",
    options: ["push()", "pop()", "shift()", "unshift()"],
    correctIndex: 1,
  },
  {
    question: "What will Boolean('') return?",
    options: ["true", "false", "null", "undefined"],
    correctIndex: 1,
  },
];

let QueNumber = document.getElementById("QueNum");
let Timer = document.getElementById("timer");
let Question = document.getElementById("showQue");
let Option = document.getElementById("option");
let Btn = document.getElementById("btn");
let Result = document.getElementById("result");

let queIndex = 0;
let score = 0;
let userAnswers = [];
let TimerLeft = 30;
let interval;

function loadQuestion() {
  let current = quizData[queIndex];

  QueNumber.innerText = `Question: ${queIndex + 1}/${quizData.length}`;
  Question.innerText = current.question;

  Option.innerHTML = "";

  current.options.forEach((opt, index) => {
    let btn = document.createElement("button");
    btn.innerText = opt;
    btn.classList.add("btn", "btn-outline-success", "m-2");

    btn.onclick = () => selectAnswer(index);

    Option.appendChild(btn);
  });

  startTimer();
}

function selectAnswer(selectedIndex) {
  clearInterval(interval);

  userAnswers[queIndex] = selectedIndex;

  if (selectedIndex === quizData[queIndex].correctIndex) {
    score++;
  }

  nextQuestion();
}

function nextQuestion() {
  queIndex++;

  if (queIndex < quizData.length) {
    loadQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  Btn.style.display = "none";
  Timer.innerText = "";

  Question.innerHTML = `Your Score: ${score}/${quizData.length}`;
  Option.innerHTML = "";

  Result.innerHTML = "";

  quizData.forEach((q, index) => {
    let userAns =
      userAnswers[index] !== undefined
        ? q.options[userAnswers[index]]
        : "Not Attempted";

    let correctAns = q.options[q.correctIndex];

    let div = document.createElement("div");

    div.innerHTML = `
      <h5>${index + 1}. ${q.question}</h5>
      <p style="color:green;">Correct: ${correctAns}</p>
      <p style="color:${
        userAns === correctAns ? "green" : "red"
      };">Your Answer: ${userAns}</p>
    `;

    Result.appendChild(div);
  });
}

function startTimer() {
  clearInterval(interval);
  TimerLeft = 30;

  Timer.innerText = `Time: ${TimerLeft}`;

  interval = setInterval(() => {
    TimerLeft--;
    Timer.innerText = `Time: ${TimerLeft}`;

    if (TimerLeft <= 0) {
      clearInterval(interval);
      userAnswers[queIndex] = null;
      nextQuestion();
    }
  }, 1000);
}

loadQuestion();