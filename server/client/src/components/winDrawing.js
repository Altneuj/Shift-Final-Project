import React, { Component } from 'react';
import { socketConnect } from 'socket.io-react';
import { connect } from 'react-redux';

class winDrawing extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount = () => {
        this.props.socket.emit('stop-timer')
    }
    render() {
        console.log(this.props.winner, this.props.user)
        if (this.props.winner == this.props.user) {
            return (
                <div className='well winner justify-content-center'>
                    <h1 className='text-center'>  YOU won this round! </h1>
                    <img className='win-img' src='https://media.giphy.com/media/ehhuGD0nByYxO/giphy.gif' alt='win' />
                    <h2 className='text-center'> Double win! You also draw next! </h2>
                    <button className='btn btn-secondary next-game' onClick={() => {
                        this.props.socket.emit('clear-guesses')
                        this.props.socket.emit('clear-all');
                        this.props.socket.emit('new-game')
                    }
                    }>Next Game</button>
                </div>
            )
        }
        if (!this.props.winner && !this.props.winningGuess) {
            return (
                <div className='well winner justify-content-center'>
                    <h1 className='text-center'> Times up! No winner this round! </h1>
                    <img className='win-img' src='https://media.giphy.com/media/ZO91JK6HBDeCMQXkK4/giphy.gif' alt='win' />
                    <h2 className='text-center'> You are drawing next </h2>
                    <button className='btn btn-secondary next-game' onClick={() => {
                        this.props.socket.emit('new-game');
                        this.props.socket.emit('clear-all');
                        this.props.socket.emit('clear-guesses');
                    }}>Next Game</button>
                </div>
            )
        } else {
            return (
                <div className='well winner justify-content-center'>
                    <h1 className='text-center'>  {this.props.winner} won this round! They guessed "{this.props.winningGuess}" </h1>
                    <img className='win-img' src='https://media.giphy.com/media/3owyoXMzSPGjbsQ5uE/giphy.gif' alt='draw' />
                    <h2 className='text-center'> You are drawing next </h2>
                    <button className='btn btn-secondary next-game' onClick={() => {
                        this.props.socket.emit('clear-guesses')
                        this.props.socket.emit('clear-all');
                        this.props.socket.emit('new-game')
                    }
                    }>Next Game</button>
                </div>
            )
        }
    }
}
const mapStateToProps = ({ noun }) => {
    return { noun }
}
export default socketConnect(connect(mapStateToProps)(winDrawing))