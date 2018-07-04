import React, {Component} from 'react';
import {socketConnect} from 'socket.io-react';
import Radium, {StyleRoot} from 'radium';
import {fadeOutUp} from 'react-animations';


const styles = {
    fadeOutUp :{
        animation: 'x 6s',
        animationName: Radium.keyframes(fadeOutUp, 'fadeOutUp')
    }
}
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
    handleAnimateStart = (index) => {
        debugger;
        console.log(this.state.messages)
       this.state.messages.splice(index,1)
       console.log(this.state.messages)
       
    }

    renderGuesses = () => {
       let messagesArray = this.state.messages.map((message, index) => {
           //set timeout?
           //render directly from socket.on
            return (
                <StyleRoot>
            <div style={styles.fadeOutUp} key={Math.random(0,1000)} onAnimationStart={() => this.handleAnimateStart(index)} onAnimationEnd={(e) => e.target.classList.add('hide') } className='' onClick={this.props.role == 'draw' ? () => {this.props.socket.emit('winner', {username: message.username, guess: message.username})}: null}> {message.guess} </div>
            </StyleRoot>
                )
        })
        return messagesArray
    }
    render() {
        return (
            <div>{this.renderGuesses()}</div>

        )
    }
}
export default socketConnect(GuessList);