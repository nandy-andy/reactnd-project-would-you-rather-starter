import React, { Component } from 'react';
import { connect } from 'react-redux';

import Navigation from './Navigation';
import Question from './Question';
import { withRouter } from "react-router-dom";
import { handleInitialAfterLoggedInData } from "../actions/shared";

class QuestionPage extends Component {
    componentDidMount() {
        if (this.props.authedUser === null) {
            this.props.dispatch(handleInitialAfterLoggedInData(null));
        }
    }

    render() {
        const { authedUser } = this.props;

        return (
            <div>
                { authedUser !== null && <Navigation /> }
                <Question />
            </div>
        );
    }
}

function mapStateToProps({ authedUser, questions }, { id, match }) {
    const question = questions[id] || questions[match.params.id] || null;

    return {
        authedUser,
        question
    };
}

export default withRouter(connect(mapStateToProps)(QuestionPage));
