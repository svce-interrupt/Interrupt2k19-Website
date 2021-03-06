/*******************/
/* EVENTS-SNAKE.JS */
/*******************/

/* This script concerns itself with the creation of the snake and its actions. NO STUPID LIBRARIES USED.*/

/* We define the snake as an object with certain properties and functions. */
class Snake {

	constructor() {
		this.color = "#D32F2F";
		this.alternateColor = "#FFFF00";

		this.length = 7; /* 5 pixels */
		this.speed = 80; /* 1 pixel per 500ms */
		this.direction = 2; /* 1 -> top; 2 -> right; 3 -> down; 4 -> left */
		
		this.mode = 0; /* 0 -> Non-game; 1 -> Game */

		this.joystickAppear = 0; /* Joystick hasn't appeared as of yet. */
		this.score = 0; /* The score of the player when in game mode. */
	
		this.snakeArray = [420,421,422,423,424,425,426]; /* The pixel array that is the snake. */
		this.lastPixel = 420;

		this.eventsPixels = [187,327,133,500]; /* The pixels containing the events. */
		this.food = 0; /* The pixel with the food when in game mode. */
		this.collision = 0; /* Has there been a collision with a food/event or not? 2 is a sort of locking state. */
		this.gameOver = 0; /* Is the game over or not? */

		displayRulesForMode(this.mode);
	}

	/*--------------------------*/
	/* INITIALISATION FUNCTIONS */
	/*--------------------------*/

	/* This function adds the timer functions necessary for the object. */
	start() {
		var thisSnake = this;

		/* We first set the timer for the 'movement' of the snake on screen. */
		var startSlithering = function() {
			thisSnake.slither();
		}
		this.slithering = window.setInterval(startSlithering,this.speed);
	}

	/* This function restarts the game and restores the settings to defaults. */
	restart() {
		/* We paint all colored pixels to their default black. */
		var iter;
		for(iter=0; iter<this.snakeArray.length; iter++)
			document.getElementById("pixel-"+this.snakeArray[iter]).style.backgroundColor = "black";

		document.getElementById("pixel-"+this.food).style.backgroundColor = "black";

		/* We clear all existing timers related to the snake. */
		clearInterval(this.slithering);

		/* We display the required messages on the SNAKE-HEADER. */
		document.getElementById('snake-header').innerHTML = "EVENTS";
		document.getElementById('snake-score').innerHTML = "0";

		/* We assign all attributes to their default value. */
		this.length = 7;
		this.speed = 80;
		this.direction = 2;
		this.score = 0;
		this.snakeArray = [420,421,422,423,424,425,426];
		this.lastPixel = 420;
		this.food = 567;
		
		/* We now call start() and restore to default. */
		this.start();
	}

	/*--------------------------------------*/
	/* PIXEL (UPDATION, GENERATION) METHODS */
	/*--------------------------------------*/

	/* This function updates the snake on screen every second. */
	slither() {
		this.updateSnakeArray(); /* We update the snakeArray (pixels on which snake is drawn on). */

		/* We paint the pixels of the snake in alternating colors. */
		var iter;
		for(iter=0; iter<this.length; iter+=1) {
			var idGen = "pixel-"+(this.snakeArray[iter]);
			if(iter % 2 == 0) document.getElementById(idGen).style.backgroundColor = this.color;
			else document.getElementById(idGen).style.backgroundColor = this.alternateColor;
		}

		/* The snake's previous last pixel, now out, is painted black. */
		document.getElementById("pixel-"+this.lastPixel).style.backgroundColor = "black";
	
		if(this.mode == 0) { /* If we are in non-game mode... */

			/* If the snake collides with the home icon, we redirect. */	
			if(this.snakeArray[this.length-1] == 327) window.location.href="/";
			/* If there is a collision, we flag a variable. */
			else if(this.eventsPixels.includes(this.snakeArray[this.length-1]) && this.collision != 2) this.collision = 1;
			/* We now check if the game controller*/
			else if(this.snakeArray[this.length-1] == 275 && this.joystickAppear == 1) {

				/* We first remove all the 'events-related' elements. */
				this.removeEventsPixels();
				this.mode = 1;

				/* We then add all the 'games-related' elements. */
				document.getElementById("snake-score").style.display = "block";
				displayRulesForMode(this.mode);	

				/* We then generate a random food pixel. */
				this.food = Math.floor(Math.random() * 700 + 100);
			}

		}
		else if(this.mode == 1) { /* If we are in game mode... */
			
			/* If there is a collision with the food pixel... */
			if(this.food == this.snakeArray[this.length-1]) {
				/* We first remove the food pixel. */
				document.getElementById("pixel-"+this.food).style.backgroundColor = "black";

				/* We increment the score and then reflect it in the score field. */
				this.score += 1;
				document.getElementById("snake-score").innerHTML = this.score;

				/* We also decrease speed each time score is a multiple of 7.*/
				if(this.score % 5 == 0 && this.score < 31) {
					clearInterval(this.slithering);
					this.speed -= 7;
					this.start();
				}
				else if(this.score % 10 == 0) {
					clearInterval(this.slithering);
					this.speed -= 7;
					this.start();
				}

				/* We then elongate the snake. */
				this.length += 1;
				this.snakeArray.unshift(this.food-this.length-1);

				/* We then generate a random food pixel again. */
				this.food = Math.floor(Math.random() * 700 + 100);
			}

			/* If there is a collision with the snake itself, then the game is over... */
			else if(this.snakeArray.slice(0,this.length-1).includes(this.snakeArray[this.length-1])) {
				clearInterval(this.slithering);
				this.gameOver = 1;
				var snakeHeader = document.getElementById("snake-header");

				if(screen.width <= 1000) snakeHeader.innerHTML = "GAME OVER (CLICK HERE)";
				else snakeHeader.innerHTML = "GAME OVER (PRESS ENTER)";
			}

			/* We paint the food pixel green. */
			if(this.mode == 1) document.getElementById("pixel-"+this.food).style.backgroundColor = "green";
		}
			
	}

	/* This function updates the snake array. */
	/* This array sets pixel positions (and movement) of snake on screen. */
	updateSnakeArray() {

		this.lastPixel = this.snakeArray[0];
		var iter;

		for(iter = 0; iter < this.length; iter++) {

			/* Except last element, all elements take the place of element after them. */	
			if(iter != this.length-1) {
				this.snakeArray[iter] = this.snakeArray[iter+1];
			}
			/* The last element gets the place calculated. */
			if(iter == this.length-1) {

				/* We check for directions and then for boundaries. */
				if(this.direction == 1) { /* If snake is slithering up... */
					if((this.snakeArray[iter] - 40) <= 0)
						this.snakeArray[iter] += 880;
					else
						this.snakeArray[iter] -= 40;
				}
				else if(this.direction  == 2) { /* If snake is slithering right... */
					if(this.snakeArray[iter] % 40 == 0)
						this.snakeArray[iter] -= 39;
					else
						this.snakeArray[iter] += 1;
				}
				else if(this.direction == 3) { /* If snake is slithering down... */
					if((this.snakeArray[iter] + 40) > 920)
						this.snakeArray[iter] -= 880;
					else
						this.snakeArray[iter] += 40;
				}
				else { /* if snake is slithering left... */
					if(this.snakeArray[iter] % 40 == 1)
						this.snakeArray[iter] += 39;
					else
						this.snakeArray[iter] -= 1;
				}
			}
			/* End of the if block. */
		}
		/* End of the for loop. */
	}
	/* End of the function. */

	/* This function checks if a 'fast turn' is occurring or not. More on this inside. */
	fastTurn(direction) {
		/* A 'fast turn' is a turn which occurs when the snake is moving, turned right/left... */
		/* really fast and then again turned 'right/left' really fast. When this happens ..... */
		/* before the snake is updated on screen, this causes the snake to eat itself. */

		var firstPixel = this.snakeArray[this.length-1];
		var secondPixel = this.snakeArray[this.length-2];

		if(direction == 1 && (firstPixel - 40) == secondPixel) return false;
		else if(direction == 2 && (firstPixel + 1) == secondPixel) return false;
		else if(direction == 3 && (firstPixel + 40) == secondPixel) return false;
		else if(direction == 4 && (firstPixel - 1) == secondPixel) return false;
		else return true;

		/* Before changing direction, we check if the to-happen movement will cause the snake ...*/
		/* to eat itself. If yes, we return false and the movement will not happen. If no, we ...*/
		/* return true and the movement is allowed to happen. */

	}

	/* This function removes the events-pixels and empties the eventsPixelsArray. */
	removeEventsPixels() {
		var elements = document.getElementsByClassName('events');
		var iter=0;

		for(iter=0; iter<this.eventsPixels.length; iter++)
			document.getElementById("pixel-"+this.eventsPixels[iter]).innerHTML = "";

		document.getElementById("pixel-275").innerHTML = "";

		this.eventsPixels = [];
	}

}

let mamba = new Snake();
mamba.start();

/*----------------*/
/* LONE FUNCTIONS */
/*----------------*/

/* This function initialises the rules-popup box when in game mode. */
function displayRulesForMode(mode) {
	
	/* Objects necessary for the function. */
	var rulesPopup = document.getElementById("rules-popup");
	var rulesClose = document.getElementById("rules-close");

	/* Iterator and storage variables. */
	var flickerIter = 0;
	var intervalStorage;

	/* Functions that we are defining for events/timers, etc. */
	var closePopup = function() { /* Function closes the popup box and related events. */
		rulesPopup.style.display = "none";
		document.removeEventListener( "keypress", closePopup );
		clearInterval( intervalStorage );
	}
	var mobileClosePopup = function() {
		rulesPopup.style.display = "none";
		rulesClose.removeEventListener( "click", mobileClosePopup );
		clearInterval( intervakStorage );
	}
	var closePopupFlicker = function() { /* Function makes the rules-close box flicker. */
		if(flickerIter == 0) {
			rulesClose.style.backgroundColor = "white";
			rulesClose.style.color = "purple";
			flickerIter = 1;
		}
		else {
			rulesClose.style.backgroundColor = "transparent";
			rulesClose.style.color = "white";
			flickerIter = 0;
		}
	}

	/* If we are in normal, non-game mode and on desktop. */
	if(mode == 0 && screen.width > 1000) {
		rulesPopup.style.display = "block";
		document.addEventListener( "keypress", closePopup );
		intervalStorage = window.setInterval( closePopupFlicker, 700 );
	}
	/* If we are in normal, non-game mode and on mobile. */
	else if(mode == 0 && screen.width <= 1000) {
		var html = "<header>HOW TO PLAY</header>"+
			   "<button id='rules-close'>TOUCH HERE TO CLOSE</button>"+
			   "<p><span>1.</span> Slide to control the snake's direction. </p>"+
		 	   "<p><span>2.</span> Navigate the snake onto the icons to get information about events.</p>"+
			   "<p><span>3.</span> For a surprise, navigate the snake to eat the <i class='material-icons'>sports_esports</i> which appears randomly on the screen! <span>Can you get the high score?</span></p>";
		
		rulesPopup.style.display = "block";
		rulesPopup.innerHTML = html;

		rulesClose = document.getElementById("rules-close");
		rulesClose.addEventListener( "click", mobileClosePopup );
		intervalStorage = window.setInterval( closePopupFlicker, 700 );
	}
	/* If we are in game mode and on desktop. */
	else if(mode == 1 && screen.width > 1000) {
		var html = "<header>YOU ARE NOW IN GAME MODE</header>"+
			   "<button id='rules-close'>PRESS SPACE TO CLOSE</button>"+
			   "<p>Eat as much food as possible and do not eat yourself!</p>"+
		 	   "<p>If you can score <span>above 60</span>, <span>we'll treat you!</span></p>"+
			   "<p>To go back to <span>'NORMAL'</span> mode, refresh the page.</p>";
		
		rulesPopup.style.display = "block";
		rulesPopup.innerHTML = html;

		document.addEventListener( "keypress", closePopup );

		rulesClose = document.getElementById("rules-close");
		intervalStorage = window.setInterval( closePopupFlicker, 700 );
	}
	else if(mode == 1 && screen.width <= 1000) {
		var html = "<header>YOU ARE NOW IN GAME MODE</header>"+
			   "<button id='rules-close'>TOUCH HERE TO CLOSE</button>"+
			   "<p><span>1. </span>Eat as much food as possible and do not eat yourself!</p>"+
		 	   "<p><span>2. </span>If you can score <span>above 60</span>, <span>we'll treat you!</span></p>"+
			   "<p><span>3. </span>To go back to <span>'NORMAL'</span> mode, refresh the page.</p>";
		
		rulesPopup.style.display = "block";
		rulesPopup.innerHTML = html;

		rulesClose = document.getElementById("rules-close");
		rulesClose.addEventListener( "click", mobileClosePopup );
		intervalStorage = window.setInterval( closePopupFlicker, 700 );
	}
}

/*------------------*/
/* TIMER DECLARATION */
/*------------------*/

/* This is the timeout function which displays the game controller on the screen.  */
let joystickAppear = window.setTimeout( function(){ 
	document.getElementById('pixel-275').innerHTML = "<i class='material-icons'>sports_esports</i>";
	mamba.joystickAppear = 1;
}, 10000);

/* This is the event-listener for the popup with the events info. */
let popupEvent = window.setInterval(function(){
	if(mamba.collision == 1) {
		document.getElementById('snake-popup').style.visibility = "visible";
		document.getElementById('closeButton').addEventListener("click", function(){
			document.getElementById('snake-popup').style.visibility = "hidden";
			mamba.collision = 0;
		});

		mamba.collision = 2;

		if(mamba.snakeArray[mamba.length-1] == 133) window.location.href="#coding-events";
		else if(mamba.snakeArray[mamba.length-1] == 500) window.location.href="#online-events";
		else if(mamba.snakeArray[mamba.length-1] == 187) window.location.href="#snake-popup";
	}
}, mamba.speed);

/*----------------------------*/
/* EVENT-LISTENER DECLARATION */
/*----------------------------*/



if(screen.width > 1000) { /* If the device is a desktop or laptop. */

	/* Event-Listener for arrow keys to change the snake's direction. */
	/* Event-Listener for 'Enter' key when in game mode to restart game. */

	document.addEventListener("keyup", function() {
		/* Depending upon the arrow button pressed, we change the snake's direction. */
		/* If the snake is going in a particular direction, it can't go in the opposite direction. */
		if(event.which == 38 && mamba.direction != 3 && mamba.fastTurn(1) == true) mamba.direction = 1;
		else if(event.which == 39 && mamba.direction != 4 && mamba.fastTurn(2) == true) mamba.direction = 2;
		else if(event.which == 40 && mamba.direction != 1 && mamba.fastTurn(3) == true) mamba.direction = 3;
		else if(event.which == 37 && mamba.direction != 2 && mamba.fastTurn(4) == true) mamba.direction = 4;
		else if(event.which == 13 && mamba.mode == 1) mamba.restart();
	});

}

if(screen.width <= 1000) { /* If the device is a mobile device. */
	
	/* Event-Listeners for 'touch sliding' to change the snake's direction. */
	/* This is only if the device is a mobile device. */

	/* We calculate the direction by the following process. */
	/* We get the coordinates when the finger touches the screen and when it leaves it. */
	/* Depending on the value, we change the direction. More below. */

	var xStart = 0;
	var yStart = 0;
	var xEnd = 0;
	var yEnd = 0;

	/* We get the coordinates when the user starts to touch the screen. */
	document.addEventListener("touchstart", function() {
		xStart = event.touches[0].clientX;
		yStart = event.touches[0].clientY;
	});

	/* The coordinates are updated continously while the user is touching the screen. */
	document.addEventListener("touchmove", function() {
		xEnd = event.touches[0].clientX;
		yEnd = event.touches[0].clientY;
	});

	/* We get the coordinates when the user lifts the finger from the screen. */
	document.addEventListener("touchend", function() {
		var xDiff = xEnd - xStart; // We get the x-difference.
		var yDiff = yEnd - yStart; // We get the y-difference.

		var xReverse = 0;
		var yReverse = 0;

		if(xDiff < 0) { // If x-difference < 0, then we flag the x-reverse variable.
			xDiff *= -1;
			xReverse = 1;
		}
		if(yDiff < 0) { //If the y-difference < 0, then we flag the y-reverse variable.
			yDiff *= -1;
			yReverse = 1;
		}

		/* If x-difference is more than y-difference, then snake's going left/right. */
		/* If y-difference is more than x-difference, then snake's going up/down. */
		/* If x-diff is negative, then it is going left. Else, it is going right. */
		/* If y-diff is negative, then it going up. Else it is going down.  */


		if((xDiff >= yDiff) && xReverse == 0 && mamba.direction != 4) mamba.direction = 2; //Going right.
		else if((xDiff >= yDiff) && xReverse == 1 && mamba.direction != 2) mamba.direction = 4; //Going left.
		else if((xDiff < yDiff) && yReverse == 0 && mamba.direction != 1) mamba.direction = 3; //Going down.
		else if((xDiff < yDiff) && yReverse == 1 && mamba.direction != 3) mamba.direction = 1; //Going up.
	});

}

if(screen.width <= 1000) { /* If the device is a mobile device. */

	/* Event-Listeners for the snake-header when restarting the game. */
	/* This only executes if the mode is in game mode. */

	document.getElementById("snake-header").addEventListener("click", function() {
		if(mamba.mode == 1 && mamba.gameOver == 1) {
			mamba.restart();
			mamba.gameOver = 0;
		}
	});

}

/* We add event-listeners for the event icons so that the popup shows when they are clicked.  */
/* This is done by changing the mamba.collision variable to 1. The event-listener declared... */
/* before will detect this and show the popup. */
let eventIcons = document.getElementsByClassName("event-links");
let eventIconsFunc = function(pixel) {
	mamba.collision = 1;

	if(pixel == 133) window.location.href="#coding-events";
	else if(pixel == 500) window.location.href="#online-events";
	else if(pixel == 187) window.location.href="#snake-popup";
}

eventIcons[0].addEventListener("click", eventIconsFunc, 133);
eventIcons[1].addEventListener("click", eventIconsFunc, 187);
eventIcons[2].addEventListener("click", eventIconsFunc, 500);
