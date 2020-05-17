(function(){

    function buildQuiz(){

      var output = [];

      myQuestions.forEach(
        (currentQuestion, questionNumber) => {

          var answers = [];

          for(letter in currentQuestion.answers){

            answers.push(
              `<label>
                <input type="radio" name="question${questionNumber}" value="${letter}">
                ${letter} :
                ${currentQuestion.answers[letter]}
              </label>`
            );
          }

          output.push(
            `<div class="slide">
              <div class="question"> ${currentQuestion.question} </div>
              <div class="answers"> ${answers.join("")} </div>
            </div>`
          );
        }
      );

      quizContainer.innerHTML = output.join('');
    }
  
    function showResults(){

      var answerContainers = quizContainer.querySelectorAll('.answers');

      var numCorrect = 0;

      myQuestions.forEach( (currentQuestion, questionNumber) => {

        var answerContainer = answerContainers[questionNumber];
        var selector = `input[name=question${questionNumber}]:checked`;
        var userAnswer = (answerContainer.querySelector(selector) || {}).value;

        if(userAnswer === currentQuestion.correctAnswer){
          numCorrect++;
          answerContainers[questionNumber].style.color = 'lightgreen';
        }   else{
        answerContainers[questionNumber].style.color = 'red';

        }
      });
  

      resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
    
    }
  
    function showSlide(n) {
      slides[currentSlide].classList.remove('active-slide');
      slides[n].classList.add('active-slide');
      currentSlide = n;
      if(currentSlide === 0){
        previousButton.style.display = 'none';
      }
      else{
        previousButton.style.display = 'inline-block';
      }
      if(currentSlide === slides.length-1){
        nextButton.style.display = 'none';
        submitButton.style.display = 'inline-block';
      }
      else{
        nextButton.style.display = 'inline-block';
        submitButton.style.display = 'none';
      }
    }
  
    function showNextSlide() {
      showSlide(currentSlide + 1);
    }
  
    function showPreviousSlide() {
      showSlide(currentSlide - 1);
    }

    function showForm() {
        document.getElementById('form').style.display = 'inline-block';
      }
    

    var quizContainer = document.getElementById('quiz');
    var resultsContainer = document.getElementById('results');
    var submitButton = document.getElementById('submit');
    var myQuestions = [
      {
        question: "What are the four edit modes in Pro Tools?",
        answers: {
          a: "Cut, copy, paste, and shift",
          b: "Shuffle, spot, slip, and grid",
          c: "Shuffle, grid, move, and paste",
          d: "Shuffle, move, shift, and retract"
        },
        correctAnswer: "b"
      },
      {
        question: "Which three main tools make up the 'Smart Tool' in ProTools?",
        answers: {
          a: "Grabber, selector, and pencil",
          b: "Grid, scrubber, and trimmer",
          c: "Scrubber, edit, and region",
          d: "Trimmer, grabber, and selector"
        },
        correctAnswer: "d"
      },
      {
        question: "What are the two basic types of Track Grouping?",
        answers: {
          a: "Edit and mix",
          b: "Region and selection",
          c: "Solo and mute",
          d: "Waveform and automation"
        },
        correctAnswer: "a"
      }
    ];
  

    buildQuiz();
    timer();
  

    var previousButton = document.getElementById("previous");
    var nextButton = document.getElementById("next");
    var slides = document.querySelectorAll(".slide");
    var currentSlide = 0;
  

    showSlide(currentSlide);
  

    submitButton.addEventListener('click', showResults);
    submitButton.addEventListener('click', showForm);
    previousButton.addEventListener("click", showPreviousSlide);
    nextButton.addEventListener("click", showNextSlide);
    
    
    var enterButton = document.getElementById('enter');
    var inputInitials= document.getElementById("initials");
   
    enterButton.addEventListener("click", function(event){
        event.preventDefault()});
    enterButton.addEventListener("click", setStorage);
    enterButton.addEventListener("click", showScores);
    
    function setStorage() {
    localStorage.setItem("initials", inputInitials.value);
    localStorage.setItem("score", numCorrect);
    }

    function showScores() {
        document.getElementById('scores').textContent = localStorage.getItem("initials");
        document.getElementById('scores').textContent = localStorage.getItem("score")
        document.getElementById('scores').style.display = 'inline-block';
        
    }

    function timer(){
        var sec = 30;
        var timer = setInterval(function(){
            document.getElementById('timer').innerHTML='00:'+sec;
            sec--;
            if (sec < 0) {
                clearInterval(timer);
                showResults();
            }
        }, 1000);
    }



})();
