var data = null;
var count = 0;
var answer = null;
var clue = null;
var lives = 1;
var score = 100;

var keyboard = ["ABCDEFG","HIJKLMN","OPQRSTU","VWXYZ. "];


function submitOnReload(){

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            window.location.href = '/challenge/'; 
        }
    };

    xhttp.open("POST", "/challenge/submit", true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify({
        score : 0
    }));

    return true;
}

window.onload = function() {
    var reloading = sessionStorage.getItem("reloading");

    if (reloading) {
        sessionStorage.removeItem("reloading");
        submitOnReload();
    }
}

function reloadP() {
    sessionStorage.setItem("reloading", "true");
}


window.addEventListener("beforeunload", function (e) {

    var confirmationMessage = 'It looks like you have been attempting something';
    reloadP();
    (e || window.event).returnValue = confirmationMessage; //Gecko + IE
    return confirmationMessage; //Gecko + Webkit, Safari, Chrome etc.


});



// window.onbeforeunload = submitOnReload;


// slight update to account for browsers not supporting e.which

history.pushState(null, null, document.URL);
window.addEventListener('popstate', function () {
    history.pushState(null, null, document.URL);
});

// $(window).on('beforeunload', function(e) { 
//     console.log("lololo");
// });

$.get('/challenge/hang_thug/data',(res, status)=>{
    data = JSON.parse(res);
    initialize(count);
});


keyboard.forEach((row)=>{
    var tr = $("<tr></tr>");
    row.split("").forEach((col)=>{
        var td = $(`<td class="open">${col}</td>`);
        tr.append(td);
    });
    $("#keyboard").append(tr);
});

$("#hangman").attr("src",`/resources/images/challenge/hang_thug/${lives}.png`);



function fillBox(content)
{
    $("#answer").empty();
    var tr = $("<tr></tr>");
    for(var i=0;i<answer.length;i++)
        tr.append(`<td class="fillbox"><span class="hidden">${content[i]}</span></td>`);
    $("#answer").append(tr);
}

$("td").on('click',(e)=>{
    var flag = 0;
    if(e.target.className === "open")
    {
        var char = e.target.innerHTML.toLowerCase();
        
        if(content.includes(char)){
            var ans = ($("#answer tr td span"));

            for(var i=0;i<ans.length;i++){
                if((ans[i].innerHTML).includes(char))
                {
                    ans[i].classList.remove("hidden");
                }
            }
            if(checkComplete()){
                count++;
                initialize(count);
                clearKey();
                flag = 1;
            }
        }else{

            if(lives<10){
                lives++;
                score -= 10
                $("#hangman").attr("src",`/resources/images/challenge/hang_thug/${lives}.png`);
                
                if(lives == 10){
                    submit(score);                
                    alert("Nice attempt!");
                }
            }
        }
        if(flag == 0)
            e.target.className = "closed";
    }
});

function initialize(count){
    if(count<data.length-1) {
        clue = data[count].clue;
        answer = data[count+1].answer;
        document.getElementById("clue").innerHTML = "Clue: "+clue;
        fillBox(answer);
    }
}

function submit(score){

    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            window.location.href = ''; 
        }
    };
    console.log(score);
    xhttp.open("POST", "/challenge/submit", true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify({
        score : score
    }));

    
}

function checkComplete()
{
    var content = $("#answer tr td span");
    for(var i=0;i<content.length;i++)
    {
        if(content[i].classList.value)
            return false;
    }
    return true;
}

function clearKey()
{
    var key = $("#keyboard tr td");
    
    for(var i=0;i<key.length;i++){
        key[i].classList.value = "open";
    }
}

setInterval(()=>{
    document.getElementById("score").innerHTML = `Score: ${score}`;
},1000);





























































