var clrs = ["red","green","blue","yellow","white","black","pink","orange","violet","red","green","blue","yellow","white","black","pink","orange","violet","red","green","blue","yellow","white","black","pink","orange","violet","red","green","blue","yellow","white","black","pink","orange","violet"];

var ind = 0;
var ind1 = 0;
var ind2 = 0;
var pre1 = ind1;
var pre2 = ind2;
var count = 5;
var mem = [];
var myInt = null;
var score = 0;

document.getElementById("score").innerHTML = `Score: ${score}`;

function initialize(count){
    
    if(count <= 15){
        mem = [];
        myInt = setInterval(main,3000);
    }else{
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                window.location.href = '/challenge/dark_house'; 
            }
        };
        xhttp.open("POST", "/challenge/submit", true);
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.send(JSON.stringify({
            score : score
        }));

    }
}

function input()
{
    $("#answer").empty();
    var tr = null;
    for(var i=0;i<count;i++)
    {
        if(i%2==0)
            tr = $("<tr></tr>");
        var td = $(`<td><input id="${i}" type="text" placeholder="enter color ${i+1} here"/></td>`);
        tr.append(td);
        $("#answer").append(tr);
    }
}
function main()
{
    if(ind < count)
        {
        ind1 = Math.floor(Math.random()*clrs.length-1);
        do{
            ind2 = Math.floor(Math.random()*clrs.length-1);
        }while(clrs[ind2] === clrs[ind1]);
        if(clrs[ind1] != clrs[ind2])
        {
            $("#cards").css("color",clrs[ind1]);
            mem.push(clrs[ind2]);
            document.getElementById("cards").innerHTML = clrs[ind2].toUpperCase();
            ind++;
            if(ind == count)
            {
                input();
                clearInterval(myInt);
            }
        }
    }
}
function check()
{
    var arr = $("#answer tr td input");
    var points = 0;
    for(var i=0;i<count;i++)
    {
        if(arr[i].value == mem[i])
            points++;
    }
    score += points*4;
    document.getElementById("score").innerHTML = `Score: ${score}`;
    count += 5;
    ind = 0;
    initialize(count);
}

initialize(count);

