let question = document.querySelector("#ques");
let choices = Array.from(document.querySelectorAll(".option"));
let myscore = document.querySelector("#score")
let progbar = document.querySelector("#progress-bar-fill")
let numque = document.querySelector("#numques")

let questions=[{
    question:"What does HTML stand for?",
    choice1:"Hyper Text Markup Language",
    choice2:"Home Tool Markup Language",
    choice3:"Hyperlinks and Text Markup Language",
    choice4:"invalid answer",
    answer:1
},
{
    question:"Choose the correct HTML tag for the largest heading",
    choice1:"Head",
    choice2:"h1",
    choice3:"h6",
    choice4:"heading",
    answer:2
},
{
    question:"What is the correct HTML tag for inserting a line break?",
    choice1:"break",
    choice2:"br",
    choice3:"lb",
    choice4:"brs",
    answer:2

}]

let currentQuestion={};
let acceptAnswers=false;
let score=0;
let questionCounter=0
let availableQuestions=[];
const CORRECT_BONUS=10
const MAX_QUESTIONS=3

let startgame = ()=>{
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    // console.log(availableQuestions)
    getNewQuestion()
}

let getNewQuestion = ()=>{
    if(availableQuestions.length===0 || questionCounter>=MAX_QUESTIONS){
        return 
    }

    questionCounter++;
    numque.innerText = questionCounter
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

choices.forEach((choice)=>{
    choice.addEventListener("click",e=>{
        if(!acceptAnswers) return;
        acceptAnswers = false
        const selectedchoice = e.target
        const selectedAnswer = selectedchoice.dataset.number
        const classTOApply = selectedAnswer==currentQuestion.answer ? "correct" : "wrong"
        selectedchoice.classList.add(classTOApply)
        if(classTOApply=="correct"){
            myscore.innerText = parseInt(myscore.innerText) + CORRECT_BONUS;
        }
        setTimeout(()=>{
            selectedchoice.classList.remove(classTOApply)
            getNewQuestion()
        },1000)
        
    })
})

startgame()


















// let count = 0
// let len = questions.length
// var i1 = 0;

// function dumps(i){
//     question.innerText = questions[i].question;
//     for(let j = 0; j<4; j++){
//         option[j].innerText = questions[i][`choice${j+1}`]
//     }
//     i1 += 1;
// }

// dumps(i1);

// for(let i = 0; i<4; i++){
//     option[i].addEventListener("click", function(){dumps(i1)})
// }


         
