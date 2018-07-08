
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 8000;
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
let Users = []
let wordCounter = 0;
let randomNoun;
let upNextIndex = 0;
let nowDrawing;
let wordArray = fs.readFileSync('./server/assets/nounlist.txt', 'utf-8').split('\n');

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
}

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
      nowDrawing = newUser;
      socket.emit('your-role', (true))
      socket.emit('start-timer', (true))
    }
  })
  socket.on('drawing', (data) => socket.broadcast.emit('drawing', data));
  socket.on('new-guess', (data) => io.emit('incoming-guess', data));
  socket.on('winner', (data) => {
    wordCounter = 0;
     upNextIndex = Math.floor((Math.random() * (0 - Users.length) + Users.length));
    let nowDrawing = Users[upNextIndex];
    Users.forEach((user) => {
      io.to(user.id).emit('your-role', (user.id == nowDrawing.id))
    })
    io.emit('winner-found', data)
  });
  socket.on('disconnect', () => {
    let foundUser =  Users.find((user) => {
      return socket.client.id == user.id
    })
    if(!foundUser){
      return 
    }
    let foundIndex = Users.findIndex((user) => {
      return user.id == socket.client.id
    })
    if (foundIndex !== -1) {
      Users.splice(foundIndex, 1)
    }
  })
  socket.on('new-game', () => {
    io.emit('start-new-game', (false));
    io.emit('start-timer', (true));
  });
  socket.on('canvas-cleared', () => {socket.broadcast.emit('clear-canvas')});
  socket.on('clear-guesses', () =>{io.emit('clear-guesses')})
  socket.on('stop-timer', () => {io.emit('stop-timer', (false))});
  socket.on('clear-all', () => {io.emit('clear-canvas')});
}
if (process.env.NODE_ENV === 'production') {
  // Express will serve up the index.html file
  // if it doesn't recognize the route

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.get('/api/users', (request, response) => {
  return response.send(Users)
})
app.get('/api/noun', (request, response) => {
  if(wordCounter >= 3) {
    return response.send(randomNoun);
  }
  let randomIndex = Math.floor((Math.random() * (0 - wordArray.length) + wordArray.length));
   randomNoun = wordArray[randomIndex];
   wordCounter ++;
  return response.send(randomNoun)
  
})

io.on('connection', onConnection);



http.listen(port, () => console.log('listening on port ' + port));
