import React, { Component } from 'react';
import { connect } from 'react-redux';

import Alert from 'react-bootstrap/Alert';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import Navigation from './Navigation';

class LeaderboardPage extends Component {
    render() {
        const { users, authedUser } = this.props;

        if (authedUser === null) {
            return <Alert variant='info'>In order to see this page please login.</Alert>;
        }

        return (
            <div>
                <Navigation />
                <Container as='ol' className='leaderboard'>
                    {users.map( (user) => (
                        <Row as='li' key={user.id} className={authedUser === user.id ? 'current' : ''}>
                            <Col sm='auto'>
                                <img alt={user.name} src={user.avatarURL} width={160} height={160} />
                            </Col>
                            <Col sm='auto' className='question'>
                                <p>{user.name}</p>
                                <p>Number of questions: {user.questions.length}</p>
                                <p>Number of answers: {Object.keys(user.answers).length}</p>
                            </Col>
                        </Row>
                    ))}
                </Container>
            </div>
    );
    }
}

function mapStateToProps( { authedUser, users } ) {
    return {
        users: Object.values(users).sort((userA, userB) => {
            if (userA.questions.length > userB.questions.length) {
                return -1;
            } else if (userB.questions.length > userA.questions.length) {
                return 1;
            } else {
                const answersA = Object.keys(userA.answers);
                const answersB = Object.keys(userB.answers);

                if (answersA.length > answersB.length) {
                    return -1;
                } else if (answersB.length > answersA.length) {
                    return 1;
                }
            }

            return 0;
        }),
        authedUser
    };
}

export default connect(mapStateToProps)(LeaderboardPage);
