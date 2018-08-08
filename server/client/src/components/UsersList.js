import React, { Component } from 'react';
import Collapsible from 'react-collapsible';
import { connect } from 'react-redux'

class UsersList extends Component {
    renderUsers = () => {
        let elementArray = this.props.users.map((user) => {
            return <p>{user.username}</p>
        })
        return elementArray
    }
    render() {
        //See active players usernames in main game screen
        return (
            <Collapsible trigger="See Who's Online">
                {this.renderUsers()}
            </Collapsible>
        )
    }
}

const mapStateToProps = ({ users }) => {
    return { users }
}
export default connect(mapStateToProps)(UsersList)