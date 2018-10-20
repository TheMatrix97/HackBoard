var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
server.listen(80);
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/login.html');
});
app.use(express.static(__dirname + '/public'));
app.get('/create',function(req, res){
  var id = req.query.id;
  res.redirect("/index.html?id="+id);

});
app.get('/login', function(req, res){
  res.send("login");
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
    socket.on('clear',function(data){
      var aux = [];
      line_history.forEach(function(a){
        if(a.id != data) aux.push(a);
      });
      line_history = aux;
      socket.broadcast.emit('clear',data);
    });
});
function create_sala(req){
  var id = Math.floor((Math.random() * 999) + 1);
  if(salas.includes(id)) create_sala();
  else{

  }
}
