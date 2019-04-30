import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleInitialAfterLoggedInData } from '../actions/shared';
import { withRouter, Redirect } from 'react-router-dom'

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

class LoginBox extends Component {
    state = {
        user: null
    };

    logIn = (event) => {
        event.preventDefault();

        if (this.state.user !== null) {
            this.setState({user: this.state.user});
            this.props.dispatch(handleInitialAfterLoggedInData(this.state.user));
        }
    };

    handleChange = (user) => {
        this.setState({user: user});
    };

    render() {
        let { from } = this.props.location.state || { from: { pathname: "/" } };
        const { authedUser } = this.props;

        if (authedUser) {
            return <Redirect to={from} />;
        }

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

function mapStateToProps( { authedUser, users } ) {
    return {
        authedUser,
        users: Object.values(users)
    };
}

export default withRouter(connect(mapStateToProps)(LoginBox));
