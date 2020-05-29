/**
 * @author Nityanand Ojha
 * @sprite animation
 */

window.requestAnimFrame = (function(callback) {
  return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function(callback) {
      window.setTimeout(callback, 1000 / 60);
    };
})();

function animate() {
	context.clearRect(0, 0, context.canvas.width, context.canvas.height);
	spriteMap.draw(context, 0, 0); // Draw the sprite
	requestAnimFrame(animate); // Run the animation loop
}

var pos = [{top:80, left:450},
			{top:80, left:450},
			{top:376, left:560},
			{top:386, left:680},
			{top:393, left:825}]
/*var pos = [{top:363, left:775},
			{top:373, left:660},
			{top:376, left:530},
			{top:389, left:410},
			{top:393, left:260},
			{top:383, left:120}]*/

var cStat = "";
var animNo = 0;
var feedbackVid = {
	
	init: function (){
		var __main = document.getElementById(spriteOBJ.parentDiv);
		var canvas = document.createElement("canvas");
		__main.appendChild(canvas);
		canvas.width = spriteOBJ.frameW;
		canvas.height = spriteOBJ.frameH;
		canvas.style.zIndex = "1";
		canvas.style.position = "absolute";
		canvas.style.transition = "left 0.6s cubic-bezier(.55,.06,.68,.19) 0.4s, top 0.6s cubic-bezier(.55,.06,.68,.19) 0.4s";
		canvas.style.webkitTransition = "left 0.6s cubic-bezier(.55,.06,.68,.19) 0.4s, top 0.6s cubic-bezier(.55,.06,.68,.19) 0.4s";
		canvas.setAttribute("id","animCanvas");
		canvas.style.top = spriteOBJ.animTop+"px";
		canvas.style.left = spriteOBJ.animLeft+"px";
		context = canvas.getContext('2d');
		
		var animNames = ['ideal', 'right', 'wrong'];
	
		// Initialize the SpriteMap
		spriteMap = new SpriteMap(
			spriteOBJ.imagePath,
			spriteOBJ.animSequence,
			{
			  frameW: spriteOBJ.frameW,
			  frameH: spriteOBJ.frameH,
			  projectedW: spriteOBJ.frameW, // Displayed width
			  projectedH: spriteOBJ.frameH, // Displayed height
			  interval: 50, // Switch frames every 50ms
			  useTimer: false, // Rely on requestAnimFrame to update frames instead of setInterval
			  
			  postInitCallback: function (sprite) {
				spriteMap.start('ideal'); // Start running the animation
				animate();
				
			  }
			  
			}
		);
	},
		
	playCorrectFeedback: function (func)
	{
		fun = func;
		spriteMap.runOnce(onFinish, 'right');
		var animCanv = document.getElementById("animCanvas");
		animCanv.style.top = pos[animNo].top+"px";
		animCanv.style.left = pos[animNo].left+"px";
		cStat = "ideal";
	},

	playWrongFeedback: function ()
	{
		spriteMap.runOnce(onFinishWrong, 'wrong');

		var animCanv = document.getElementById("animCanvas");
		animCanv.style.top = pos[1].top+"px";
		animCanv.style.left = pos[1].left+"px";
		cStat = "ideal";

		window.setTimeout(function(){
			animCanv.style.top = 500 + "px";
			spriteMap.runOnce(onFinishWrong, 'wrong2');
		},1000);

		window.setTimeout(function(){
			animCanv.style.visibility = "hidden";
			
		},2400);
		
	},
	
	doReset: function (){	
		spriteMap.use("ideal");
		animNo++;
	}
};

function onFinish(){
	//console.log(spriteMap.activeLoop, " finish");
	spriteMap.use(cStat);
	var animCanv1 = document.getElementById("animCanvas");	
	animCanv1.style.top = pos[animNo].top+"px";
	animCanv1.style.left = pos[animNo].left+"px";
	animNo++;
	
	try{
		//fun();
	}catch(Err)
	{
		console.log("Error:  ", Err);
	}
}
function onFinishWrong(){
	//console.log(spriteMap.activeLoop, " finish");
	spriteMap.use(cStat);
	
	try{
		
	}catch(Err)
	{
		console.log("Error:  ", Err);
	}
}
	