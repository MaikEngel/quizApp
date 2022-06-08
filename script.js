let result = 0;
let correct = new Audio('audio/correct.mp3');
let wrong = new Audio('audio/wrong.mp3');
let win = new Audio('audio/win.mp3');
let currentQuestion = 0;



function quizFilter(category) {
    if (pokemonCategory(category)) {
        filterQuestion = [];
        currentQuestion = 0;
        let filterPokemon = questions.filter(questions => questions.category == "pokemon")
        filterQuestion.push(filterPokemon)
        selectPokemon()
        init()
    } if (marvelCategory(category)) {
        filterQuestion = [];
        currentQuestion = 0;
        let filterMarvel = questions.filter(questions => questions.category == "marvel")
        filterQuestion.push(filterMarvel)
        selectMarvel()
        init()
    } if (dragonballCategory(category)) {
        filterQuestion = [];
        currentQuestion = 0;
        let filterDragonball = questions.filter(questions => questions.category == "dragonball")
        filterQuestion.push(filterDragonball)
        selectDragonball()
        init()
    }
}


function init() {
    let questionSection = document.getElementById('questionSection');
    result = 0;
    questionSection.innerHTML = ``;
    questionSection.innerHTML = welcome();
}


function initQuestion() {
    let questionSection = document.getElementById('questionSection');
    let question = filterQuestion[0][currentQuestion];
    let percent = [currentQuestion + 1] / filterQuestion[0].length;
    percent = percent * 100;
    questionSection.innerHTML = ``;
    questionSection.innerHTML += loadQuestion(question, percent);
    showQuestions()
}


function showQuestions() {
    let question = filterQuestion[0][currentQuestion];
    answers.innerHTML = "";
    for (let i = 0; i < question['answer'].length; i++) {
        answers.innerHTML += loadAnswers(i, question)
    }
}

function answer(i) {
    let question = filterQuestion[0];
    let answerButton = document.getElementById('answerButton' + i);
    let answers = document.getElementById('answers');
    let rightAnswerButton = document.getElementById('answerButton' + [question[currentQuestion]['right_answer'] - 1]);
    if (rightAnswer(i)) {
        answerButton.classList.add('rightAnswer');
        result += 1;
        correct.play();
    } else {
        answerButton.classList.add('falseAnswer')
        rightAnswerButton.classList.add('rightAnswer')
        wrong.play()
    }
    answers.innerHTML += loadBlock();
    currentQuestion++
    setTimeout(decide, 2000)
}


function decide() {
    if (gameIsOver()) {
        openResult()
    } else {
        initQuestion()
    }
}


function openResult() {
    let question = filterQuestion[0];
    let questionSection = document.getElementById('questionSection');
    win.play()
    questionSection.innerHTML = ``;
    questionSection.innerHTML += loadResult(question);
}

function selectPokemon() {
    let pokemonButton = document.getElementById('pokemonButton')
    let dragonballButton = document.getElementById('dragonballButton')
    let marvelButton = document.getElementById('marvelButton')
    pokemonButton.classList.add('menuBarNavSelected')
    dragonballButton.classList.remove('menuBarNavSelected')
    marvelButton.classList.remove('menuBarNavSelected')
}

function selectMarvel() {
    let pokemonButton = document.getElementById('pokemonButton')
    let dragonballButton = document.getElementById('dragonballButton')
    let marvelButton = document.getElementById('marvelButton')
    pokemonButton.classList.remove('menuBarNavSelected')
    dragonballButton.classList.remove('menuBarNavSelected')
    marvelButton.classList.add('menuBarNavSelected')
}

function selectDragonball() {
    let pokemonButton = document.getElementById('pokemonButton')
    let dragonballButton = document.getElementById('dragonballButton')
    let marvelButton = document.getElementById('marvelButton')
    pokemonButton.classList.remove('menuBarNavSelected')
    dragonballButton.classList.add('menuBarNavSelected')
    marvelButton.classList.remove('menuBarNavSelected')
}

function pokemonCategory(category) {
    return category == "pokemon";  
}

function marvelCategory(category) {
    return category == "marvel";  
}

function dragonballCategory(category) {
    return category == "dragonball";  
}

function welcome() {
    
    return `<div class="card-body">
    <h4 class="card-title ptSansBold">Herzlich Willkommen zum großartigen ${filterQuestion[0][0]['title']} Quiz</h4>
    <p class="card-text ptSans">Bist du bereit?</p>
    <button onclick="initQuestion()" type="button" class="btn btn-warning buttonPosition">
        <p class="ptSans"><b>Start</b></p>
        <img src="img/arrow.png" alt="" class="buttonArrow">
    </button>
</div>`;
}

function loadQuestion(question, percent) {
    return `<div class="card-body questionSection" id=answerBox>
    <h6 class="card-title rubikMedium">${question['question']}</h6>
    <div id="answers" class="d-grid gap-2 answerPosition">
</div>
<div id="questionFooter" class="questionFooter">
    <div class="progress">
        <div class="progress-bar" role="progressbar" style="width: ${percent}%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">${percent}%
        </div>
    </div>
<p class="rubik"><b>${currentQuestion + 1}</b> von <b>${filterQuestion[0].length}</b>
</div>`;
}

function loadAnswers(i, question) {
    return `
    <button id="answerButton${i}" onclick="answer(${i})" class="btn btn-light" type="button"><p class="rubik">${question.answer[i]}</p></button>`;
}

function loadBlock() {
    return `
    <div class="block">
        <div class="loader">
        </div>
    </div>`;
}

function loadResult(question) {
    return `
    <div class="card-body resultWindow endCartLayout">
        <img class="resultLogo" src="img/brain_result.png">
        <img class="tropyLogo" src="img/tropy.png">
        <h4 class="card-title ptSansBold">Quiz beendet!</h4>
        <p class="marginBottom8px card-text ptSans">Dein Ergebniss ${result}/${question.length}</p>
        <div>
            <button class="btn btn-warning resultButton" type="submit">Teilen</button>
            <button onclick="quizFilter('pokemon')" type="button" class="btn btn-outline-warning resultButton">Nochmal</button>
        </div>
    </div>
`;
}

function gameIsOver() {
    return currentQuestion == [filterQuestion[0].length];
}

function rightAnswer(i) {
    return i + 1 == filterQuestion[0][currentQuestion]['right_answer'];
}