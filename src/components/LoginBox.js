import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleInitialAfterLoggedInData } from '../actions/shared';

class LoginBox extends Component {
    state = {
        user: null
    };

    logIn = (event) => {
        event.preventDefault();
        this.props.dispatch(handleInitialAfterLoggedInData(this.state.user));
    };

    handleChange = (user) => {
        this.setState(() => ({
            user: user
        }));
    };

    render() {
        return (
            <form id='login'>
                <select value={this.state.value} onChange={(event) => this.handleChange(event.target.value)}>
                {this.props.users.map((user) => (
                    <option key={user.id} value={user.id}>{user.name}</option>
                ))}
                </select>
                <button onClick={(event) => this.logIn(event)}>Log-in</button>
            </form>
        );
    }
}

function mapStateToProps( { users } ) {
    return {
        users: Object.values(users)
    };
}

export default connect(mapStateToProps)(LoginBox);
