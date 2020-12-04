let question = document.querySelector("#ques");
let choices = Array.from(document.querySelectorAll(".option"));
let myscore = document.querySelector("#score")
let progbar = document.querySelector("#progress-bar-fill")
let numque = document.querySelector("#numques")
let totalques = document.querySelector("#totalQues")

let currentQuestion={};
let acceptAnswers=false;
let score=0;
let questionCounter=0
let availableQuestions=[];
const CORRECT_BONUS=10
const MAX_QUESTIONS=5
let questions = []

fetch('https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple')
.then(response => response.json())
.then(loadedQuestions => {
    questions = loadedQuestions.results.map(loadQuestions=>{
        const formattedQuestions = {
            question : loadQuestions.question
        }
        const answerChoices = [...loadQuestions.incorrect_answers]
        formattedQuestions.answer = Math.floor(Math.random()*4)+1
        answerChoices.splice(
            formattedQuestions.answer-1,
            0,
            loadQuestions.correct_answer
        )
        answerChoices.forEach((elem,index)=>{
            formattedQuestions["choice"+(index+1)] = elem;
        })
        return formattedQuestions
    })
    startgame()
})
.catch((error) => {
    console.error('Error:', error);
  });

let startgame = ()=>{
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    // console.log(availableQuestions)
    getNewQuestion()
}

let getNewQuestion = ()=>{
    if(availableQuestions.length===0 || questionCounter>=MAX_QUESTIONS){
        return window.location.assign('result.html');
    }

    questionCounter++;
    numque.innerText = questionCounter
    totalques.innerText = MAX_QUESTIONS
    let per = questionCounter/MAX_QUESTIONS*100
    progbar.style.width = `${per}%`
    const questionIndex = Math.floor(Math.random()*availableQuestions.length)
    currentQuestion = availableQuestions[questionIndex]
    // console.log(currentQuestion)
    question.innerText = currentQuestion.question;

    choices.forEach((choice)=>{
        const number = choice.dataset.number
        choice.innerText = currentQuestion['choice'+number]
        // `console.log(number)
    })

    availableQuestions.splice(questionIndex,1)
    acceptAnswers = true
}

let count2 = 0
choices.forEach((choice)=>{
    choice.addEventListener("click",e=>{
        if(!acceptAnswers) return;
        acceptAnswers = false
        const selectedchoice = e.target
        const selectedAnswer = selectedchoice.dataset.number
        const classTOApply = selectedAnswer==currentQuestion.answer ? "correct" : "wrong"
        selectedchoice.classList.add(classTOApply)
        if(classTOApply=="correct"){
            // myscore.innerText = parseInt(myscore.innerText) + CORRECT_BONUS;
            score = score + CORRECT_BONUS;
            myscore.innerText = score
        }
    
        let arr
        if(localStorage.getItem('maxscore') === null){
            arr = []
            localStorage.setItem('maxscore', JSON.stringify(arr))
        }
        count2++
        if(count2==MAX_QUESTIONS){
            a = JSON.parse(localStorage.getItem('maxscore'));   
            a.push(score)
            // console.log(a)
            localStorage.setItem('maxscore', JSON.stringify(a));
        }

        localStorage.setItem('finalscore', score);
        setTimeout(()=>{
            selectedchoice.classList.remove(classTOApply)
            getNewQuestion()
        },1000)
        
    })
})
















         
