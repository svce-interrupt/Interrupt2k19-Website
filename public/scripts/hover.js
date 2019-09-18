/*****************/
/* HOME-HOVER.JS */
/*****************/

document.getElementById("m1").style.visibility = "visible";

document.getElementById("a1").addEventListener("mouseover", function() {
	document.getElementById("m1").style.visibility = "visible";
	document.getElementById("m2").style.visibility = "hidden";
	document.getElementById("m3").style.visibility = "hidden";
});

document.getElementById("a2").addEventListener("mouseover", function() {
	document.getElementById("m2").style.visibility = "visible";
	document.getElementById("m1").style.visibility = "hidden";
	document.getElementById("m3").style.visibility = "hidden";
});

document.getElementById("a3").addEventListener("mouseover", function() {
	document.getElementById("m3").style.visibility = "visible";
	document.getElementById("m1").style.visibility = "hidden";
	document.getElementById("m2").style.visibility = "hidden";
});
