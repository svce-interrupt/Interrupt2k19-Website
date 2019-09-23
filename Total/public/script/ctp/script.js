
alert("1)You have 3 lives to find a person from given images\n2)If wrong images combined you loose your life\n3)Combine until you find the person\n4)ENJOY..!");

$.get('/ctp/data',(data,status)=>{
        var obj = JSON.parse(data);
        for(var i=0;i<obj.length;i++)
        {
            var img = $("<img>");
            img.attr("src",obj[i].src);
            img.attr("id",obj[i].id);
            $("#box"+(i+4)).append(img);
        }
});

var result = null,answers = null,score = 100;
document.getElementById("score").innerHTML = `Score: ${score}`;
$.get('/ctp/result',(data,status)=>{
    result = JSON.parse(data);
});
$.get('/ctp/answers',(data,status)=>{
    answers = JSON.parse(data);
});
function push(ptr)
{
    var tmp = ptr.children[0];
    var box1 = $("#box1");
    var box2 = $("#box2");
    if(!$("#box1").children()[0])
        box1.append(tmp);
    else if(!$("#box2").children()[0])
        box2.append(tmp);
}
function pop(ptr)
{
    var tmp = ptr.children[0];
    for(var i=0;i<7;i++)
    {
        var inventory = $("#box"+(i+4));
        if(!inventory.children()[0])
        {
            inventory.append(tmp)
            break;
        }
    }
}
function merge(box1,box2,box3,i1,i2,i3)
{
    var id1 = box1.getAttribute("id");
    var id2 = box2.getAttribute("id");
    if((id1 == i1 && id2 == i2) || (id1 == i2 && id2 == i1))
    {
            var img = $("<img>");
            img.attr("src",result[i3].src);
            img.attr("id",result[i3].id);
            box3.append(img);
            $("#box1").empty();
            $("#box2").empty();
            return true;
    }
        else
            return false;
}
function combine()
{ 
    var flag = 0;
    var box1 = $("#box1").children()[0];
    var box2 = $("#box2").children()[0];
    var box3 = $("#box3");
    if(box1 && box2 )
    {
        var id1 = box1.getAttribute("id");
        var id2 = box2.getAttribute("id");
        for(var i=0;i<answers.length;i++)
        {
            if(merge(box1,box2,box3,answers[i].img1,answers[i].img2,answers[i].res))
            {
                flag = 1;
                break;
            }
        }
        if(flag==0)
        {
            alert("Can't able to combine..!");
            score -= 10;
            document.getElementById("score").innerHTML = `Score: ${score}`;
            if(score == 0)
                window.location.href = "/static/window/tetris/index.html";  
        }
    } 
    else
    {
        alert("Can't be combined");
        score -= 10;
        document.getElementById("score").innerHTML = `Score: ${score}`;
        if(score == 0)
            window.location.href = "/static/window/tetris/index.html";
    }  
}

function check()
{
    var box1 = $("#box1").children()[0];
    var box2 = $("#box2").children()[0];
    var box3 = $("#box3").children()[0];
    var count = 0;
    for(var i=0;i<7;i++)
    {
        var inventory = $("#box"+(i+4));
        if(inventory.children()[0])
        {
            count++;
        }
    }   
    if(count == 1 && !box1 && !box2 && !box3)
        return true;
    return false;
}

setInterval(()=>{
    if(check())
    {
        window.location.href = "/static/window/tetris/index.html";
    }
},1000);
$(".question").append("<p>The person is Billionaire and Engineer.Find the person?</p>");
