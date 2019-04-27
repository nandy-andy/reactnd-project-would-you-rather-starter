import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setAuthedUser } from '../actions/authedUser';
import { NavLink, withRouter } from 'react-router-dom'

class Nav extends Component {
    logOut = (event) => {
        console.log('See you!');
        this.props.dispatch(setAuthedUser(null));
    };

    render() {
        return (
            <ul>
                <li>
                    <NavLink to='/' exact activeClassName='active'>Home</NavLink>
                </li>
                <li>
                    <NavLink to='/leaderboard' activeClassName='active'>Leaderboard</NavLink>
                </li>
                <li>
                    <NavLink to='/new' activeClassName='active'>New Question</NavLink>
                </li>
                <li onClick={(event) => this.logOut(event)}>
                    <NavLink to='/' activeClassName='active'>Logout ({this.props.authedUser})</NavLink>
                </li>
            </ul>
        );
    }
}

function mapStateToProps( { authedUser } ) {
    return {
        authedUser
    };
}

export default withRouter(connect(mapStateToProps)(Nav));
