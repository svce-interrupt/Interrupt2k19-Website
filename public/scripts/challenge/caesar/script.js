var answer = null;
var score = -50;

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
    var confirmationMessage = 'It looks like you have been attempting something. '
                            + 'If you leave before saving, your score will be lost.';
    reloadP();
    (e || window.event).returnValue = confirmationMessage; //Gecko + IE
    return confirmationMessage; //Gecko + Webkit, Safari, Chrome etc.


});


$.get('/challenge/caesar/data',(res,status)=>{
    content = JSON.parse(res);
    var data = content[0].data;
    data = data.split(" ").reverse().join(" ");
    data = caesarCipher(data,content[0].key);
    
    var i = 0;
    
    var myInt = setInterval(()=>{
        $("#question").append(data[i]);
        i++;
        if(i == data.length)
        {
            clearInterval(myInt);
            clue();
        }
    },50);
});

function clue(){
    var j = 0;
    var myInt2 = setInterval(() => {
        $("#clue").append(content[0].clue[j]);
        j++;
        if(j == content[0].clue.length)
        {
            clearInterval(myInt2);
            console.log("clear");
        }
    },50);
}

function caesarCipher(str, key) {
    return (str.toUpperCase().replace(/[A-Z]/g, c => String.fromCharCode((c.charCodeAt(0)-65 + key ) % 26 + 65))).toLowerCase();
}

$("#submit").on('click',(e)=>{
    var ans = document.getElementById("console").value;
    
    if(ans == content[0].data) score = 100;
    else score = 0;

        var xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                window.location.href = '/challenge/maze'; 
                console.log('submitted');
            }
        };
        xhttp.open("POST", "/challenge/submit", true);
        xhttp.setRequestHeader("Content-Type", "application/json");        
        xhttp.send(JSON.stringify({
            score : score
        }));

});