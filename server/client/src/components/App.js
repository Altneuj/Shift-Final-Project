import React, { Component } from 'react';
import '../App.css';
import {connect} from 'react-redux';
import Login from './Login'
import Canvas from './canvas'
import Guess from './Guess';
import GuessList from './GuessList';
import {socketConnect} from 'socket.io-react';

class App extends Component {
  constructor(){
    super()

    this.state = {
      role: 'guesser',
      winner: false
    }
  }
  componentDidMount = () => {
    this.props.socket.on('winner-found', (data) => {
      console.log('hi')
      this.setState({winner: true})
    })
  }
  componentDidUpdate = () => {
    if(this.state.role !== 'draw'){
      let canva = document.getElementById('canvas')
      canva.className += ' guessing'
    } else {
      let canva = document.getElementById('canvas')
      canva.classList.remove('guessing')
    }
  }
  render() {
    if(this.props.user == null) {
      return(<Login />)
    }
    if(this.state.winner == true){
      return (<h1 className='overlay text-center jumbotron'> WINNER FOUND </h1>)
    } else {
    return (
      <div className="App">
      <div className='container-fluid'>
      <div className='row'>
      <div className='col-6'>
      <Canvas/>
      </div>
      <div className='col-6'>
      <h2> Welcome {this.props.user} </h2>
      <Guess user={this.props.user}/>
      <GuessList role={this.state.role}/>
      <button onClick={() => this.setState({role: 'draw'})}>test</button>
      </div>
      </div>
      </div>
      </div>
    );}
  }
}
const mapStateToProps = ({user}) => {
  return {user}
}
export default socketConnect(connect(mapStateToProps)(App));
