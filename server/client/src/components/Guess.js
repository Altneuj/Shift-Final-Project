import React, { Component } from 'react';
import { socketConnect } from 'socket.io-react'
import { connect } from 'react-redux';
import { fetchNoun } from '../actions'
import { bindActionCreators } from 'redux';


class Guess extends Component {
    constructor(props) {
        super(props)

        this.state = {
            guess: ''
        }
    }
    componentWillMount = async () => {
        if (this.props.draw) {
            await this.props.fetchNoun();
        }
    }

    handleGuess = () => {
        //emits the guess to the server which emits to other clients to render on guessList
        if (this.state.guess !== '') {
            this.props.socket.emit('new-guess', { guess: this.state.guess, username: this.props.user })
            this.setState({ guess: '' });
        }
    }
    handleEnter = (e) => {
        if (e.key == 'Enter') {
            this.handleGuess();
        }
    }

    handleRender = () => {
        if (!this.props.draw) {
            return (
                <div>
                    <h4> You are guessing! </h4>
                    <input onKeyPress={(e) => this.handleEnter(e)} className='offset-md-5' onChange={(e) => this.setState({ guess: e.target.value })} value={this.state.guess} type="text" />
                    <button type='button' onClick={() => this.handleGuess()} className='btn btn-primary'>Guess!</button>
                </div>
            )
        }
        if (this.props.draw) {
            return (
                <div>
                    <h4> You are drawing! </h4>
                    <h3> {this.props.noun} </h3>
                    <button type='button' onClick={() => {
                        this.props.socket.emit('clear-all');
                        this.props.fetchNoun();
                    }} className='btn btn-primary'>Press for Word</button>
                </div>
            )

        }
    }
    render = () => {
        return (this.handleRender())
    }
}

const mapStateToProps = ({ noun }) => {
    return { noun }
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ fetchNoun }, dispatch);
}
export default socketConnect(connect(mapStateToProps, mapDispatchToProps)(Guess))