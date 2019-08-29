/*******************/
/* EVENTS-INDEX.JS */
/*******************/

/* This script concerns itself with the creation of the snake and its actions. */

/* We define the snake as an object with certain properties and functions. */
class Snake {

	constructor() {
		this.color = "blue";
		this.length = 5; /* 5 pixels */
		this.speed = 500; /* 1 pixel per 500ms */

		this.startingPoint = 401; /* 401th pixel */
		this.direction = 2; /* 1 -> top; 2 -> right; 3 -> down; 4 -> left */

		this.mode = 0; /* 0 -> Non-game; 1 -> Game */
	}

	/* This function updates the snake on screen every second.  */
	slither() {
		if(this.mode == 0) { /* If current mode is non-game. */
			this.startingPoint += 1;
			
			var iter;
			for(iter=0; iter<this.length; iter+=1) {
				var idGen = "pixel-"+(this.startingPoint+iter);
				//alert(idGen);
				//document.getElementById(idGen).style.backgroundColor = this.color;
				//alert("hello");
			}
		}
	}

}

let mamba = new Snake();
mamba.slither();
