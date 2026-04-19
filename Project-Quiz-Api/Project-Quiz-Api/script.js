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
let selectedAnswer = null;
let TimerLeft = 30;
let interval;

function loadQue() {
  let currentQue = quizData[queIndex];

  QueNumber.innerText = `Que ${queIndex + 1}/${quizData.length}`;
  Question.innerText = currentQue.question;

  Option.innerHTML = "";

  currentQue.options.forEach((opt, index) => {
    let button = document.createElement("button");

    button.innerHTML = opt;
    button.classList.add("btn", "btn-outline-primary", "m-2");

    button.onclick = function () {
      selectedAnswer = index;

      userAnswers.push({
        question: currentQue.question,
        selected: index,
        correct: currentQue.correctIndex,
        options: currentQue.options,
      });

      nextQns();
    };

    Option.appendChild(button);
  });

  startTimer();
}

loadQue();

function startTimer() {
  clearInterval(interval);

  TimerLeft = 30;
  Timer.innerText = `Time Left ${TimerLeft}`;

  interval = setInterval(() => {
    TimerLeft--;
    Timer.innerText = `Time Left ${TimerLeft}`;

    if (TimerLeft <= 0) {
      clearInterval(interval);

      userAnswers.push({
        question: quizData[queIndex].question,
        selected: null,
        correct: quizData[queIndex].correctIndex,
        options: quizData[queIndex].options,
      });

      nextQns();
    }
  }, 1000);
}

function nextQns() {
  clearInterval(interval);

  if (selectedAnswer === quizData[queIndex].correctIndex) {
    score++;
  }

  queIndex++;
  selectedAnswer = null;

  if (queIndex < quizData.length) {
    loadQue();
  } else {
    quizResult();
  }
}


function quizResult() {
  Result.innerHTML = `
  <h3 class="text-center">Quiz Result</h3>
  <h4 class="text-center">Result: ${score}/${quizData.length}</h4>

  <div class="mt-3">
    <h3 class="text-center">Review Summary</h3>

    <ul class="list-group">
      ${userAnswers
        .map(
          (ans, index) => `
        <li class="list-group-item">
          <h5 class="text-center">Question ${index + 1}: ${ans.question}</h5>
          <h6 class="text-center">
            Your Answer: ${
              ans.selected !== null
                ? ans.options[ans.selected]
                : "Not answered"
            }
          </h6>
          <h6 class="text-center">
            Correct Answer: ${ans.options[ans.correct]}
          </h6>
        </li>`
        )
        .join("")}
    </ul>
  </div>
  `;
}