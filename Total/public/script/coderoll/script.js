function shuffle(array) {
	var currentIndex = array.length, temporaryValue, randomIndex;
  
	// While there remain elements to shuffle...
	while (0 !== currentIndex) {
  
	  // Pick a remaining element...
	  randomIndex = Math.floor(Math.random() * currentIndex);
	  currentIndex -= 1;
  
	  // And swap it with the current element.
	  temporaryValue = array[currentIndex];
	  array[currentIndex] = array[randomIndex];
	  array[randomIndex] = temporaryValue;
	}
  
	return array;
}

var data = ["#include&ltiostream&gt","using namespace std;","int main()","{","int hello,hi,win;","cin&gt&gthello","if(hello&lt0)","{","exit(1);","}","for(int lose=0;win&lt=hello;lose++)","{","win = lose+win;","if(win==hello)","{     ","for(int random=1;random&lt=lose;random++)","{","sum *= random;","}","cout&lt&lt\"\\nfactorial: \"&lt&ltsum;","}     ","}","return 0;","}"
,"#include&ltstdio.h&gt","using namespaces std;","void main()","int hello,hi;win;","cin&lt&lthello","if(hello&lt==0)","exit('1');","for(int lose=0,win&lt=hello,lose++)","win =+ lose+win;","if(win=hello)","for(random=1;random&lt=lose;random++)","sum *= random","cout&gt&gt\"\\nfactorial: \"&gt&gtsum;","returns 0;",
"#include&ltiostream&gt","using namespace std;","int main()","{","int hello,hi,win;","cin&gt&gthello","if(hello&lt0)","{","exit(1);","}","for(int lose=0;win&lt=hello;lose++)","{","win = lose+win;","if(win==hello)","{     ","for(int random=1;random&lt=lose;random++)","{","sum *= random;","}","cout&lt&lt\"\\nfactorial: \"&lt&ltsum;","}     ","}","return 0;","}"
,"#include&ltstdio.h&gt","using namespaces std;","void main()","int hello,hi;win;","cin&lt&lthello","if(hello&lt==0)","exit('1');","for(int lose=0,win&lt=hello,lose++)","win =+ lose+win;","if(win=hello)","for(random=1;random&lt=lose;random++)","sum *= random","cout&gt&gt\"\\nfactorial: \"&gt&gtsum;","returns 0;"
];

data = shuffle(data);
var count = 0;

function addElement(l,h,tab)
{
	for(var i=l;i<h;i++)
	{
		var td = $("<td></td>");
		var btn = null;
		if(data[count] == "{" || data[count] == "}")
			btn = $(`<pre>${data[count]}     </pre>`);
		else
			btn = $(`<pre>${data[count]}</pre>`);
		count += 1 ;
		count %= data.length;
		btn.attr("id","td"+i);
		td.append(btn);
		$("#table"+tab).append(td);
	}
}
var clr = ["red","blue","green","yellow","orange","pink","violet"];
var clrc = 0;
addElement(0,5,1);
addElement(5,10,2);
addElement(10,15,3);
$("pre").on("click",function(e){
	console.log(e.target);
	$("#textarea").append(e.target.innerHTML+"\n");
	$("#"+e.target.id).remove();
})

setInterval(()=>{
	for(var i=1;i<=3;i++)
		$("#table"+i).empty();
	addElement(0,5,1);
	addElement(5,10,2);
	addElement(10,15,3);
	$("marquee").css("backgroundColor",clr[clrc]);
	clrc += 1;
	clrc %= clr.length;	
	$("pre").on("click",function(e){
		console.log(e.target);
		$("#textarea").append(e.target.innerHTML+"\n");
		$("#"+e.target.id).remove();
	})
},30000);




