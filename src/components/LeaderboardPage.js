import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from './Nav';

class LeaderboardPage extends Component {
    render() {
        const { users } = this.props;

        return (
            <div>
                <Nav />
                <ol>
                    {users.map( (user) => (
                        <li key={user.id}>
                            <ul>
                                <li><img alt={user.name} src={user.avatarURL} /></li>
                                <li>{user.name}</li>
                                <li>Number of questions: {user.questions.length}</li>
                                <li>Number of answers: {Object.keys(user.answers).length}</li>
                            </ul>
                        </li>
                    ))}
                </ol>
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
        })
    };
}

export default connect(mapStateToProps)(LeaderboardPage);
