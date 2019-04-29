import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

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
        if (this.props.authedUser === null) {
            return <Alert variant='info'>In order to see this page please login.</Alert>;
        }

        return (
            <div>
                <Navigation />
                <p>Would you rather...</p>
                <Form onSubmit={(event) => this.onSubmit(event)}>
                    <Form.Control
                        type="text"
                        placeholder="Enter first option"
                        value={this.state.optionOne}
                        onChange={(event) => this.onChangeOptionOne(event)}
                    />
                    <Form.Control
                        type="text"
                        placeholder="Enter second option"
                        value={this.state.optionTwo}
                        onChange={(event) => this.onChangeOptionTwo(event)}
                    />
                    <Button variant="primary" type="submit">Add</Button>
                </Form>
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
