/*******************/
/* EVENTS-SNAKE.JS */
/*******************/

/* This script concerns itself with the creation of the snake and its actions. */

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
		this.score = 0;
	
		this.snakeArray = [420,421,422,423,424,425,426]; /* The pixel array that is the snake. */
		this.lastPixel = 420;

		this.eventsPixels = [44,195,724,780]; /* The pixels containing the events. */
		this.foodPixel = 0; /* The pixel with the food when in game mode. */
		this.collision = 0; /* Has there been a collision with a food/event or not? */

		this.snake = this;
	}

	start() {

		var thisSnake = this;
		var startSlithering = function() {
			thisSnake.slither()
		}

		this.slithering = window.setInterval(startSlithering,this.speed);

	}

	/* This function updates the Snake array. */
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
					if((this.snakeArray[iter] - 40) < 0)
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
				/* End of the if block. */	
			}
			/* End of the for loop. */
		}
		/* End of the function. */	
	}

	/* This function updates the snake on screen every second.  */
	slither() {
		this.updateSnakeArray(); /* We update the snakeArray. */

		/* We change the colour of the snake's pixels. */
		var iter;
		for(iter=0; iter<this.length; iter+=1) {
			var idGen = "pixel-"+(this.snakeArray[iter]);

			if(iter % 2 == 0)
				document.getElementById(idGen).style.backgroundColor = this.color;
			else
				document.getElementById(idGen).style.backgroundColor = this.alternateColor;

			document.getElementById("pixel-"+this.lastPixel).style.backgroundColor = "black";
		}
	
		if(this.mode == 0) { /*  */
			/* If there is a collision, we flag a variable. */
			if(this.eventsPixels.includes(this.snakeArray[this.length-1])) this.collision = 1;
			/* We now check if the game controller*/
			if(this.snakeArray[this.length-1] == 386 && this.joystickAppear == 1) {

				/* We first remove all the 'events-related' elements. */
				this.removeEventsPixels();
				this.mode = 1;

				/* We then add all the 'games-related' elements. */
				document.getElementById("score").style.display = "block";
				//We also need to generate a pop-up box.

				/* We then generate a random food pixel. */
				this.food = Math.floor((Math.random() * 920) + 1);
				document.getElementById("pixel-"+this.food).style.backgroundColor = "green";
			}
		}
		else if(this.mode == 1) {
			/* If there is a collision with the food pixel... */
			if(this.food == this.snakeArray[this.length-1]) {
				/* We first remove the food pixel. */
				document.getElementById("pixel-"+this.food).style.backgroundColor = "black";

				/* We increment the score and then reflect it in the score field. */
				this.score += 1;
				document.getElementById("score").innerHTML = this.score;

				/* We also decrease speed each time score is a multiple of 7.*/
				if(this.score % 7 == 0) {
					clearInterval(this.slithering);
					this.speed -= 10;
					this.start();
				}

				/* We then elongate the snake. */
				this.length += 1;
				this.snakeArray.unshift(this.food-this.length-1);

				/* We then generate a random food pixel again. */
				this.food = Math.floor((Math.random() * 920) + 1);
				document.getElementById("pixel-"+this.food).style.backgroundColor = "green";
			}
		}
			
	}

	/* This function removes the events-pixels and empties the eventsPixelsArray. */
	removeEventsPixels() {
		var elements = document.getElementsByClassName('events');
		var iter=0;

		for(iter=0; iter<this.eventsPixels.length; iter++)
			document.getElementById("pixel-"+this.eventsPixels[iter]).innerHTML = "";

		document.getElementById("pixel-386").innerHTML = "";

		this.eventsPixels = [];
	}

}

let mamba = new Snake();
mamba.start();

/* This is the timeout function which displays the game controller on the screen.  */
let joystickAppear = window.setTimeout( function(){ 
	document.getElementById('pixel-386').innerHTML = "<img src='static/img/gamecontroller.png'>";
	mamba.joystickAppear = 1;
}, 10000);

/* This is the event-listener for the popup with the events info. */
let popupEvent = window.setInterval(function(){
	if(mamba.collision == 1) {
		document.getElementById('snake-popup').style.visibility = "visible";
		document.getElementById('closeButton').addEventListener("click", function(){
			document.getElementById('snake-popup').style.visibility = "hidden";
		});
		mamba.collision = 0;
	}
}, mamba.speed);

/* We add an event-listener which detects directional arrows. */
document.addEventListener("keyup", function() {
	
	/* Depending upon the arrow button pressed, we change the snake's direction. */
	if(event.which == 38) mamba.direction = 1;
	else if(event.which == 39) mamba.direction = 2;
	else if(event.which == 40) mamba.direction = 3;
	else if(event.which == 37) mamba.direction = 4;
	else this.direction = mamba.direction;

});
