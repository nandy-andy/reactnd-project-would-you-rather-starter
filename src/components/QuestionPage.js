import React, { Component } from 'react';
import { connect } from 'react-redux';

import Navigation from './Navigation';
import Question from './Question';
import { withRouter } from "react-router-dom";

class QuestionPage extends Component {
    render() {
        return (
            <div>
                <Navigation />
                <Question />
            </div>
        );
    }
}

function mapStateToProps({ questions }, { id, match }) {
    const question = questions[id] || questions[match.params.id] || null;

    return {
        question
    };
}

export default withRouter(connect(mapStateToProps)(QuestionPage));
