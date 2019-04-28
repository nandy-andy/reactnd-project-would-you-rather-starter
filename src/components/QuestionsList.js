import React, { Component } from 'react';
import {connect} from 'react-redux';

import Alert from 'react-bootstrap/Alert';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

import Question from './Question';

class QuestionsList extends Component {
    render() {
        const { answeredQuestions, unansweredQuestions } = this.props;

        return (
            <Tabs defaultActiveKey="unanswered" transition={false} id="noanim-tab-example">
                <Tab eventKey="unanswered" title="Unanswered">
                    {unansweredQuestions.length === 0 && (
                        <Alert variant='info'>
                            All questions answered! Bravo!
                        </Alert>
                    )}
                    <ul>
                        {unansweredQuestions.map((question) => (
                            <Question key={question.id} id={question.id} />
                        ))}
                    </ul>
                </Tab>
                <Tab eventKey="answered" title="Answered">
                    {answeredQuestions.length === 0 && (
                        <Alert variant='info'>
                            You haven't answered any quesiton, yet!
                        </Alert>
                    )}
                    <ul>
                        {answeredQuestions.map((question) => (
                            <Question key={question.id} id={question.id} />
                        ))}
                    </ul>
                </Tab>
            </Tabs>
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
