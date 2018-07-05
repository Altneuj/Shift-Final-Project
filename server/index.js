
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 8000;
const bodyParser = require('body-parser');
const fs = require('fs');
let Users = []

let wordArray = fs.readFileSync('./server/assets/nounlist.txt', 'utf-8').split('\n');

// production
// app.use(express.static(__dirname + '/client/src'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

function onConnection(socket) {
  socket.on('add-user', (data) => {
    let newUser = { username: data.username, id: socket.client.id }
    Users.push(newUser)
    socket.emit('user-received', (newUser))
    if(Users.length == 1) {
      socket.emit('your-role', (true))
    }
  })
  socket.on('drawing', (data) => socket.broadcast.emit('drawing', data));
  socket.on('new-guess', (data) => io.emit('incoming-guess', data));
  socket.on('winner', (data) => {
    let upNext = Math.floor((Math.random() * (0 - Users.length) + Users.length))
    Users.forEach((user) => {
      io.to(user.id).emit('your-role', (user.id == Users[upNext].id))
    })
    io.emit('winner-found', data)
  });
  socket.on('disconnect', () => {
    let foundIndex = Users.findIndex((user) => {
      return user.id == socket.client.id
    })
    if (foundIndex !== -1) {
      Users.splice(foundIndex, 1)
    }
  })
  socket.on('new-game', () => io.emit('start-new-game', false))
}
app.get('/api/users', (request, response) => {
  response.send(Users)
})
app.get('/api/noun', (request, response) => {
  let randomIndex = Math.floor((Math.random() * (0 - wordArray.length) + wordArray.length));
  let randomNoun = wordArray[randomIndex];
  response.send(randomNoun)
})

io.on('connection', onConnection);

http.listen(port, () => console.log('listening on port ' + port));
