import React, { Component } from 'react'

class UserContact extends Component {

    render() {
        return (
            <div className="user-contact">{this.props.title}</div>
        )
    }
}

export default UserContact