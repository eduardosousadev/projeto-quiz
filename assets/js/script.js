const questionSection = document.querySelector(".questionArea");
const questionDiv = document.querySelector(".questionArea .question");
const optionsDiv = document.querySelector(".questionArea .options");
const resultSection = document.querySelector(".scoreArea");
const progressBar = document.querySelector(".progress--bar");
const scoreMessageDiv = document.querySelector(".scoreText1")
const scoreInPercentageDiv = document.querySelector(".scorePct");
const scoreInNumbersDiv = document.querySelector(".scoreText2");
const button = document.querySelector("button");
const prizeImg = document.querySelector(".prizeImage");
let currentQuestion = 0;
let numberOfCorrectAnswers = 0;

function optionClickEvent(event) {
    const chosenOption = parseInt(event.target.getAttribute("data-option"));

    if(chosenOption === questions[currentQuestion].answer) {
        numberOfCorrectAnswers++;
    };
    currentQuestion++;
    showQuestion();
};

function finishQuiz() {
    const result = Math.floor((numberOfCorrectAnswers / questions.length) * 100);

    if(result < 30) {
        prizeImg.setAttribute("src","./assets/img/sad-emoticon.png");
        scoreMessageDiv.innerHTML = "Estude mais!";
        scoreInPercentageDiv.style.color = "#ff0000";
    } else if(result >= 30 && result < 70) {
        prizeImg.setAttribute("src", "./assets/img/happy-emoticon.png")
        scoreMessageDiv.innerHTML = "Muito bem!";
        scoreInPercentageDiv.style.color = "#ffff00";
    } else if(result >= 70) {
        prizeImg.setAttribute("src", "./assets/img/prize.png");
        scoreMessageDiv.innerHTML = "Meus parabéns!"
        scoreInPercentageDiv.style.color = "#0d630d";
    };

    scoreInPercentageDiv.innerHTML = `Acertou ${result}%`;
    scoreInNumbersDiv.innerHTML = `Você respondeu ${questions.length} questões e acertou ${numberOfCorrectAnswers}.`
    
    resultSection.style.display = "block";
    questionSection.style.display = "none";
    progressBar.style.width = "100%";
};

function showQuestion() {
    if(questions[currentQuestion]) {
        let questionObject = questions[currentQuestion];
        let percentage = Math.floor((currentQuestion / questions.length) * 100);

        resultSection.style.display = "none";
        questionSection.style.display = "block";

        questionDiv.innerHTML = questionObject.question;
        optionsDiv.innerHTML = "";

        // Opção 1 de preenchimento, não é o ideal pois consome muito processamento, pois a cada iteração, é adicionado tudo novamente!
        // for(let i in questionObject.options) {
        //     optionsDiv.innerHTML += `<div>${questionObject.options[i]}</div>`;
        // }

        progressBar.style.width = `${percentage}%`;

        // Opção 2 de preenchimento é o ideal, pois o DOM é alterado uma única vez!
        let insertOptionsInHtml = "";
        for(let index in questionObject.options) {
            insertOptionsInHtml += `
                <div data-option="${index}" class="option">
                    <span>${parseInt(index) + 1}</span>
                    ${questionObject.options[index]}
                </div>
            `;
        };
        optionsDiv.innerHTML = insertOptionsInHtml;

        document.querySelectorAll(".options .option").forEach(choise => {
            choise.addEventListener("click", optionClickEvent);
        });
    } else {
        finishQuiz();
    };
};

function resetQuiz() {
    currentQuestion = 0;
    numberOfCorrectAnswers = 0;
    progressBar.style.display = "none";
    setTimeout(() => {
        progressBar.style.display = "block";
    }, 1000);
    showQuestion();
};

showQuestion();

button.addEventListener("click", resetQuiz);