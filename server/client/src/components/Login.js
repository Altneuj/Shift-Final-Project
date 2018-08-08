import React, { Component } from 'react';
import { socketConnect } from 'socket.io-react';
import { bindActionCreators } from 'redux';
import { fetchUsers } from '../actions'
import { connect } from 'react-redux';


class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: ''
        }
    }
    componentDidMount = () => {
        //interval updates amount of users playing
        this.props.fetchUsers();
        setInterval(() => { this.props.fetchUsers() }, 3000)
    }
    componentWillUnmount = () => {
        clearInterval()
    }
    submitUser = (data) => {
        if (this.props.users && data.username != '') {
            let foundUser = this.props.users.find((user) => {
                return user.username.toLowerCase() == data.username.toLowerCase()
            })
            if (!foundUser) {
                this.props.socket.emit('add-user', data)
            } else {
                this.refs.error.classList.remove('hide');
            }
        }
    }
    handleEnter = (e) => {
        if (e.key == 'Enter') {
            this.submitUser(this.state);
        }
    }
    usersOn = () => {
        //current count of users online
        if (this.props.users && this.props.users.length !== 0) {
            if (this.props.users.length == 1) {
                return (<h1 className='white'> {this.props.users.length} User Online Now! </h1>)
            }
            else {
                return (<h1 className='white'> {this.props.users.length} Users Online Now! </h1>)
            }
        }
    }
    render = () => {
        return (
            <div id='overlay'>
                <div className='container'>
                    <div className='row text-center justify-content-center'>
                        <div className='col'>
                            {this.usersOn()}
                            <div className='jumbotron'>
                                <h2> Welcome to Draw-It! A live drawing game! </h2>
                            </div>
                            <div className='white'>
                                <h3> The rules are simple. </h3>
                                <h4> <strong><u> If you are the drawer</u></strong>, you can draw anything you want! If you need some inspiration hit the 'Press for Word' button. </h4>
                                <h4> Keep an eye on the guesses in the bottom right corner of the screen. </h4>
                                <h4> Click the guess that matches what you drew! </h4>
                                <h4> <strong><u>If you aren't drawing</u></strong>, try to guess what the drawing is.</h4>
                                <hr />
                                <h2> What's your name? </h2>
                            </div>
                            <input onKeyPress={(e) => this.handleEnter(e)} maxLength='8' className='text-center' onChange={(e) => this.setState({ username: e.target.value })} value={this.state.username} type="text" />
                            <p className='error-text hide' ref='error'> Username already in use! Please use another. </p>
                            <button onClick={() => { this.submitUser(this.state) }} className='btn btn-primary'>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = ({ users }) => {
    return { users }
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ fetchUsers }, dispatch)
}
export default socketConnect(connect(mapStateToProps, mapDispatchToProps)(Login));