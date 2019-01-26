var countdown = 5;
var correctAns = 0;
var wrongAns = 0;
var notAns = 0;
var runTimer;

function firstDisplay(){
	$("#time, form").hide();
}
firstDisplay();

function startEventListener(){
	$("#startButton").on("click",function(){
		$("#time, form").show();
		//Call the run function in order to start the timer    
		run();
	});
}
startEventListener();

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
		var resetButton = $("<button>").text("Play Again");
		result.eq(0).text("Correct answers : "+ correctAns);
		result.eq(1).text("Inorrect answers : "+ wrongAns);
		result.eq(2).text("Unanswered : "+ notAns);
		$("#content").append(result, resetButton);
 	}
}

//Stops the timer
function stop() {
    //  Clears our runTimer
    clearInterval(runTimer);
}

