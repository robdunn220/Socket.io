const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
  io.emit('chat message', socket.id + ' connected.');
  console.log(socket.id);
  socket.on('disconnect', function() {
    io.emit('chat message', 'Peace, dawg.');
  });
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
  socket.on('say to someone', function(id, msg) {
    socket.broadcast.to(socket.id).emit('my message', msg);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
