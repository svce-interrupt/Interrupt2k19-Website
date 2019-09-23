var N = 15;

function createCanvas()
{
    for(var i=0;i<N;i++)
    {
        var tr = $("<tr></tr>")
        for(var j=0;j<N;j++)
        {
            var td = $(`<td id="${i*N + j}" class="empty"></td>`)
            tr.append(td);
        }
        $("#grid").append(tr);
    }
}

createCanvas();
function Block()
{
    var pattern = [[0,-1,1,N],[0,-1,1,-N],[0,-1,N,-N],[0,1,N,-N],[0,-1,-N,-2*N],[0,-N,1,2],[0,1,N,2*N],[0,-1,-2,N],[0,1,-N,-N+1],[0,-N,N,2*N],[0,-1,1,2],[0,1,-N,-2*N],[0,1,2,N],[0,-1,N,2*N],[0,-1,-2,-N],[0,1,-N,-N-1],[0,1,-N+1,N],[0,-1,-N,-N+1],[0,1,N+1,-N]];
    var ind = Math.round(Math.random()*(pattern.length-1));
    var cur_pat = pattern[ind];
    return cur_pat;
}  
function createBlock(id,cur_pat)
{
    var result = [];
    cur_pat.forEach((e)=>{
        result.push(id+e);
    });
    return result;
}
var block = Block();
var score = 0;
var time = 1rs0;

setInterval(()=>{
    document.getElementById("score").innerHTML = "Score: "+score;
    time -= 1;
    document.getElementById("time").innerHTML = `Time: ${time}`;

    if(time === 0){
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                window.location.href('/challenge/caesar')
            }
        };
        xhttp.open("POST", "/challenge/submit", true);
        xhttp.setRequestHeader("Content-Type", "application/json");        
        xhttp.send(JSON.stringify({
            score : score
        }));
    }

},1000);
$( "td" ).hover(
    function() {
      var id = parseInt(this.id);
      addHover(createBlock(id,block));

    }, function() {
      var id = parseInt(this.id);
      //const block = Block(id);
      removeHover(createBlock(id,block));
    }
  );
  
$("td").on('click',(e)=>{
    var id = parseInt(e.target.id);
    var res = createBlock(id,block);
    if(checkEmpty(res))
    {
        res.forEach((e)=>{
            $("#"+e).addClass("filled");
            $("#"+e).removeClass("empty");
            score += 0.5;
        });
        block = Block();
    }
});

function checkEmpty(arr)
{
    var flag = 0;
    arr.forEach((e)=>{
        var res =  $("#"+e).attr('class').includes('filled');
        if(res == true)
        {
            flag = 1;
        }
    });
    if(flag == 0)
        return true;
    else
        return false;
}

function addHover(arr)
{
    arr.forEach((val)=>{
        $("#"+val).addClass("hover");
    });
}
function removeHover(arr)
{
    arr.forEach((val)=>{
        $("#"+val).removeClass("hover");
    });
}

