// GIVEN I am taking a code quiz
// WHEN I click the start button


// THEN a timer starts and I am presented with a question


// WHEN I answer a question
// THEN I am presented with another question
const quizData = [
    {
        question: "JavaScript is an _____ language",
        a: "Object-Oriented",
        b: "Object-Based",
        c: "Procedural",
        d: "None of the above",
        correct: 'a',
    },
    {
        question: "Which of the following keywords is used to define a variable in JavaScript?",
        a: "var",
        b: "let",
        c: 'Both A and B',
        d: 'None of the Above',
        correct: 'c',
    },
    {
        question: 'How can a datatype be declared to be a constant type?',
        a: 'const',
        b: 'var',
        c: 'let',
        d: 'constant',
        correct: 'a',
    },
    {
        question: 'Which function is used to serialize an object into a JSON string in JavaScript?',
        a: 'stringify()',
        b: 'parse()',
        c: 'convert()',
        d: 'None of the above',
        correct: 'a',
    },
    {
        question: 'How do we write a comment in JavaScript?',
        a: '/**/',
        b: '//',
        c: '#',
        d: '$$',
        correct: 'b',
    },
    {
        question: 'Arrays in JavaScript are defined by which of the following statements?',
        a: 'It is an ordered list of values',
        b: 'It is an ordered list of objects',
        c: 'It is an ordered list of string',
        d: 'It is an ordered list of functions',
        correct: 'a',
    },
    {
        question: 'What is the use of variables in JavaScript Programs?',
        a: 'Storing numbers, dates, string, or other values',
        b: 'Storing string only',
        c: 'Storing numbers only',
        d: 'None of the Above',
        correct: 'a',
    },
    {
        question: 'In JavaScript a _____ function can be defined as a function passed into another function as a parameter.',
        a: 'call front',
        b: 'roll back',
        c: 'roll front',
        d: 'call back',
        correct: 'd',
    },
    {
        question: 'Which language runs in a web browser?',
        a: 'Java',
        b: 'C',
        c: 'Python',
        d: 'JavaScript',
        correct: 'd',
    },
    {
        question: 'What does HTML stand for?',
        a: 'Hypertext Markup Language',
        b: 'Hypertext Markdown Language',
        c: 'Hyperloop Machine Language',
        d: 'None of the Above',
        correct: 'a',
    },
]
const quiz = document.getElementById("quiz");
const answerElements = document.querySelectorAll(".answer");
const questionElement = document.getElementById("question");
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const submitButton = document.getElementById("submit");

let currentQuiz = 0;
let score = 0;

const deselectAnswers = () => {
    answerElements.forEach((answer) => (answer.checked = false));
};

const getSelected = () => {
    let answer;
    answerElements.forEach((answerElement) => {
      if (answerElement.checked) answer = answerElement.id;
    });
    return answer;
};

const loadQuiz = () => {
    deselectAnswers();
    const currentQuizData = quizData[currentQuiz];
    questionElement.innerText = currentQuizData.question;
    a_text.innerText = currentQuizData.a;
    b_text.innerText = currentQuizData.b;
    c_text.innerText = currentQuizData.c;
    d_text.innerText = currentQuizData.d;
};
  
  loadQuiz();

submitButton.addEventListener("click", () => {
    const answer = getSelected();
    if (answer) {
      if (answer === quizData[currentQuiz].correct) score++;
      currentQuiz++;
      if (currentQuiz < quizData.length) loadQuiz();
      else {
        quiz.innerHTML = `
              <h2>You answered ${score}/${quizData.length} questions correctly</h2>
              <button onclick="history.go(0)">Play Again</button>
          ` // location.reload() won't work in CodePen for security reasons;
      }
    }
  });
// WHEN I answer a question incorrectly
// THEN time is subtracted from the clock


// WHEN all questions are answered or the timer reaches 0
// THEN the game is over


// WHEN the game is over
// THEN I can save my initials and my score