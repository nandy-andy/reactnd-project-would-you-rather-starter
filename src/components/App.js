import React, { Component } from 'react';
import { connect } from 'react-redux';

import { handleInitialData } from "../actions/shared";

import LoginBox from "./LoginBox";

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
          <LoginBox users={this.props.users} />
        </main>
      </div>
    );
  }
}

export default connect()(App);
