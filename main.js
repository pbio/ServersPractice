function StartWebSocketServer(){
var socket = io.connect('http://0.0.0.0:3000');

socket.on('connect', function() {
	socket.emit('pong',{message:"ciaooo"});

    socket.on('ping', function (data) {
    	if (document.getElementById(data.stock)){
    		document.getElementById(data.stock).innerText=data.stock+" "+data.value;
    	}
    	else if (data.stock){
    		var newP=document.createElement("p");
    		newP.setAttribute("id", data.stock);
    		var newText=document.createTextNode(data.stock+" "+data.value);
    		newP.appendChild(newText);
    		document.getElementById("main").appendChild(newP);
    	}
  	});
  });
}




function addContent(jsonText){
	console.log("helloworld");
	var object=JSON.parse(jsonText);
	for (var i=0; i<object.length; i++){
		var newP=document.createElement("p");
		newP.setAttribute("id", object[i].stock);
		var newText=document.createTextNode(object[i].stock+" "+object[i].value);
		newP.appendChild(newText);
    	document.getElementById("main").appendChild(newP);
	}		
}


function StartHttpServer(){
	var serverAddress='http://127.0.0.1:1337/files/posts.json';
	var method="POST";
	var xhr=new XMLHttpRequest();
	xhr.open(method, serverAddress);
	xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
	xhr.setRequestHeader("Content-type", "json");
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr.onreadystatechange = function() {
		//alert(xhr.readyState+" "+xhr.status);
  		if (xhr.readyState == 4 && xhr.status == 200) {
  			//alert(xhr.responseText);
  			addContent(xhr.responseText);
  		}
	}
	xhr.send();
	console.log(xhr);
}
StartHttpServer();
StartWebSocketServer();