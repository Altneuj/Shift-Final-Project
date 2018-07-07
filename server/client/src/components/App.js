import React, { Component } from 'react';
import '../App.css';
import Login from './Login'
import Canvas from './canvas'
import Guess from './Guess';
import GuessList from './GuessList';
import { connect } from 'react-redux';
import {fetchNoun} from '../actions';
import WinGuessing from './winGuessing';
import { socketConnect } from 'socket.io-react';
import WinDrawing from './winDrawing';
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
  renderWinning = () => {
    if (this.state.winner && this.state.draw) {
      return(
      <WinDrawing user={this.state.user} winner={this.winner} winningGuess={this.winningGuess} />
      )
    }
    if (this.state.winner == true ) {
      return <WinGuessing user={this.state.user} winner={this.winner} winningGuess={this.winningGuess} />
    }
  }
  render() {
    if (this.state.user == null) {
      return (<Login />)
    } else {
      return (
        <div className='container-fluid'>
          <div className='row'>
            <Canvas draw={this.state.draw} />
            <div className='top-right'>
              <h2> Welcome {this.state.user} </h2>
              <Guess user={this.state.user} draw={this.state.draw} />
              <div className='guess-list'>
                <GuessList draw={this.state.draw} />
              </div>
            </div>
          </div>
          <div className='row text-center winning-screen justify-content-center anchor-bot col-xs-8'>
          {this.renderWinning()}
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
