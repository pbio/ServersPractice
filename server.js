//the websocket server
var server = require('http').createServer();
var io = require('socket.io')(server);
io.on('connection', function(socket){
  console.log('emit...');
  //emit on connect
  socket.emit('ping', { message: 'You have just landed on Mars' + Date.now() });
  //updates every 2 seconds
  setInterval(simulateUpdate, 2000);
  function simulateUpdate(){
  	var price=Math.random();
  	
  	if (price < .3) socket.emit('ping', { stock: 'GPRO', value: price });
  	else if (price >= .3 && price <.6) socket.emit('ping', { stock: 'TSLA', value: price });
  	else if (price >= .6) socket.emit('ping', { stock: 'AAPL', value: price });
  	else socket.emit('ping', { stock: 'no name', value: price });
  }
  //receive a pong
  socket.on('pong', function (data) {
    console.log(data.message);
  });
  
  
});
server.listen(3000);
console.log("Socket server on port 3000");




//The http server
var http=require('http');
var fs = require('fs');
var qs = require('querystring');
http.createServer(handleRequest).listen(1337);


function handleRequest(request, response){
    var thisPark="";
	fs.readFile(__dirname + request.url, function (err,data) {
      if (err) {
        response.writeHead(404);
        response.end(JSON.stringify(err));
        return;
      }
      console.log(data);
      allParks=JSON.parse(data);
    
      if (request.method == 'POST') {
            response.end(data);
      }
    });
}
console.log("Server running at http://127.0.0.1:1337/");

