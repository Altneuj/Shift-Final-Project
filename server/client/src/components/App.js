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
    if(this.props.draw) {
      this.props.fetchNoun();
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
      } else {
        let canva = document.getElementById('canvas')
        canva.classList.remove('guessing')
      }
    }
  }
  render() {
    if (this.state.user == null) {
      return (<Login />)
    }
    if (this.state.winner == true && this.state.draw == true) {
      return (
        <div className='jumbotron justify-content-center'>
          <h1 className='text-center'> Winner Found! Player: {this.winner}, Guess: {this.winningGuess} </h1>
          <h2 className='text-center'> You Are Drawing Next </h2> 
          <button className='justify-content-center btn btn-primary' onClick={() => { this.props.socket.emit('new-game') }}>Next Game</button>
        </div>
      )
    }
    if (this.state.winner == true) {
      return (
        <div className='jumbotron'>
      <h1 className='overlay text-center jumbotron'> Winner Found Player: {this.winner}, Guess: {this.winningGuess} </h1>
      <h2 className='text-center'> You Are Guessing Next Round, Wait for Drawer to Start </h2>
      </div>
      )
    } else {
      return (
        <div className='container-fluid'>
          <div className='row'>
            <Canvas />
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
