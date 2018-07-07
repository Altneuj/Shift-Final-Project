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
        this.props.socket.on('incoming-guess', (data) => {
            this.setState({ messages: [...this.state.messages, data] })
        })
        this.props.socket.on('clear-guesses', () => {
            this.setState({messages: []})
        })
    }
    componentDidUpdate() {
        this.scrollToBottom();
    }
    scrollToBottom() {
        this.el.scrollIntoView({ behavior: 'smooth' });
    }
    renderGuesses = () => {
        let messagesArray = this.state.messages.map((message, index) => {
            //set timeout?
            //render directly from socket.on
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