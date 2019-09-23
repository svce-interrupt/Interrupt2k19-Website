
var score = 100;
document.getElementById("score").innerHTML = "Score: " + score;
function shuffle(array) {
	var currentIndex = array.length, temporaryValue, randomIndex;
	while (0 !== currentIndex) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
}

var object = null;
$.get("/coderoll/data", (res, status) => {
	object = JSON.parse(res);
	var data = object[0];
	data.tokens = shuffle(data.tokens);
	var count = 0;
	var question = data.question;
	var inpdesc = data.inputDesc;
	var outdesc = data.outputDesc;
	var sinput = data.sampleInput;
	var soutput = data.sampleOutput;
	var answer = data.answer.split('\n');
	console.log(answer);
	var info = `QUESTION:\n\n${question}\n\nINPUT DESCRIPTION:\n\n${inpdesc}\n\nOUTPUT DESCRIPTION:\n\n${outdesc}\n\nSAMPLE INPUT:\n\n${sinput}\n\nSAMPLE OUTPUT:\n\n${soutput}\n`;
	document.getElementById("question").value = info;
	function addElement(l, h, tab) {
		for (var i = l; i < h; i++) {
			var td = $("<td></td>");
			var btn = null;
			if (data.tokens[count] == "{" || data.tokens[count] == "}")
				btn = $(`<pre>${data.tokens[count]}     </pre>`);
			else
				btn = $(`<pre>${data.tokens[count]}</pre>`);
			count += 1;
			count %= data.tokens.length;
			btn.attr("id", "td" + i);
			td.append(btn);
			$("#table" + tab).append(td);
		}
	}
	var clr = ["red", "blue", "green", "yellow", "orange", "pink", "violet"];
	var clrc = 0;
	addElement(0, 5, 1);
	addElement(5, 10, 2);
	addElement(10, 15, 3);
	$("pre").on("click", function (e) {
		console.log(e.target);
		$("#textarea").append(e.target.innerHTML + "\n");
		$("#" + e.target.id).remove();
	})
	setInterval(() => {
		for (var i = 1; i <= 3; i++)
			$("#table" + i).empty();
		addElement(0, 5, 1);
		addElement(5, 10, 2);
		addElement(10, 15, 3);
		$("marquee").css("backgroundColor", clr[clrc]);
		clrc += 1;
		clrc %= clr.length;
		$("pre").on("click", function (e) {
			$("#textarea").append(e.target.innerHTML + "\n");
			$("#" + e.target.id).remove();
		})

	}, 30000);
	$("#resetbtn").on('click', (e) => {
		alert("You lost 50 points");
		if (score > 0) {
			score -= 50;
			if (score < 0)
				score = 0;
			document.getElementById("score").innerHTML = "Score: " + score;
		}
		else {
			window.location.href = "/static/window/final_page/index.html";
		}
	});

	$("#submitbtn").on('click', (e) => {
		var _answer = document.getElementById("textarea").value;
		var _answer = _answer.trim().split('\n');
		for (var i = 0; i < _answer.length; i++) {
			if (_answer[i] && answer[i]) {
				if (_answer[i].trim() != answer[i].trim()) {
					score -= 10;
					if (score < 0)
						score = 0;
					document.getElementById("score").innerHTML = "Score: " + score;
				}
			}
		}
		score -= Math.abs(answer.length - _answer.length) * 10;
		if (score < 0)
		{
			score = 0;
			window.location.href = "/static/window/final_page/index.html";
		}
		document.getElementById("score").innerHTML = "Score: " + score;
	});
});



