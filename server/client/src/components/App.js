import React, { Component } from 'react';
import '../App.css';
import Login from './Login'
import Canvas from './canvas'
import Guess from './Guess';
import GuessList from './GuessList';
import {socketConnect} from 'socket.io-react';

class App extends Component {
  constructor(){
    super()

    this.state = {
      draw: false,
      winner: false,
      user: null
    }
    this.winner = null;
    this.winningGuess = null;
    this.socketId = null;
  }
  componentDidMount = () => {
    if(this.state.user){
      if(!this.state.draw){
        let canva = document.getElementById('canvas')
        canva.className += ' guessing'
      } else {
        let canva = document.getElementById('canvas')
        canva.classList.remove('guessing')
      }}
    this.props.socket.on('winner-found', (data) => {
      console.log(data)
      this.winner = data.username
      this.winningGuess = data.guess
      this.setState({winner: true})
    })
    this.props.socket.on('your-role', (data) => {
      console.log(data)
      this.setState({draw: data})
    })

    this.props.socket.on('user-received', (data) => {
      this.setState({user: data.username});
    })
    this.props.socket.on('start-new-game', (data) => {
      this.setState({winner: data})
    })
  }
  componentDidUpdate = () => {
    if(this.state.user && this.state.winner == false){
      if(!this.state.draw){
        let canva = document.getElementById('canvas')
        canva.className += ' guessing'
      } else {
        let canva = document.getElementById('canvas')
        canva.classList.remove('guessing')
      }}
  }
  render() {
    debugger;
    if(this.state.user == null) {
      return(<Login />)
    }
    if(this.state.winner == true && this.state.draw == true){
      return (
        <div>
        <h1 className='overlay text-center jumbotron'> TEST UR DRAWING {this.winner}, {this.winningGuess} </h1>
        <button onClick={() => {this.props.socket.emit('new-game')}}>Next Game</button>
        </div>
      )
    }
    if(this.state.winner == true){
      return (<h1 className='overlay text-center jumbotron'> WINNER FOUND {this.winner}, {this.winningGuess} </h1>)
      
    } else {
    return (
      <div className='container-fluid'>
      <div className='row'>
      <Canvas/>
      <div className='col-xs-6'>
      <h2> Welcome {this.state.user} </h2>
      <Guess user={this.state.user}/>
      <div className='guess-list'>
      <GuessList draw={this.state.draw}/>
      </div>
      <button onClick={() => this.setState({draw: true})}>test</button>
      </div>
      </div>
      </div>
    );}
  }
}

export default socketConnect(App);
