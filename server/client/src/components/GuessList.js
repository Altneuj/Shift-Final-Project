import React, { Component } from 'react';
import { socketConnect } from 'socket.io-react';


class GuessList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            messages: []
        }
    }
    componentDidMount() {
        //adds incoming message to message list
        this.props.socket.on('incoming-guess', (data) => {
            this.setState({ messages: [...this.state.messages, data] })
        })
        this.props.socket.on('clear-guesses', () => {
            this.setState({ messages: [] })
        })
    }
    componentDidUpdate() {
        this.scrollToBottom();
    }
    scrollToBottom() {
        //scrolls to bottom of guess list when the overflow scroll is present
        this.el.scrollIntoView({ behavior: 'smooth' });
    }
    renderGuesses = () => {
        let messagesArray = this.state.messages.map((message, index) => {
            //onClick will choose the winner which will send to server to emit the winner and assign new roles to all clients

            return (

                <h2 onClick={this.props.draw ? () => { this.props.socket.emit('winner', { username: message.username, guess: message.guess }) } : null}><span className='label label-default'> {message.guess}</span> </h2>

            )
        })
        return messagesArray
    }
    render() {
        return (
            <div className='col-3 guess-list'>
                <div>{this.renderGuesses()}</div>
                <div ref={el => { this.el = el; }} />
            </div>

        )
    }
}
export default socketConnect(GuessList);