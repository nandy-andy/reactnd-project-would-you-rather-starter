import React, { Component } from 'react';
import {connect} from "react-redux";

class QuestionsList extends Component {
    render() {
        return (
            <div>
                <h3>Unanswered</h3>
                <ul>
                {this.props.answeredQuestions.map((question) => (
                    <li key={question.id}>{question.author}</li>
                ))}
                </ul>
                <h3>Answered</h3>
                <ul>
                {this.props.unansweredQuestions.map((question) => (
                    <li key={question.id}>{question.author}</li>
                ))}
                </ul>
            </div>
        );
    }
}

function mapStateToProps( { authedUser, users, questions } ) {
    return {
        answeredQuestions: Object.values(questions).filter(
            (question) => Object.keys(users[authedUser].answers).includes(question.id)
        ),
        unansweredQuestions: Object.values(questions).filter(
            (question) => !Object.keys(users[authedUser].answers).includes(question.id)
        )
    };
}

export default connect(mapStateToProps)(QuestionsList);
