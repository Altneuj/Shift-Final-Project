import React, { Component } from 'react';
import { socketConnect } from 'socket.io-react';

class winGuessing extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        //TODO refactor, could be written more efficiently.        
        if (this.props.winner == this.props.user) {
            return (
                <div className='well winner justify-content-center'>
                    <h1 className='text-center'>  YOU won this round! </h1>
                    <img className='win-img' src='https://media.giphy.com/media/2LODlaJkHJVS0/giphy.gif' alt='win' />
                    <h2 className='text-center'> You are guessing again next round! </h2>
                </div>
            )
        }
        if (!this.props.winningGuess && !this.props.winner) {
            return (
                <div className='well winner justify-content-center'>
                    <h1 className='text-center '> Time ran out! Try harder next round! </h1>
                    <img className='win-img' src='https://media.giphy.com/media/3oz8xEgf0wV8UGL5y8/giphy.gif' alt='times-up' />
                    <h2 className='text-center'> You are guessing next round, wait for drawer to start the game </h2>
                </div>)
        } else {
            return (
                <div className='well winner justify-content-center'>
                    <h1 className='text-center '>{this.props.winner} won this round! They guessed "{this.props.winningGuess}" </h1>
                    <img className='aspect-fit' width={300} src='https://media.giphy.com/media/F2WFyAfpfVfFe/giphy.gif' alt='win' />
                    <h2 className='text-center'> You are guessing next round, wait for drawer to start the game </h2>
                </div>
            )
        }
    }
}

export default socketConnect(winGuessing);