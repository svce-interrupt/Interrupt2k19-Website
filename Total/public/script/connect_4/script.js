function addImage(img1,img2,img3,img4){
    $("#img1").attr("src","/static/images/connect_4/"+img1+".jpg");
    $("#img2").attr("src","/static/images/connect_4/"+img2+".jpg");
    $("#img3").attr("src","/static/images/connect_4/"+img3+".jpg");
    $("#img4").attr("src","/static/images/connect_4/"+img4+".jpg");
}
var data = null;
var count = 0;
var score = 100;
document.getElementById("score").innerHTML = `Score: ${score}`;
$.get('/connect_4/data',(_data,status)=>{
    data = JSON.parse(_data);
    var img = data[count].imgs;
    addImage(img[0],img[1],img[2],img[3]);
});
$("#0").hide();
$("#1").hide();
$("#2").hide();
$("#3").hide();

function submit()
{
    if(count<3)
    {
        var ans = document.getElementById("answer").value;
        if(data[count].answer.includes(ans))
        {
            document.getElementById("answer").value = "";
            var imgs = data[count].imgs;
            $("#"+count).show();
            $("#"+count).attr("src","/static/images/connect_4/"+imgs[4]+".jpg");
            count++;
            if(count < 3)
            {
                imgs = data[count].imgs;
                addImage(imgs[0],imgs[1],imgs[2],imgs[3]);
            }
        }
        else
        {
            alert("Wrong answer");
            score -= 10;
            document.getElementById("score").innerHTML = `Score: ${score}`;
            if(score == 0)
                window.location.href = "/static/window/ror/index.html";
        }
    }
    else
    {
        var ans = document.getElementById("answer").value;
        if(data[count].answer.includes(ans))
        {
            window.location.href = "/static/window/ror/index.html";
        }
    }
}