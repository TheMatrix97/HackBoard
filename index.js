var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(80);
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});
var line_history = [];

io.on('connection', function (socket) {
  line_history.forEach(function(coord){
    socket.emit('refresh',coord );
  });
    socket.on('update',function(data){
      line_history.push(data);
      socket.broadcast.emit('refresh',data);
    });
});
