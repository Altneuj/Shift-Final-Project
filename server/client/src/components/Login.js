import React, {Component} from 'react';
import {submitUser} from '../actions'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: ''
        }
    }
    render = () =>{
        return (
            <div id='overlay'>
            <div className='container'>
            <div className='row text-center justify-content-center'>
            <div className='col'>
                <h2> Please Sign in to Continue </h2>
                <input className='text-center' onChange={(e) => this.setState({username: e.target.value})} value={this.state.username} type="text"/>
                <button onClick={() => {this.props.submitUser(this.state)}} className='btn btn-primary'>Submit</button>
                </div>
                </div>
                </div>
            </div>
        )
    }
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({submitUser}, dispatch)
}
export default connect(null, mapDispatchToProps)(Login);