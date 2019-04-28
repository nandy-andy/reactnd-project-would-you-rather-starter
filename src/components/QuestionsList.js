import React, { Component } from 'react';
import {connect} from 'react-redux';

import Question from './Question';

class QuestionsList extends Component {
    render() {
        const { answeredQuestions, unansweredQuestions } = this.props;

        return (
            <div>
                <h3>Unanswered</h3>
                <ul>
                    {unansweredQuestions.map((question) => (
                        <Question key={question.id} id={question.id} />
                    ))}
                </ul>
                <h3>Answered</h3>
                <ul>
                {answeredQuestions.map((question) => (
                    <Question key={question.id} id={question.id} />
                ))}
                </ul>
            </div>
        );
    }
}

function compareQuestions(question1, question2) {
    if (question1.timestamp > question2.timestamp) {
        return -1;
    } else if ( question1.timestamp < question2.timestamp ) {
        return 1;
    }

    return 0;
}

function mapStateToProps( { authedUser, users, questions } ) {
    return {
        authedUser,
        answeredQuestions: Object.values(questions).filter(
            (question) => Object.keys(users[authedUser].answers).includes(question.id)
        ).sort(compareQuestions),
        unansweredQuestions: Object.values(questions).filter(
            (question) => !Object.keys(users[authedUser].answers).includes(question.id)
        ).sort(compareQuestions),
        users
    };
}

export default connect(mapStateToProps)(QuestionsList);
