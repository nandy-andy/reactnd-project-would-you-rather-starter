import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'

import { handleInitialData } from '../actions/shared';

import LoginBox from './LoginBox';
import HomePage from './HomePage';
import QuestionPage from './QuestionPage';
import LeaderboardPage from './LeaderboardPage';
import NewQuestionPage from './NewQuestionPage';

import logo from '../logo.svg';
import '../App.css';

class App extends Component {
    componentDidMount() {
        this.props.dispatch(handleInitialData());
    }

    render() {
        const isAuthedUser = this.props.authedUser !== null;

        return (
            <Router>
                <div className="App">
                    <header className="App-header">
                        <img src={logo} className="App-logo" alt="logo" />
                        Would you rather? by nAndy
                    </header>
                    <main>
                        <Route path='/login' exact component={LoginBox} />
                        <PrivateRoute authed={isAuthedUser} path='/' exact component={HomePage} />
                        <PrivateRoute authed={isAuthedUser} path='/questions/:id' component={QuestionPage} />
                        <PrivateRoute authed={isAuthedUser} path='/leaderboard' component={LeaderboardPage} />
                        <PrivateRoute authed={isAuthedUser} path='/add' component={NewQuestionPage} />
                    </main>
                </div>
            </Router>
        );
    }
}

function PrivateRoute({ component: Component, authed: isAuthedUser, ...rest }) {
    return (
        <Route
            {...rest}
            render={props =>
                isAuthedUser ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: props.location }
                        }}
                    />
                )
            }
        />
    );
}

function mapStateToProps( { authedUser } ) {
    return {
        authedUser
    };
}

export default connect(mapStateToProps)(App);
