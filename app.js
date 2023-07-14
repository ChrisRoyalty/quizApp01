let question = document.getElementById("questions");
let option1 = document.getElementById("option1");
let option2 = document.getElementById("option2");
let option3 = document.getElementById("option3");
let option4 = document.getElementById("option4");
let loader = document.querySelector(".loader");
let mainCcontent = document.getElementById("main-content");
let buttons = document.querySelectorAll("button");
let progress = document.getElementById("progress");
let score = document.querySelector(".score");
let scoreDiv = document.querySelector(".scoreDiv");
let right = document.getElementById("right");
let wrong = document.getElementById("wrong");
let endGame = document.getElementById("endGame");

let api =
  "https://opentdb.com/api.php?amount=50&category=9&difficulty=medium&type=multiple";
let arr = [];
let nextQuestion = 0;
let answerCount = 0;
fetch(api)
  .then((response) => response.json())
  .then((data) => {
    console.log(data.results);
    let quiz = data.results;
    quiz.map((item) => {
      let quizObj = {
        question: item.question,
        options: [...item.incorrect_answers, item.correct_answer],
        answer: item.correct_answer,
      };
      quizObj.options.sort((a) => Math.random() - 0.5);
      arr.push(quizObj);
    });
    arr.sort((a) => Math.random() - 0.5);
    question.innerHTML = arr[nextQuestion].question;
    option1.innerHTML = arr[nextQuestion].options[0];
    option2.innerHTML = arr[nextQuestion].options[1];
    option3.innerHTML = arr[nextQuestion].options[2];
    option4.innerHTML = arr[nextQuestion].options[3];
    loader.style.display = "none";
    mainCcontent.style.display = "flex";
  });

for (const button of buttons) {
  let btn = [option1, option2, option3, option4];
  button.onclick = function () {
    btn.map((butt) => (butt.disabled = true));
    if (button.innerText === arr[nextQuestion].answer) {
      button.style.backgroundColor = "green";
      button.style.color = "white";
      right.play();
      answerCount++;
      setTimeout(() => {
        button.style.backgroundColor = "rgba(0, 0, 0, 0.733)";
        button.style.color = "white";
      }, 1000);
    } else {
      button.style.backgroundColor = "red";
      button.style.color = "white";
      wrong.play();
      setTimeout(() => {
        button.style.backgroundColor = "rgba(0, 0, 0, 0.733)";
        button.style.color = "white";
      }, 1000);
    }
    setTimeout(() => {
      nextQuestion++;
      progress.innerText = `Question ${nextQuestion + 1} of 10`;
      btn.map((butt) => (butt.disabled = false));
      question.innerHTML = arr[nextQuestion].question;
      option1.innerHTML = arr[nextQuestion].options[0];
      option2.innerHTML = arr[nextQuestion].options[1];
      option3.innerHTML = arr[nextQuestion].options[2];
      option4.innerHTML = arr[nextQuestion].options[3];
    }, 2000);
    setTimeout(() => {
      if (nextQuestion === 10) {
        mainCcontent.style.display = "none";
        endGame.play();
        scoreDiv.style.display = "grid";
        score.innerText = `${answerCount}/10`;
      }
    }, 2000);
  };
}
