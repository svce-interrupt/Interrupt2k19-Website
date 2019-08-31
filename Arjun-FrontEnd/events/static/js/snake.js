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
	
		this.snakeArray = [420,421,422,423,424,425,426];
		this.lastPixel = 420;
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
		if(this.mode == 0) { /* If current mode is non-game. */
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
		}
	}

}

let mamba = new Snake();
window.setInterval( function(){ mamba.slither(); }, mamba.speed);

/* We add an event-listener which detects directional arrows. */
document.addEventListener("keyup", function() {
	
	/* Depending upon the arrow button pressed, we change the snake's direction. */
	if(event.which == 38) mamba.direction = 1;
	else if(event.which == 39) mamba.direction = 2;
	else if(event.which == 40) mamba.direction = 3;
	else if(event.which == 37) mamba.direction = 4;
	else this.direction = mamba.direction;

});
