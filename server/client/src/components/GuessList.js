import React, {Component} from 'react';
import {socketConnect} from 'socket.io-react';

class GuessList extends Component {
    constructor(props){
        super(props)

        this.state = {
            messages: []
        }
    }
    componentDidMount() {
        this.props.socket.on('incoming-guess', (data) =>{
            console.log(this.state.messages)
            this.setState({messages: [...this.state.messages, data]})
            console.log(this.state.messages) 
        })
    }

    renderGuesses = () => {
       let messagesArray = this.state.messages.map((message) => {
            return (
            <div className='over-canvas' onClick={this.props.role == 'draw' ? () => {this.props.socket.emit('winner', {username: message.username, guess: message.username})}: null}> {message.guess} </div>
                )
        })
        return messagesArray
    }
    render() {
        return (
            <div>{this.renderGuesses()}</div>)
    }
}
export default socketConnect(GuessList);