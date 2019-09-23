var answer = null;
var score = -50;

$.get('/caesar/data',(res,status)=>{
    answer = JSON.parse(res);
    var data = answer[0].data;
    data = data.split(" ").reverse().join(" ");
    data = caesarCipher(data,answer[0].key);
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

function clue()
{
    var j = 0;
    var myInt2 = setInterval(() => {
        $("#clue").append(answer[0].clue[j]);
        j++;
        if(j == answer[0].clue.length)
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
    if(ans == answer[0].data)
    {
        score = 100;
        window.location.href = "/static/window/maze/index.html";
    }
});