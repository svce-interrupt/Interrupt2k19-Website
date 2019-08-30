/**********************/
/* EVENTS-FLICKER.JS  */
/**********************/

/* This script takes care of the flickering that happens in the event header. */

var flickerIterator=0;
var snakeHeader = document.getElementById("snake-header");

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
