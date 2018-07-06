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
        setInterval(() => { this.props.fetchUsers() }, 3000)
    }
    componentWillUnmount = () => {
        clearInterval()
    }
    submitUser = (data) => {
        this.props.socket.emit('add-user', data)
    }
    usersOn = () => {
        if (this.props.users && this.props.users.length !== 0) {
            if (this.props.users.length == 1) {
                return (<h1> {this.props.users.length} User Online Now! </h1>)
            }
            else {
                return (<h1> {this.props.users.length} Users Online Now! </h1>)
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
                            <h2> Please Sign in to Continue </h2>
                            <input className='text-center' onChange={(e) => this.setState({ username: e.target.value })} value={this.state.username} type="text" />
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