
feed = (function () {
  var socket;
  function StartHttpServer(callback1, callback2){
	var serverAddress='http://127.0.0.1:1337/files/posts.json';
	var method="POST";
	var xhr=new XMLHttpRequest();
	xhr.open(method, serverAddress);
	xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
	xhr.setRequestHeader("Content-type", "json");
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr.onreadystatechange = function() {
		alert(xhr.readyState+" "+xhr.status);
  		if (xhr.readyState == 4 && xhr.status == 200) {
  			//alert(xhr.responseText);
  			//addContent(xhr.responseText);
  			callback1(xhr.responseText);
  			StartSocketServer(callback2);
  		}
	}
	xhr.send();
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

function StartSocketServer(callback2){
	socket = io.connect('http://0.0.0.0:3000');

	socket.on('connect', function() {
		socket.emit('pong',{message:"hello from client"});
	});
	socket.on('ping', function(data){ 
            	if (data) callback2(data); 
            });
}





return {
		onConnect: function(callback1, callback2){ 
			//callback2(StartHttpServer()); 
			StartHttpServer(callback2, callback2); 
		},
        onChange: function(callback) {
        	if (socket) {
            socket.on('ping', function(data){ 
            	if (data) callback(data); 
            }); 
            }
        }
};

}());