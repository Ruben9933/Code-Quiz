const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.answer-text'));
const progressText = document.querySelector('.progressText');
const scoreText = document.querySelector('#score');



let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'What is the shortcut for an HTML boilerplate design in VSCode?',
        choice1: 'html5',
        choice2: 'html:5',
        choice3: '5html',
        choice4: 'html;5',
        answer: 2,
    },

    {
        question: 'What is the bottom of a webpage called?',
        choice1: 'bottom',
        choice2: 'end',
        choice3: 'last',
        choice4: 'footer',
        answer: 4,
    },

    {
        question: 'What does "<li>" stand for?',
        choice1: 'listed increment',
        choice2: 'listed individually',
        choice3: 'listed item',
        choice4: 'listed indefinitely',
        answer: 3,
    },

    {
        question: 'Which "<h>" element will show as a bigger font?',
        choice1: '<h3>',
        choice2: '<h1>',
        choice3: '<h4>',
        choice4: '<h7>',
        answer: 2,
    },

];

const SCORE_POINTS = 100
const MAX_QUESTIONS = 4

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestions()
};

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    }



    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number];
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
};

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' :
            'incorrect'

        if (classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
});

incrementScore = num => {
    score += num
    scoreText.innerText = score
};

startGame()