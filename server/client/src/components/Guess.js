import React, {Component} from 'react';
import {socketConnect} from 'socket.io-react'

class Guess extends Component {
    constructor(props){
        super(props)

        this.state = {
            guess: ''
        }
    }
    handleGuess = () => {
        this.props.socket.emit('new-guess', {guess: this.state.guess, username: this.props.user})
        this.setState({guess: ''});
    }
    render = () => {
        return ( 
            <div>
            <input className='offset-md-5' onChange={(e) => this.setState({guess: e.target.value})} value={this.state.guess} type="text"/>
            <button type='button' onClick ={() => this.handleGuess()} className='btn btn-primary'>Guess!</button>
            </div>
        )
    }
}
export default socketConnect(Guess)