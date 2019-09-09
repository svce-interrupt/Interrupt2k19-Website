/**********************/
/* EVENTS-FLICKER.JS  */
/**********************/

/* This script takes care of the flickering that happens in the event header and in the hearts elements. */

/* We make the Interrupt Event-Header flicker with different colors. */
var flickerIterator=0;
var snakeHeader = document.getElementById("header");

function flicker() {
	if(flickerIterator == 0) snakeHeader.style.color = "white";
	else if(flickerIterator == 1) snakeHeader.style.color = "yellow";
	else if(flickerIterator == 2) snakeHeader.style.color = "red";
	else if(flickerIterator == 3) snakeHeader.style.color = "blue";
	else if(flickerIterator == 4) snakeHeader.style.color = "orange";
	else if(flickerIterator == 5) snakeHeader.style.color = "yellow";
	
	if(flickerIterator == 5) flickerIterator = -1;
	flickerIterator += 1;
}

window.setInterval( flicker, 1000 );

/* We make half of the heart in the game elements flicker. */
var heartIterator = 0;

function heartFlicker() {
	if(heartIterator == 0) {
		document.getElementsByClassName("reverse")[0].style.display = "none";
		heartIterator = 1;
	}
	else if(heartIterator == 1) {
		document.getElementsByClassName("reverse")[0].style.display = "inline-block";
		heartIterator = 0;
	}
}

window.setInterval( heartFlicker, 500 );
