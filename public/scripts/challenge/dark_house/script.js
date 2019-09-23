const width = 200,
height = 200;

const log = console.log.bind(console);

const containerEl = document.querySelector('.container'),
imgEl = containerEl.querySelector('.img');

function handleMove(event) {

  let eventToUse = event;

  if (event.type === 'touchstart' || event.type === 'touchmove') {
    eventToUse = event.changedTouches[0];
    event.preventDefault(); // prevent Y-scrolling when swiping up/down
  }

  let bcr = containerEl.getBoundingClientRect();
  let { clientX, clientY } = eventToUse;
  imgEl.style.left = `${clientX - bcr.left - width / 2}px`;
  imgEl.style.top = `${clientY - bcr.top - height / 2}px`;
}

containerEl.addEventListener('mousemove', handleMove);
containerEl.addEventListener("touchmove", handleMove, true);

var objects = null;
var queue = [];
var count = 0;
var score = 0;
var time = 10;
$.get('/challenge/dark_house/data',function(data,status){
    objects = JSON.parse(data);
    //console.log(objects);
    for(var i =0;i<objects[count].length;i++)
    {
        queue.push(objects[count][i].name);
    }
    setInterval(function(){
        $("#queue").empty();
        queue.forEach((val)=>{
            $("#queue").append("<tr><td>"+val+"</td></tr>");
        });
        document.getElementById("score").innerHTML = `Score: ${score}`;
        document.getElementById("timer").innerHTML = `Time: ${time}`;
        if(time >=0)
            time--;
        if(time == 0){
            alert("Time is up..!");
            var xhttp = new XMLHttpRequest();
            
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    console.log("Submitted");
                    window.location.href = '/challenge/ctp';
                }
            };
            xhttp.open("POST", "/challenge/submit", true);
            xhttp.setRequestHeader("Content-Type", "application/json");
            xhttp.send(JSON.stringify({
                score : score
            }));
        }
    },1000);
});

$(document).ready(function() {
    $('#canvas').click(function(e) {
        var offset = $(this).offset();
        var x = (e.pageX - offset.left);
        var y = (e.pageY - offset.top);
        //console.log('X: ' + x + ', Y: ' + y);
        objects[count].forEach((val)=>{
            if(x>val.x && x<val.mx && y>val.y && y< val.my)
            {
                var i = queue.indexOf(val.name);
                if(i>-1)
                {
                    queue.splice(i,1);
                    score += 5;
                }
                if(queue.length == 0)
                {
                    count++;
                    if(count<4)
                    {
                        $(".bg-image").css("backgroundImage",`url("/resources/images/challenge/dark_house/bg${count}.jpg")`);
                        for(var i =0;i<objects[count].length;i++)
                        {
                            queue.push(objects[count][i].name);
                        }
                    }else{
                        var xhttp = new XMLHttpRequest();
            
                        xhttp.onreadystatechange = function() {
                            if (this.readyState == 4 && this.status == 200) {
                                window.location.href = '/challenge/ctp';
                            }
                        };
                        xhttp.open("POST", "/challenge/submit", true);
                        xhttp.setRequestHeader("Content-Type", "application/json");
                        xhttp.send(JSON.stringify({
                            score : score
                        }));                    }
                }
            }
        });
    });
});

