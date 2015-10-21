//the websocket server
var server = require('http').createServer();
var io = require('socket.io')(server);
io.on('connection', function(socket){
  console.log('Successful connection to websocket at time t=' + Date.now());
  //emit on connect
  //socket.emit('ping', { message: 'Successful connection to websocket at time t=' + Date.now() });
  
  //updates every 2 seconds
  setInterval(simulateUpdate, 2000);
  function simulateUpdate(){
  	var price=Math.random();
  	if (price < .3) socket.emit('ping', JSON.stringify({stock: 'GPRO', value: Math.random() }));
  	if (price >= .3 && price <.6) socket.emit('ping', JSON.stringify({ stock: 'TSLA', value: Math.random() }));
  	if (price >= .6) socket.emit('ping', JSON.stringify({ stock: 'AAPL', value: Math.random() }));
  	if (price) socket.emit('ping', JSON.stringify({ stock: 'FORD', value: Math.random() }));
  	if (price) socket.emit('ping', JSON.stringify({ stock: 'MSFT', value: Math.random() }));
  	if (price>.4) socket.emit('ping', JSON.stringify({ stock: 'TWTR', value: Math.random() }));
  	if (price>.8) socket.emit('ping', JSON.stringify({ stock: 'GOOG', value: Math.random() }));
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
      	console.log("we have an error!!");
        response.writeHead(404);
        response.end(JSON.stringify(err));
        return;
      }
      
      allParks=JSON.parse(data);
      if (request.method == 'POST') {
            response.end(data);
      }
    });
}
console.log("Server running at http://127.0.0.1:1337/");

