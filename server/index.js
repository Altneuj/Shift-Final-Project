
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 8000;
const bodyParser = require('body-parser');
let activeUsers = []
// production
// app.use(express.static(__dirname + '/client/src'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

function onConnection(socket){
  socket.on('drawing', (data) => socket.broadcast.emit('drawing', data));
  socket.on('new-guess', (data) => io.emit('incoming-guess', data));
  socket.on('winner', (data) => io.emit('winner-found', data));
}
app.post('/api/login', (request, response) => {
  let user = request.body.username;
    activeUsers.push(user);
    response.send(user)
})

io.on('connection', onConnection);

http.listen(port, () => console.log('listening on port ' + port));
