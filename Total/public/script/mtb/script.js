
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

var puzzle = [[5,10,14,7],[0,13,3,2],[9,1,4,6],[8,11,12,-1]];
var answer = [[0,1,2,3],[4,5,6,7],[8,9,10,11],[12,13,14,-1]];
var time = 0;

setInterval(() => {
    time += 1;
    document.getElementById("time").innerHTML = `Time taken: ${time}`;
    if(time == 400)
    {
        alert("You exceeded the time limit");
        window.location.href = "/static/window/coderoll/index.html"
    }
}, 1000);

var question = [`Being`,`The richest man`,`In the cemetery`,`Doesn't matter to me.`,`Going to`,`The bed at night saying`,`We've done`,`Something`,`Wonderful,`,`That's what`,`Matters`,`To me.`,`---`,`<img src="/static/images/mtb/1.jpg"/>`,`<img src="/static/images/mtb/2.jpg"/>`];

var empty = [3,3];
function create()
{
    $("#pp").empty();
    puzzle.forEach((val)=>{
        var tr = $("<tr></tr>");
        val.forEach((e)=>{
            var randomColor = getRandomColor();
            if(e>=0)
            {
                var td = $(`<td style="background-color:${randomColor};">${question[e]}</td>`);
                tr.append(td);
            }
            else
            {
                var td = $(`<td style="background-color:white;"></td>`);
                tr.append(td);
            }
        });
        $("#pp").append(tr);
    });
}
create();
$(document).on('keydown',(e)=>{
    switch(e.key)
    {
        case 'ArrowUp':{
            var ex = empty[0];
            var ey = empty[1];
            if(ex+1 < 4)
            {
                var val = puzzle[ex+1][ey];
                puzzle[ex][ey] = val;
                puzzle[ex+1][ey] = -1;
                create();
                empty[0] = ex+1;
                check();
            }
            break;
        }
        case 'ArrowDown':{
            var ex = empty[0];
            var ey = empty[1];
            if(ex-1 >= 0)
            {
                var val = puzzle[ex-1][ey];
                puzzle[ex][ey] = val;
                puzzle[ex-1][ey] = -1;
                create();
                empty[0] = ex-1;
                check();
            }
            break;
        }
        case 'ArrowRight':{
            var ex = empty[0];
            var ey = empty[1];
            if(ey-1 >= 0)
            {
                var val = puzzle[ex][ey-1];
                puzzle[ex][ey] = val;
                puzzle[ex][ey-1] = -1;
                create();
                empty[1] = ey-1;
                check();
            }
            break;
        }
        case 'ArrowLeft':{
            var ex = empty[0];
            var ey = empty[1];
            if(ey+1 < 4)
            {
                var val = puzzle[ex][ey+1];
                puzzle[ex][ey] = val;
                puzzle[ex][ey+1] = -1;
                create();
                empty[1] = ey+1;
                check();
            }
            break;
        }
    }
});

function check()
{
    if(puzzle.toString() === answer.toString())
        window.location.href = "/static/window/coderoll/index.html"
}
