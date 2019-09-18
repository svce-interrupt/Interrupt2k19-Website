/***********/
/* FORM.JS */
/***********/

/* This file takes in all the values of the form and then submits it. */

var homeUrl = "/"; //The URL of the page which the user is then redirected to.

var event1 = 0;
var event2 = 0;
var event3 = 0;
var event4 = 0;
var event5 = 0;
var event6 = 0;
var event7 = 0;
var event8 = 0;
var event9 = 0;
var event10 = 0;

/* We now add event-listeners for all the event tags. */
document.getElementById("event1").addEventListener("click", function() {
	if(event1 == 0) {
		document.getElementById("event1").style.backgroundColor = "yellow";
		document.getElementById("event1").style.color = "purple";
		event1 = 1;
	}
	else {
		document.getElementById("event1").style.backgroundColor = "purple";
		document.getElementById("event1").style.color = "yellow";
		event1 = 0;
	}
});

document.getElementById("event2").addEventListener("click", function() {
	if(event2 == 0) {
		document.getElementById("event2").style.backgroundColor = "yellow";
		document.getElementById("event2").style.color = "purple";
		event2 = 1;
	}
	else {
		document.getElementById("event2").style.backgroundColor = "purple";
		document.getElementById("event2").style.color = "yellow";
		event2 = 0;
	}
});

document.getElementById("event3").addEventListener("click", function() {
	if(event3 == 0) {
		document.getElementById("event3").style.backgroundColor = "yellow";
		document.getElementById("event3").style.color = "purple";
		event3 = 1;
	}
	else {
		document.getElementById("event3").style.backgroundColor = "purple";
		document.getElementById("event3").style.color = "yellow";
		event3 = 0;
	}
});

document.getElementById("event4").addEventListener("click", function() {
	if(event4 == 0) {
		document.getElementById("event4").style.backgroundColor = "yellow";
		document.getElementById("event4").style.color = "purple";
		event4 = 1;
	}
	else {
		document.getElementById("event4").style.backgroundColor = "purple";
		document.getElementById("event4").style.color = "yellow";
		event4 = 0;
	}
});

document.getElementById("event5").addEventListener("click", function() {
	if(event5 == 0) {
		document.getElementById("event5").style.backgroundColor = "yellow";
		document.getElementById("event5").style.color = "purple";
		event5 = 1;
	}
	else {
		document.getElementById("event5").style.backgroundColor = "purple";
		document.getElementById("event5").style.color = "yellow";
		event5 = 0;
	}
});

document.getElementById("event6").addEventListener("click", function() {
	if(event6 == 0) {
		document.getElementById("event6").style.backgroundColor = "yellow";
		document.getElementById("event6").style.color = "purple";
		event6 = 1;
	}
	else {
		document.getElementById("event6").style.backgroundColor = "purple";
		document.getElementById("event6").style.color = "yellow";
		event6 = 0;
	}
});

document.getElementById("event7").addEventListener("click", function() {
	if(event7 == 0) {
		document.getElementById("event7").style.backgroundColor = "yellow";
		document.getElementById("event7").style.color = "purple";
		event7 = 1;
	}
	else {
		document.getElementById("event7").style.backgroundColor = "purple";
		document.getElementById("event7").style.color = "yellow";
		event7 = 0;
	}
});

document.getElementById("event8").addEventListener("click", function() {
	if(event8 == 0) {
		document.getElementById("event8").style.backgroundColor = "yellow";
		document.getElementById("event8").style.color = "purple";
		event8 = 1;
	}
	else {
		document.getElementById("event8").style.backgroundColor = "purple";
		document.getElementById("event8").style.color = "yellow";
		event8 = 0;
	}
});

document.getElementById("event9").addEventListener("click", function() {
	if(event9 == 0) {
		document.getElementById("event9").style.backgroundColor = "yellow";
		document.getElementById("event9").style.color = "purple";
		event9 = 1;
	}
	else {
		document.getElementById("event9").style.backgroundColor = "purple";
		document.getElementById("event9").style.color = "yellow";
		event9 = 0;
	}
});

document.getElementById("event10").addEventListener("click", function() {
	if(event10 == 0) {
		document.getElementById("event10").style.backgroundColor = "yellow";
		document.getElementById("event10").style.color = "purple";
		event10 = 1;
	}
	else {
		document.getElementById("event10").style.backgroundColor = "purple";
		document.getElementById("event10").style.color = "yellow";
		event10 = 0;
	}
});

/* We now add the event-listener for the form button. */
document.getElementById("add").addEventListener("click", function() {
	/* We construct a string based on the values of the events. */
	var str = "event1="+event1+"&event2="+event2+"&event3="+event3+"&event4="+event4+"&event5="+event5+"&event6="+event6+"&event7="+event7+"&event8="+event8+"&event9="+event9+"&event10="+event10;

	/* We then call the AJAX function. */
	updateEventsInDatabased(url,str);
});

/* The function which handles the AJAX POST request. It takes in the argument string and sends it over. */
function updateEventsInDatabase(argumentString) {

	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			window.location.href=homeURL;
		}
	};
	xhttp.open("POST", "/events/add?"+argumentString, true);
	xhttp.send();

}
