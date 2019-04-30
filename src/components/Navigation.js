import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom'

import Nav from 'react-bootstrap/Nav';

import { setAuthedUser } from '../actions/authedUser';

class Navigation extends Component {
    logOut = (event) => {
        event.preventDefault();
        console.log('See you!');
        this.props.dispatch(setAuthedUser(null));
    };

    render() {
        return (
            <Nav variant="pills">
                <Nav.Item>
                    <NavLink exact to="/" className='nav-link'>Home</NavLink>
                </Nav.Item>
                <Nav.Item>
                    <NavLink exact to="/leaderboard" className='nav-link'>Leaderboard</NavLink>
                </Nav.Item>
                <Nav.Item>
                    <NavLink exact to="/add" className='nav-link'>New Question</NavLink>
                </Nav.Item>
                <Nav.Item onClick={(event) => this.logOut(event)}>
                    <NavLink exact to="/" className='nav-link' activeClassName='inactive'>Logout ({this.props.authedUser})</NavLink>
                </Nav.Item>
            </Nav>
        );
    }
}

function mapStateToProps( { authedUser } ) {
    return {
        authedUser
    };
}

export default withRouter(connect(mapStateToProps)(Navigation));
