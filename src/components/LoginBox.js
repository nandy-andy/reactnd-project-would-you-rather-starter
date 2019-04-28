import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleInitialAfterLoggedInData } from '../actions/shared';
import { withRouter } from 'react-router-dom'

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

class LoginBox extends Component {
    state = {
        user: null
    };

    logIn = (event) => {
        event.preventDefault();

        if (this.state.user !== null) {
            this.props.dispatch(handleInitialAfterLoggedInData(this.state.user));
            this.props.history.push('/');
        }
    };

    handleChange = (user) => {
        this.setState(() => ({
            user: user
        }));
    };

    render() {
        return (
            <Form>
                <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Control as="select" value={this.state.value} onChange={(event) => this.handleChange(event.target.value)}>
                            <option>-- select a user to log-in --</option>
                            {this.props.users.map((user) => (
                                <option key={user.id} value={user.id}>{user.name}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                <Button variant="primary" onClick={(event) => this.logIn(event)}>Login</Button>
            </Form>
        );
    }
}

function mapStateToProps( { users } ) {
    return {
        users: Object.values(users)
    };
}

export default withRouter(connect(mapStateToProps)(LoginBox));
