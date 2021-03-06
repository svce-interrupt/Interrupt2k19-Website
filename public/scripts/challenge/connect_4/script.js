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
        level : 3
    }));

    return true;
}


window.onload = function() {
    var reloading = sessionStorage.getItem("reloading");
    console.log(reloading)

    if (reloading == "true") {
        sessionStorage.setItem("reloading","false");
        submitOnReload();
    }

    var confirmationMessage = 'It looks like you have been attempting something';
    return confirmationMessage;
}

window.addEventListener("beforeunload", function () {
    sessionStorage.setItem("reloading", "true");
});


function addImage(img1,img2,img3,img4){
    $("#img1").attr("src","/resources/images/challenge/connect_4/"+img1+".jpg");
    $("#img2").attr("src","/resources/images/challenge/connect_4/"+img2+".jpg");
    $("#img3").attr("src","/resources/images/challenge/connect_4/"+img3+".jpg");
    $("#img4").attr("src","/resources/images/challenge/connect_4/"+img4+".jpg");
}
var data = null;
var count = 0;
var score = 100;
document.getElementById("score").innerHTML = `Score: ${score}`;

$.get('/challenge/connect_4/data',(_data,status)=>{
    data = JSON.parse(_data);
    var img = data[count].imgs;
    addImage(img[0],img[1],img[2],img[3]);
});

$("#0").hide();
$("#1").hide();
$("#2").hide();
$("#3").hide();

function submitScore(score){

    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            window.location.href = "/challenge/ror";            
            console.log("Success");
        }
    };
    
    xhttp.open("POST", "/challenge/submit", true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify({
        score : score,
        level : 3
    }));

    
}

function submit(){
    
    if(count<3){
        var ans = document.getElementById("answer").value;
        
        if(data[count].answer.includes(ans)){
        
            document.getElementById("answer").value = "";
            var imgs = data[count].imgs;
            $("#"+count).show();
            $("#"+count).attr("src","/resources/images/challenge/connect_4/"+imgs[4]+".jpg");
            count++;
        
            if(count < 3){
                imgs = data[count].imgs;
                addImage(imgs[0],imgs[1],imgs[2],imgs[3]);
            }
        }else{
            alert("Wrong answer");
            score -= 10;
            document.getElementById("score").innerHTML = `Score: ${score}`;
        }
    }

    else{
        var ans = document.getElementById("answer").value;
        
        if(data[count].answer.includes(ans)){
            submitScore(score);
        }
    }
}
