import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom'

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
        return (
            <Router>
                <div className="App">
                    <header className="App-header">
                        <img src={logo} className="App-logo" alt="logo" />
                        Would you rather? by nAndy
                    </header>
                    <main>
                        {this.props.authedUser === null
                            ? <Fragment>
                                <Route path='/' exact component={LoginBox} />
                                <Route path='/questions/:id' component={QuestionPage} />
                              </Fragment>
                            : <Fragment>
                                <Route path='/' exact component={HomePage} />
                                <Route path='/questions/:id' component={QuestionPage} />
                                <Route path='/leaderboard' component={LeaderboardPage} />
                                <Route path='/add' component={NewQuestionPage} />
                              </Fragment>}
                    </main>
                </div>
            </Router>
        );
    }
}

function mapStateToProps( { authedUser } ) {
    return {
        authedUser
    };
}

export default connect(mapStateToProps)(App);
