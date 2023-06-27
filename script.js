// GIVEN I am taking a code quiz
// WHEN I click the start button
// THEN a timer starts and I am presented with a question-------
// WHEN I answer a question--------
// THEN I am presented with another question---------
// WHEN I answer a question incorrectly
// THEN time is subtracted from the clock
// WHEN all questions are answered or the timer reaches 0
// THEN the game is over
// WHEN the game is over
// THEN I can save my initials and my score


// Questions for the quiz
const quizData = [

    {
        questionText: "JavaScript is an _____ language",
        options: [
            "A. Object-Oriented",
            "B. Object-Based",
            "C. Procedural",
            "D. None of the above"],
        answer: 'A. Object-Oriented',
    },
    {
        questionText: "Which of the following keywords is used to define a variable in JavaScript?",
        options: [
            "A. var",
            "B. let",
            'C. Both A and B',
            'D. None of the Above'],
        answer: 'C. Both A and B',
    },
    {
        questionText: 'How can a datatype be declared to be a constant type?',
        options: [
            'A. const',
            'B. var',
            'C. let',
            'D. constant'],
        answer: 'A. const',
    },
    {
        questionText: 'Which function is used to serialize an object into a JSON string in JavaScript?',
        options: [
            'A. stringify()',
            'B. parse()',
            'C. convert()',
            'D. None of the Above'],
        answer: 'A. stringify()',
    },
    {
        questionText: 'How do we write a comment in JavaScript?',
        options: [
            'A. /**/',
            'B. //',
            'C. #',
            'D. $$'],
        answer: 'B. //',
    },
    {
        questionText: 'Arrays in JavaScript are defined by which of the following statements?',
        options: [
            'A. It is an ordered list of values.',
            'B. It is an ordered list of objects.',
            'C. It is an ordered list of string.',
            'D. It is an ordered list of functions.'],
        answer: 'A. It is an ordered list of values.',
    },
    {
        questionText: 'What is the use of variables in JavaScript Programs?',
        options: [
            'A. Storing numbers, dates, string, or other values.',
            'B. Storing string only.',
            'C. Storing numbers only.',
            'D. None of the Above'],
        answer: 'A. Storing numbers, dates, string, or other values.',
    },
    {
        questionText: 'In JavaScript a _____ function can be defined as a function passed into another function as a parameter.',
        options: [
            'A. call front',
            'B. roll back',
            'C. roll front',
            'D. call back'],
        answer: 'D. call back',
    },
    {
        questionText: 'Which language runs in a web browser?',
        options: [
            'A. Java',
            'B. C',
            'C. Python',
            'D. JavaScript'],
        answer: 'D. JavaScript',
    },
    {
        questionText: 'What does HTML stand for?',
        options: [
            'A. Hypertext Markup Language',
            'B. Hypertext Markdown Language',
            'C. Hyperloop Machine Language',
            'D. None of the Above'],
        answer: 'A. Hypertext Markup Language',
    },
];

let start = document.querySelector('#begin');
let question = document.querySelector('#question');
let scoreCard = document.querySelector('#score-card');
let leaderboard = document.querySelector('#leaderboard');

function hideCards() {
    start.setAttribute('hidden', true);
    question.setAttribute('hidden', true);
    scoreCard.setAttribute('hidden', true);
    leaderboard.setAttribute('hidden', true);
}

let final = document.querySelector('#final');
let finalText = document.querySelector('#final-text');

function hideFinalText() {
    final.style.display = 'none';
}

let intervalID;
let time;
let currentQuestion;

// Start Button Activation, Begin Quiz
document.querySelector('#start-button').addEventListener('click', startQuiz)

function startQuiz() {
    hideCards();
    question.removeAttribute('hidden');
    currentQuestion = 0;
    displayQuestion();
    time = quizData.length * 12;
    intervalID = setInterval(countdown, 1000);
    displayTime();
}

// Create Countdown Timer
function countdown() {
    time--;
    displayTime();
    if (time < 1) {
        endQuiz();
    }
}

// Time Display
let timeDisplay = document.querySelector('#time');
function displayTime() {
    timeDisplay.textContent = time;
}

// Question Selector
function displayQuestion() {
    let question = quizData[currentQuestion]
    let options = question.options;
    let h2QuestionElement = document.querySelector('#question-text');
    h2QuestionElement.textContent = question.questionText;

    for (let i = 0; i < options.length; i++) {
        let option = options[i];
        let optionButton = document.querySelector("#option" + i);
        optionButton.textContent = option;
    }
}

document.querySelector('#quiz-options').addEventListener('click', checkAnswer);

function optionIsCorrect(optionButton) {
    return optionButton.textContent === quizData[currentQuestion].answer;
}

// Checking Answers and Deduct Time for Wrong Answer
function checkAnswer(eventObject) {
    let optionButton = eventObject.target;
    final.style.display = "block";
    if (optionIsCorrect(optionButton)) {
        finalText.textContent = 'Correct!';
        finalText.setAttribute('style', 'color: lime; font-size: 40px;')
        setTimeout(hideFinalText, 1500);
    } else {
        finalText.textContent = 'Wrong!';
        finalText.setAttribute('style', 'color: red; font-size: 40px;')
        setTimeout(hideFinalText, 1500);
        ;
        if (time >= 10) {
            time = time - 10;
            displayTime();
        } else {
            time = 0;
            displayTime();
            endQuiz();
        }
        return;
    }

    currentQuestion++;
    if (currentQuestion < quizData.length) {
        displayQuestion();
    } else {
        endQuiz();
    }
}

// Scoring System
let score = document.querySelector('#score');

function endQuiz() {
    clearInterval(intervalID);
    hideCards();
    scoreCard.removeAttribute('hidden');
    score.textContent = time;
}
let submit = document.querySelector('#submit');
let inputElement = document.querySelector('#initials');

submit.addEventListener('click', storeScore);

// Leaderboard Submission
function storeScore(event) {
    event.preventDefault();
    if (!inputElement.value) {
        alert('Please enter your initials before clicking submit!');
        return;
    }

    let leaderboardItem = {
        initials: inputElement.value,
        score: time,
    };

    updateStoredLeaderboard(leaderboardItem);

    hideCards();
    leaderboard.removeAttribute('hidden');

    renderLeaderboard()
}

function updateStoredLeaderboard(leaderboardItem) {
    let leaderboardArray = getLeaderboard();
    leaderboardArray.push(leaderboardItem);
    localStorage.setItem('leaderboardArray', JSON.stringify(leaderboardArray));
}

function getLeaderboard() {
    let storedLeaderboard = localStorage.getItem('leaderboardArray');
    if (storedLeaderboard !== null) {
        let leaderboardArray = JSON.parse(storedLeaderboard);
        return leaderboardArray;
    } else {
        leaderboardArray = [];
    }
    return leaderboardArray;
}

// Show Leaderboard
function renderLeaderboard() {
    let sortedLeaderboardArray = sortLeaderboard();
    const highscoreList = document.querySelector("#highscore-list");
    highscoreList.innerHTML = "";
    for (let i = 0; i < sortedLeaderboardArray.length; i++) {
        let leaderboardEntry = sortedLeaderboardArray[i];
        let newListItem = document.createElement("li");
        newListItem.textContent =
            leaderboardEntry.initials + " - " + leaderboardEntry.score;
        highscoreList.append(newListItem);
    }
}


function sortLeaderboard() {
    let leaderboardArray = getLeaderboard();
    if (!leaderboardArray) {
        return;
    }

    leaderboardArray.sort(function (a, b) {
        return b.score - a.score;
    });
    return leaderboardArray;
}
// commented out clear button functionality so users can't clear data.

//     const clearButton = document.querySelector("#clear-button");
//     clearButton.addEventListener("click", clearHighscores);

//     function clearHighscores() {
//     localStorage.clear();
//     renderLeaderboard();
//   }

// Back Button on Leaderboard
let backButton = document.querySelector("#back");
backButton.addEventListener("click", returnToStart);


function returnToStart() {
    hideCards();
    start.removeAttribute("hidden");
}

// Access Leaderboard from Home
let leaderboardLink = document.querySelector("#leaderboard-link");
leaderboardLink.addEventListener("click", showLeaderboard);

function showLeaderboard() {
    hideCards();
    leaderboard.removeAttribute("hidden");


    clearInterval(intervalID);

// Empty Timer on Home
    time = undefined;
    displayTime();


    renderLeaderboard();
}




