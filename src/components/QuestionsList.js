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

function mapStateToProps( { authedUser, users, questions } ) {
    return {
        authedUser,
        answeredQuestions: Object.values(questions).filter(
            (question) => Object.keys(users[authedUser].answers).includes(question.id)
        ),
        unansweredQuestions: Object.values(questions).filter(
            (question) => !Object.keys(users[authedUser].answers).includes(question.id)
        ),
        users
    };
}

export default connect(mapStateToProps)(QuestionsList);
