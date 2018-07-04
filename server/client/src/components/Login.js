import React, {Component} from 'react';
import {socketConnect} from 'socket.io-react';


class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: ''
        }
    }
    submitUser = (data) => {
        this.props.socket.emit('add-user', data)
    }
    render = () =>{
        return (
            <div id='overlay'>
            <div className='container'>
            <div className='row text-center justify-content-center'>
            <div className='col'>
                <h2> Please Sign in to Continue </h2>
                <input className='text-center' onChange={(e) => this.setState({username: e.target.value})} value={this.state.username} type="text"/>
                <button onClick={() => {this.submitUser(this.state)}} className='btn btn-primary'>Submit</button>
                </div>
                </div>
                </div>
            </div>
        )
    }
}

export default socketConnect(Login);