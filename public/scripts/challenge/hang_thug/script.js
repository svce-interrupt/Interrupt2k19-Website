function submitOnReload(){
    
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log('well played');
        }
    };

    xhttp.open("POST", "/challenge/submit", true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify({
        score : 0,
        level : 2
    }));

    return true;
}


window.onload = function() {
    var reloading = sessionStorage.getItem("reloading");
    console.log(reloading);

    if (reloading === "true") {
        sessionStorage.setItem("reloading","false");
        submitOnReload();
    } 

    var confirmationMessage = 'It looks like you have been attempting something';
    return confirmationMessage;
}

window.addEventListener("beforeunload", function () {
    sessionStorage.setItem("reloading", "true");
});

var data = null;
var count = 0;
var answer = "";
var clue = "";
var lives = 1;
var score = 100;
$.get("/challenge/hang_thug/data",(res,status)=>{
    data = JSON.parse(res);
    initialize(count);
});

var keyboard = ["ABCDEFG","HIJKLMN","OPQRSTU","VWXYZ. "];

keyboard.forEach((row)=>{
    var tr = $("<tr></tr>");
    row.split("").forEach((col)=>{
        var td = $(`<td class="open">${col}</td>`);
        tr.append(td);
    });
    $("#keyboard").append(tr);
});

$("#hangman").attr("src",`/resources/images/challenge/hang_thug/${lives}.png`);



function fillBox(answer)
{
    $("#answer").empty();
    var tr = $("<tr></tr>");
    for(var i=0;i<answer.length;i++)
        tr.append(`<td class="fillbox"><span class="hidden">${answer[i]}</span></td>`);
    $("#answer").append(tr);
}

$("td").on('click',(e)=>{
    var flag = 0;
    if(e.target.className === "open")
    {
        var char = e.target.innerHTML.toLowerCase();
        if(answer.includes(char))
        {
            var ans = ($("#answer tr td span"));
            for(var i=0;i<ans.length;i++)
            {
                if((ans[i].innerHTML).includes(char))
                {
                    ans[i].classList.remove("hidden");
                }
            }
            if(checkComplete())
            {
                count++;
                initialize(count);
                clearKey();
                flag = 1;
            }
        }
        else
        {
            if(lives<10)
            {
                lives++;
                score -= 10
                $("#hangman").attr("src",`/resources/images/challenge/hang_thug/${lives}.png`);
                if(lives == 10)
                {
                    alert("You lose..!");
                    submitAjax(score);
                }
            }
        }
        if(flag == 0)
            e.target.className = "closed";
    }
});

submitAjax = function(score){
    
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log('well played');
            window.location.href = '/challenge/connect_4';
        }
    };
``
    xhttp.open("POST", "/challenge/submit", true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify({
        score : score,
        level : 2
    }));

    return true;
}

function initialize(count)
{
    if(count<data.length-1)
    {
        clue = data[count].clue;
        answer = data[count+1].answer;
        document.getElementById("clue").innerHTML = "Clue: "+clue;
        fillBox(answer);
    }
    else
    {
        // $.get("http://localhost:80/connect_4",(res,status)=>{
        //     $("html").html(res);
        // });
        submitAjax(score);
    }
}
function checkComplete()
{
    var ans = $("#answer tr td span");
    for(var i=0;i<ans.length;i++)
    {
        if(ans[i].classList.value)
            return false;
    }
    return true;
}

function clearKey()
{
    var key = $("#keyboard tr td");
    for(var i=0;i<key.length;i++)
    {
        key[i].classList.value = "open";
    }
}

setInterval(()=>{
    document.getElementById("score").innerHTML = `Score: ${score}`;
},1000);


