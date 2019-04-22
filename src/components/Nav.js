import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setAuthedUser } from '../actions/authedUser';

class Nav extends Component {
    logOut = (event) => {
        event.preventDefault();
        console.log('See you!');
        this.props.dispatch(setAuthedUser(null));
    };

    render() {
        return (
            <ul>
                <li>Home</li>
                <li>Leaderboard</li>
                <li onClick={(event) => this.logOut(event)}>Log-out</li>
            </ul>
        );
    }
}

export default connect()(Nav);
