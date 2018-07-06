import React, { Component } from 'react';
import '../App.css';
import Login from './Login'
import Canvas from './canvas'
import Guess from './Guess';
import GuessList from './GuessList';
import { connect } from 'react-redux';
import {fetchNoun} from '../actions';
import { socketConnect } from 'socket.io-react';
import { bindActionCreators } from 'redux';

class App extends Component {
  constructor() {
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
    if (this.state.user) {
      if (!this.state.draw) {
        let canva = document.getElementById('canvas')
        canva.className += ' guessing'
      } else {
        let canva = document.getElementById('canvas')
        canva.classList.remove('guessing')
      }
    }

    this.props.socket.on('winner-found', (data) => {
      console.log(data)
      this.winner = data.username
      this.winningGuess = data.guess
      this.setState({ winner: true })
    })
    this.props.socket.on('your-role', (data) => {
      this.setState({ draw: data })
    })

    this.props.socket.on('user-received', (data) => {
      this.setState({ user: data.username });
    })
    this.props.socket.on('start-new-game', (data) => {
      this.setState({ winner: data })
    })
  }

  componentDidUpdate = () => {
    if (this.state.user && this.state.winner == false) {
      if (!this.state.draw) {
        let canva = document.getElementById('canvas')
        canva.className += ' guessing'
        let clearButton = document.getElementById('clear-button');
        clearButton.className += ' guessing'
      } else {
        let canva = document.getElementById('canvas');
        canva.classList.remove('guessing');
        let clearButton = document.getElementById('clear-button');
        clearButton.classList.remove('guessing')
      }
    }
  }
  render() {
    debugger;
    if (this.state.user == null) {
      return (<Login />)
    }
    if (this.state.winner == true && this.state.draw == true) {
      if(!this.winner && !this.winningGuess){
        return (
          <div className='jumbotron justify-content-center'>
          <h1 className='text-center'> Times up! No winner this round! </h1>
          <h2 className='text-center'> You are drawing next </h2> 
          <button className='btn btn-primary next-game' onClick={() => { this.props.socket.emit('new-game') }}>Next Game</button>
        </div>
        )
      } else {
      return (
        <div className='jumbotron justify-content-center'>
          <h1 className='text-center'>  {this.winner} won this round! They guessed "{this.winningGuess}" </h1>
          <h2 className='text-center'> You are drawing next </h2> 
          <button className='btn btn-primary next-game' onClick={() => { this.props.socket.emit('new-game') }}>Next Game</button>
        </div>
      )}
    }
    if (this.state.winner == true) {
      if(!this.winningGuess && !this.winner){
        return(
        <div className='jumbotron'>
        <h1 className='overlay text-center jumbotron'> Time ran out! Try harder next round! </h1>
        <h2 className='text-center'> You are guessing next round, wait for drawer to start the game </h2>
        </div>)
      } else {
      return (
        <div className='jumbotron'>
      <h1 className='overlay text-center jumbotron'>{this.winner} won this round! They guessed "{this.winningGuess}" </h1>
      <h2 className='text-center'> You are guessing next round, wait for drawer to start the game </h2>
      </div>
      )}
    } else {
      return (
        <div className='container-fluid'>
          <div className='row'>
            <Canvas draw={this.state.draw} />
            <div className='col-xs-6'>
              <h2> Welcome {this.state.user} </h2>
              <Guess user={this.state.user} draw={this.state.draw} />
              <div className='guess-list'>
                <GuessList draw={this.state.draw} />
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({fetchNoun}, dispatch)
}
export default socketConnect(connect(null, mapDispatchToProps)(App));
