var countdown = 50;
var correctAns = 0;
var wrongAns = 0;
var notAns = questionBank.length - (correctAns + wrongAns);
var runTimer;
var numOptions = 4;

function firstDisplay() {
  $("#time, form, .resultDiv").hide();
  startEventListener();
}

function addQuestion() {
  for (var i = 0; i < questionBank.length; i++) {
    var list = $("<li>");
    list.html(questionBank[i].question + "<br>");

    var groupID = i;

    for (var j = 1; j <= numOptions; j++) {

      var option = $("<input>");
      var label = $("<label>");

      //optionNum will be either option1,option2,option3,option4
      var optionNum = "option" + j;

      label.attr("for", groupID + optionNum)
           .attr("class", "form-check-label")
        .text(questionBank[i][optionNum]);

      option.attr("type", "radio")
        .attr("name", groupID)
        .attr("id", groupID + optionNum)
        .attr("class", "options");

      var currentValue = questionBank[i][optionNum];
      var correctAnswer = questionBank[i].correctAnswer;

      if (currentValue == correctAnswer) {
        option.attr("value", "correct");
      } else {
        option.attr("value", "incorrect");
      }

      list.append(option);
      list.append(label);
    }

    list.attr("data-value", 0);
    $("form ol").append(list);

  }
}

function startEventListener() {
  $("#startButton").on("click", function() {
    $("#time, form").show();
    $("#startButton").hide();
    //Call the run function in order to start the timer    
    run();
  });
}

function startAnswerListener() {
  $(".options").on("click", function() {
    var checkedInput = $(this).attr("value");
    var parentList = $(this.parentElement);

    if (checkedInput == "correct") {
      if (parentList.attr("data-value") == 0) {
        correctAns++;
        parentList.attr("data-value", "correct");
      } else if (parentList.attr("data-value") == "incorrect") {
        wrongAns--;
        correctAns++;
        parentList.attr("data-value", "correct");
      }

    } else if (checkedInput == "incorrect") {
      if (parentList.attr("data-value") == 0) {
        wrongAns++;
        parentList.attr("data-value", "incorrect");
      } else if (parentList.attr("data-value") == "correct") {
        wrongAns++;
        correctAns--;
        parentList.attr("data-value", "incorrect");
      }
    }
    notAns = questionBank.length - (correctAns + wrongAns);

  });
}

function createResultSection() {
  var result = $("<p>" + "<p>" + "<p>");
  var resetButton = $("<button>").addClass("reset").text("Play Again");
  result.eq(0).text("Correct answers : " + correctAns);
  result.eq(1).text("Inorrect answers : " + wrongAns);
  result.eq(2).text("Unanswered : " + notAns);
  $(".resultDiv").append(result, resetButton);
}

function resetGameEventListener() {
  $(".reset").on("click", function() {
    location.reload();
  });
}

//Starts the countdown timer
function run() {
  //Clearing the runTimer prior to setting 
  //our new runTimer will not allow multiple instances.
  clearInterval(runTimer);
  runTimer = setInterval(timer, 1000);
}

function timer() {
  //Decrease the countdown
  countdown--;
  //Update text of countdown holder span tag
  $("span").text(countdown);

  //Once timer hits zero, stop timer
  //update the content div
  if (countdown === 0) {
    //Call the stop function to stop the timer
    stop();

    $("#time, form, #startButton").hide();
    $(".resultDiv").show();

    createResultSection();
    resetGameEventListener();
  }
}

function submitButtonListener() {
  $("#submitButton").on("click", function() {
    event.preventDefault();
    stop();
    $("#time, form, #startButton").hide();
    $(".resultDiv").show();
    createResultSection();
    resetGameEventListener();
  });
}
//Stops the timer
function stop() {
  //  Clears runTimer
  clearInterval(runTimer);
}

function startGame() {
  firstDisplay();
  addQuestion();
  startAnswerListener();
  submitButtonListener();
}
startGame();