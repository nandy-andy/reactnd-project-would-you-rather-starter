import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

import Navigation from './Navigation';
import { handleSaveQuestion } from '../actions/shared';

class NewQuestionPage extends Component {
    state = {
        optionOne: '',
        optionTwo: ''
    };

    onChangeOptionOne = (event) => {
        event.preventDefault();
        this.setState({
            optionOne: event.target.value
        });
    };

    onChangeOptionTwo = (event) => {
        event.preventDefault();
        this.setState({
            optionTwo: event.target.value
        });
    };

    onSubmit = (event) => {
        event.preventDefault();

        this.props.dispatch(handleSaveQuestion({
            author: this.props.authedUser,
            optionOneText: this.state.optionOne,
            optionTwoText: this.state.optionTwo
        }));
        this.props.history.push('/');
    };

    render() {
        return (
            <div>
                <Navigation />
                <p>Would you rather...</p>
                <form onSubmit={(event) => this.onSubmit(event)} >
                    <p>...<input type='text' value={this.state.optionOne} onChange={(event) => this.onChangeOptionOne(event)} />?</p>
                    <p>...<input type='text' value={this.state.optionTwo} onChange={(event) => this.onChangeOptionTwo(event)} />?</p>
                    <p><input type='submit' value='Save' /></p>
                </form>
            </div>
        );
    }
}

function mapStateToProps( { authedUser } ) {
    return {
        authedUser
    };
}

export default withRouter(connect(mapStateToProps)(NewQuestionPage));
