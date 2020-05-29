
var attempts = 2;
var main = document.getElementById("main");


var posQuesX = ["50", "250", "450", "650"];
var posQuesY = 350;

var posOptionX = ["50", "250", "450", "650"];
var posOptionY = 600;
var isDone  = false;
var checkBtn, solutionBtn,  resetBtn;
var dgArea;
var noticeMonkey;
var elementSolid;
var isDropped = false;
var storageTemp;
var startIntro;

intro();

function intro(){
 startIntro = document.createElement("div");
 startIntro.id = "start";
 main.appendChild(startIntro);

 var roundButton = document.createElement("div");
 roundButton.classList.add("startBtn");
 startIntro.appendChild(roundButton);

 var spanDiv = document.createElement("div");
 spanDiv.id = "SpanDiv";
 roundButton.appendChild(spanDiv);
 for(var i = 0; i<3; i++){
 	var spans= document.createElement("span");
 	spans.id= "span"+i;
 	spanDiv.appendChild(spans);
 }

 var introCaption = document.createElement("div");
 introCaption.id = "IntroCaption";
 introCaption.innerHTML = "PLAY";
 startIntro.appendChild(introCaption);

roundButton.addEventListener("click", init);
	
}




function init(){
  startIntro.style.display = "none";
  createQuestions();
  feedbackVid.init();
  
  //for check button
  checkBtn = document.createElement("div");
  checkBtn.classList.add("button");
  checkBtn.id = "CheckBtn";
  checkBtn.innerHTML="Submit";
  main.appendChild(checkBtn);
  checkBtn.style.opacity = 0.5;
  checkBtn.style.pointerEvents = "none";
  checkBtn.addEventListener("click", checkAnswer);
  
  //for solution button
  solutionBtn = document.createElement("div");
  solutionBtn.classList.add("button");
  solutionBtn.id = "SolutionBtn";
  solutionBtn.innerHTML="Solution";
  main.appendChild(solutionBtn);
  solutionBtn.addEventListener("click", checkSolution);
  
  
  //reset Button
  resetBtn = document.createElement("div");
  resetBtn.id = "ResetBtn";
  main.appendChild(resetBtn);
  resetBtn.addEventListener("click", resetActivity);
  


  //crocodile img placement

  var croco = document.createElement("div");
  croco.id="Croco";
  main.appendChild(croco);


 //rubric here

 var rubric = document.createElement("div");
 rubric.id="Rubric";
 main.appendChild(rubric);
 rubric.innerHTML = data.rubric;
  

// Next Previous Button
var nextPrevDiv  = document.createElement("div");
nextPrevDiv.id="NextPrevDiv";
main.appendChild(nextPrevDiv);
var prevBtn = document.createElement("div");
prevBtn.id="PrevBtn";
nextPrevDiv.appendChild(prevBtn);
var nextBtn = document.createElement("div");
nextBtn.id="NextBtn";
nextPrevDiv.appendChild(nextBtn);

  
  //sunTimer
  sunTimer();

}


function resetActivity(){
	location.reload();

}	
 
 
function sunTimer(){
	var outerDiv = document.createElement("div");
	outerDiv.id = "OuterDivSun";
	main.appendChild(outerDiv);
	
	
	var innerDiv = document.createElement("div");
	innerDiv.id = "InnerDivSun";
	outerDiv.appendChild(innerDiv);
	
	var sun  = document.createElement("div");
	sun.id = "TimerSun";
	innerDiv.appendChild(sun);
	

	noticeMonkey = document.createElement("div");
	noticeMonkey.id ="NoticeMonkey";
	main.appendChild(noticeMonkey);

	window.setTimeout(function(){
		if(isDropped==false){
			noticeMonkey.style.background = "url('./Assets/images/noticeMonkey.png')";
			noticeMonkey.style.display = "block";
		}
	}, 20000);

	window.setTimeout(activityCompleted, 35000);
		
}

function activityCompleted(){
	resetBtn.style.visibility = "visible";

	var starsUrl = ["./Assets/images/star1.png", "./Assets/images/star2.png", "./Assets/images/star3.png"];
	var finishBack = document.createElement("div");
	finishBack.id = "FinishBack";
	main.appendChild(finishBack);
	finishBack.appendChild(resetBtn);
	var starsBack = document.createElement("div");
	starsBack.style.width = "700px";
	starsBack.style.height = "200px";
	starsBack.style.position = "absolute";
	starsBack.style.top= "180px";
	finishBack.appendChild(starsBack);
	
	
	for(var i=0;i<3;i++){
	 var stars  = document.createElement("div");
	 starsBack.appendChild(stars);
	 stars.classList.add("Stars");
	 stars.id = "stars" + i;
	 stars.style.position = "relative";
	 stars.style.background = "url(" + starsUrl[i] + ")";
	 stars.style.width ="150px";
	 stars.style.height = "150px";
	 stars.style.marginRight = "10px";
	 stars.style.display = "inline-block";
	 stars.style.backgroundSize ="150px 150px";
	}
	
	var activityText = document.createElement("div");
	finishBack.appendChild(activityText);
	activityText.id = "ActivityText";
	activityText.innerHTML = "Activity Completed";
	activityText.style.position = "absolute";
	activityText.style.width = "1200px";
	activityText.style.fontSize  = "100px";
	activityText.style.fontFamily = "activityfont";
	activityText.style.fontWeight = "bold";
	console.log("completed timer");
	
}




function createQuestions(){

for(var i=0;i<data.quesArr.length;i++){
  var j = 0;

  if(data.quesArr[i][j].Ans == "")
  {
  var quesBox = document.createElement("div");
  
  quesBox.style.position = "absolute";
  quesBox.style.transform = "translate("+ posQuesX[i] + "px"+ ","+ posQuesY + "px" + ")";
  quesBox.id = "quesbox"+i;
  
  quesBox.classList.add("QuesBox");
  quesBox.style.color = "#fff";
  quesBox.style.fontSize = "50px";
  quesBox.style.fontFamily  = "Arial";
  
  var QuesTextP = document.createElement("p");

  quesBox.appendChild(QuesTextP);

  QuesTextP.innerHTML = data.quesArr[i][j].ques;

  main.appendChild(quesBox);
  console.log("array data "+ data.quesArr[i][j].ques + "length "+ data.quesArr.length);
  j++;
  
  }
  else{
  var quesBox = document.createElement("div");
  var innerBox = document.createElement("div");
  	
  quesBox.style.position = "absolute";
  quesBox.style.transform = "translate("+ posQuesX[i] + "px"+ ","+ posQuesY + "px" + ")";
  quesBox.id = "quesbox"+i;
 
  quesBox.classList.add("DragArea");
  quesBox.classList.add("dropzone");
  quesBox.classList.add("yes-drop");
  
  main.appendChild(quesBox);
  dgArea = document.getElementsByClassName("DragArea");


  //fallable solid
  elementSolid = document.createElement("div");
  elementSolid.id = "ElemSolid";
  main.appendChild(elementSolid);
  elementSolid.style.left = posQuesX[i]+"px";
  
  j++;

  }

  }

createOptions(dgArea);
}

function createOptions(dgArea){
  for(var i=0;i<data.optionArr.length;i++){
  var j = 0;
	var optionBox = document.createElement("div");
	
	optionBox.style.position = "absolute";
	//optionBox.style.transform = "translate("+ posOptionX[i] + "px"+ ","+ posOptionY + "px" + ")";
  optionBox.style.left = posOptionX[i]+"px";
  optionBox.style.top = posOptionY+"px";
	optionBox.id = "option"+i;
	optionBox.classList.add("draggable");
	optionBox.classList.add("yes-drop");
  optionBox.classList.add("Option");
 	optionBox.style.color = "#fff";
  optionBox.style.fontSize = "50px";
  optionBox.style.fontFamily  = "Arial";
  optionBox.innerHTML = data.optionArr[i][j].ques;
	main.appendChild(optionBox);
  console.log("array data "+ data.optionArr[i][j].ques + "length "+ data.optionArr.length);
  j++;
  }
  startDragandDrop(optionBox, dgArea);
}


function createSprite(){


}

function checkAnswer(){


if(isDropped==true)
{
	console.log("Element dropped");
			var croco = document.getElementById("Croco");
			croco.style.visibility = "visible";
			croco.style.animation = "crocoAnimate 3s linear forwards";

for(var i=0;i<data.quesArr.length;i++)
{
	var answer;
	var j = 0;
		
		if(data.quesArr[i][j].ques == ""){
			answer = data.quesArr[i][j].Ans ;
				
			console.log(answer);
		}
		else{
			
		}
}		
		if(storageTemp == answer){
		
			if(isDropped==true){	
			noticeMonkey = document.createElement("div");
			noticeMonkey.id ="NoticeMonkey";
			main.appendChild(noticeMonkey);
			noticeMonkey.style.height = "251px";
			noticeMonkey.style.background = "url('./Assets/images/goodjob.png')";
			noticeMonkey.style.display = "block";
		}
			console.log("correct Answer" + storageTemp + answer);
			dgArea[0].style.border ="5px solid green";
			solutionBtn.style.pointerEvents = "none";
			solutionBtn.style.opacity = "0.5";
			feedbackVid.playCorrectFeedback();
			
			window.setTimeout(activityCompleted, 5000);
		}
		else{
			dgArea[0].style.border ="5px solid red";
			console.log("wrong Answer");

			feedbackVid.playWrongFeedback();		

			//on wrong answer the solid will fall down
			window.setTimeout(function(){
			
			dgArea[0].style.background = "none";
			var currentPlaced =  document.getElementById("alreadyPlaced");
			currentPlaced.style.color = "red";
			
			//element solid visiblity
			elementSolid.style.display = "block";


			solutionBtn.style.pointerEvents = "none";
			solutionBtn.style.opacity = "0.5";

			},1000);
			
			window.setTimeout(activityCompleted, 4000);	
		}

}

else{
	
	console.log("element not dropped");	
}
}

function checkSolution(){
for(var i=0;i<data.quesArr.length;i++)
{
	var answer;
	var j = 0;
		
		if(data.quesArr[i][j].ques == ""){
			answer = data.quesArr[i][j].Ans;				
			console.log(answer);
		}
		else{
			
		}
}
		if(isDropped == true){
			alreadyPlaced.style.visibility = "hidden";
		}
		
		dgArea[0].classList.add("Animate");
		var draggedAreaText = document.createElement("p");
		draggedAreaText.id = "DraggedAreaText";
		
			dgArea[0].appendChild(draggedAreaText);
			draggedAreaText.innerHTML = answer;
			solutionBtn.removeEventListener("click", checkSolution);
			checkBtn.removeEventListener("click", checkAnswer);
			
			solutionBtn.style.opacity = 0.5;
			solutionBtn.style.cursor = "not-allowed";
			window.setTimeout(activityCompleted, 5000);
}
 

	
 
 

//--------------------------------------------------------------------------------------------------------------------

function startDragandDrop(optionBox, dgArea){

interact('.draggable').draggable({
    // enable inertial throwing
    inertia: false,
    // keep the element within the area of it's parent
    restrict: {
      restriction: "#main",
      endOnly: false,
      elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
    },
    // enable autoScroll
    autoScroll: true,

    // call this function on every dragmove event
    onmove: dragMoveListener,
    // call this function on every dragend event
    onend: function (event) {


     /* var textEl = event.target.querySelector('p');
	
      textEl && (textEl.textContent =
        'moved a distance of '
        + (Math.sqrt(event.dx * event.dx +
                     event.dy * event.dy)|0) + 'px');*/
    }
  });

function dragMoveListener (event) {
   
 

    var target = event.target,


        // keep the dragged position in the data-x/data-y attributes
        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
		
//console.log(target.getAttribute('data-x'),"-----",target.getAttribute('data-y'));
    // translate the element

  

    target.style.webkitTransform =
    target.style.transform =
      'translate(' + x + 'px, ' + y + 'px)';
	  
    // update the posiion attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
	  target.style.zIndex = "200";

  }

  // this is used later in the resizing and gesture demos
  window.dragMoveListener = dragMoveListener;
  
interact('.dropzone').dropzone({
  // only accept elements matching this CSS selector
  accept: '.yes-drop',
  // Require a 75% element overlap for a drop to be possible
  overlap: 0.25,

  // listen for drop related events:

  ondropactivate: function (event) {
    // add active dropzone feedback
	if(event.target.isDone == false){
		event.target.classList.add('drop-active');
	}

  
  
  },
  
  ondragenter: function (event) {
    var draggableElement = event.relatedTarget,
        dropzoneElement = event.target;
	
	if(event.target.isDone == false){
		dropzoneElement.classList.add('drop-target');
	}
    draggableElement.classList.add('can-drop');

    dropzoneElement.style.border = "4px dashed black";
    dropzoneElement.classList.add("Animate");

    //draggableElement.textContent = 'Dragged in';
    
  },
  
  ondragleave: function (event) {
    //remove the drop feedback style
	
	if(event.relatedTarget.owner){
		event.relatedTarget.owner = null;
		event.target.guest = null;
	}
	//console.log(event.target.id,"*******************")
	
    event.target.classList.remove('drop-target');
    event.relatedTarget.classList.remove('can-drop');

    event.target.style.border = "4px dashed grey" ;
    event.target.classList.remove("Animate");
    event.relatedTarget.classList.remove("DroppedElement");
	event.relatedTarget.classList.add("Option");
    //event.relatedTarget.textContent = 'Dragged out';
    
  },
  
  ondrop: function (event) {
    //event.relatedTarget.innerHTML = 'Dropped';
    replaceOption(event);
	console.log("onDrop: @@@@@@@@@@@@@@@@@@@@@@@");
	dropZoneAct = event.target;
    isDone = true;
	isDropped = true;
	dropZoneAct.style.border = "4px solid black" ;
	event.relatedTarget.classList.remove("Option");
	event.relatedTarget.classList.add("DroppedElement");
	event.relatedTarget.id = "alreadyPlaced";
	
	storageTemp = event.relatedTarget.innerHTML;
	event.relatedTarget.style.pointerEvents = "none";
	checkBtn.style.opacity = 1;
	checkBtn.style.pointerEvents = "auto";
	console.log(storageTemp);
	
  },
  
  ondropdeactivate: function (event) {
    // remove active dropzone feedback
    event.target.classList.remove('drop-active');
    event.target.classList.remove('drop-target');
	incorrectDropzone(event.relatedTarget, event.target);
	
  }
  
});

function replaceOption(event){
	if(isDropped == true){
	  
	  
	  var currentPlaced =  document.getElementById("alreadyPlaced");		
	  currentPlaced.style.transform = "translate(0px, 0px)";
	  currentPlaced.setAttribute('data-x', "0px");
	  currentPlaced.setAttribute('data-y', "0px");
	  currentPlaced.id = "";
	  currentPlaced.classList.add("Option");
	  currentPlaced.style.pointerEvents = "auto";
	}
	
	else{
		
	}
		
}

function incorrectDropzone(draggable, dropzone){
 
 console.log("incorrect Position" + isDone);

 if(!isDone)
 {
  var selectedid = draggable.id;
  var optionidarray = selectedid.split("option");
  var optionid = optionidarray[1];  
  
  var posXval = posOptionX[optionid];
  var leftX = posXval +"px";
  var topY = posOptionY + "px";
  
  draggable.setAttribute('data-x', "0px");
  draggable.setAttribute('data-y', "0px");

  draggable.style.transform = "translate(0px, 0px)";
  isDropped =false;
}

  isDone = false;
	
 }

}