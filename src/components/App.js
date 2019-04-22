import React, { Component } from 'react';
import { connect } from 'react-redux';

import { handleInitialData } from '../actions/shared';

import LoginBox from './LoginBox';
import Nav from './Nav';
import QuestionsList from './QuestionsList';

import logo from '../logo.svg';
import '../App.css';

class App extends Component {
    componentDidMount() {
        this.props.dispatch(handleInitialData());
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    Would you rather? by nAndy
                </header>
                <main>
                    {!this.props.authedUser && <LoginBox />}
                    {this.props.authedUser && <Nav />}
                    {this.props.authedUser && <QuestionsList />}
                </main>
          </div>
        );
    }
}

function mapStateToProps( { authedUser } ) {
    return {
        authedUser
    };
}

export default connect(mapStateToProps)(App);
