var countdown = 50;
var correctAns = 0;
var wrongAns = 0;
var notAns = 0;
var runTimer;
var numOptions = 4;

function firstDisplay(){
	$("#time, form").hide();
	startEventListener();
}

function addQuestion(){
  for (var i = 0; i < questionBank.length; i++) {
	var list = $("<li>");
	list.html(questionBank[i].question + "<br>");

	// var option = $("<input>");
	// var label = $("<label>");
	// label.attr("for",questionBank[i].option1)
	// 	 .text(questionBank[i].option1);

	// option.attr("type","radio")
	// 	  .attr("name",questionBank[i].name)
	// 	  .attr("id",questionBank[i].option1);
	
	// list.append(option);
	// list.append(label);

	// var option = $("<input>");
	// var label = $("<label>");
	// label.attr("for",questionBank[i].option2)
	// 	 .text(questionBank[i].option2);

	// option.attr("type","radio")
	// 	  .attr("name",questionBank[i].name)
	// 	  .attr("id",questionBank[i].option2);
	
	// list.append(option);
	// list.append(label);

	// var option = $("<input>");
	// var label = $("<label>");
	// label.attr("for",questionBank[i].option3)
	// 	 .text(questionBank[i].option3);

	// option.attr("type","radio")
	// 		.attr("name",questionBank[i].name)
	// 		.attr("id",questionBank[i].option3);
	
	// list.append(option);
	// list.append(label);

	// var option = $("<input>");
	// var label = $("<label>");
	// label.attr("for",questionBank[i].option4)
	// 	 .text(questionBank[i].option4);
		 
	// option.attr("type","radio")
	// 		.attr("name",questionBank[i].name)
	// 		.attr("id",questionBank[i].option4);
	
	// list.append(option);
	// list.append(label);
	
	// $("form ol").append(list);

	var groupID = i;
	for (var j = 1; j <=numOptions; j++) {
		var option = $("<input>");
		var label = $("<label>");
		//optionNum will be either option1,option2,option3,option4
		var optionNum = "option"+j;
		label.attr("for",groupID+optionNum)
			 .text(questionBank[i][optionNum]);
		option.attr("type","radio")
		  .attr("name",groupID)
		  .attr("value",questionBank[i][optionNum])
		  .attr("id",groupID+optionNum)
		  .attr("class","options");
		list.append(option);
		list.append(label);
	}

	$("form ol").append(list);

  }
}

function startEventListener(){
	$("#startButton").on("click",function(){
		$("#time, form").show();
		$("#startButton").hide();
		//Call the run function in order to start the timer    
		run();
	});
}

// function startAnswerListener(){
// 	$(".options").on("click",function(){
// // 		this cha name is index of question
// 	// $('input[name=]:checked').val();
// // 		use that index to get the questionbank object
// // 		check the index of correct answer
// // 		concat that to "option"
// // 		if that string is same as the value 
// // 		of selected radio button then increment counter

// 	});
// }
// startAnswerListener();
function resetGameEventListener(){
	$(".reset").on("click",function(){
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

function timer(){
	//Decrease the countdown
	countdown --;
	//Update text of countdown holder span tag
	$("span").text(countdown);

	//Once timer hits zero, stop timer
	//update the content div
	if (countdown===0) {
		//Call the stop function to stop the timer
		stop();

		$("#time, form, #startButton").hide();
		
		//Create 'p' tags with updated text
		//and append to content div
		var result = $("<p>" + "<p>" + "<p>");
		var resetButton = $("<button>").addClass("reset").text("Play Again");
		result.eq(0).text("Correct answers : "+ correctAns);
		result.eq(1).text("Inorrect answers : "+ wrongAns);
		result.eq(2).text("Unanswered : "+ notAns);
		$("#content").append(result, resetButton);
		resetGameEventListener();
 	}
}

//Stops the timer
function stop() {
    //  Clears runTimer
    clearInterval(runTimer);
}

function startGame(){
	firstDisplay();
	addQuestion();
	startAnswerListener();
}
startGame();

