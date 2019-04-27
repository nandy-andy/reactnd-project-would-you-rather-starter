import React, { Component } from 'react';
import {connect} from 'react-redux';

class Question extends Component {
    getOptionId = (id, option) => {
        return id + '-' + option;
    };

    getVoteClass = (votes, authedUser) => {
        if (votes.includes(authedUser)) {
            return 'voted';
        }

        return 'unvoted';
    };

    render() {
        const {id, authedUser} = this.props;
        const filteredQuestions = this.props.questions.filter(question => question.id === id);

        if (filteredQuestions.length === 0) {
            return (
                <li>Incorrect question id</li>
            );
        }

        const {author, optionOne, optionTwo} = filteredQuestions[0];
        const avatarUrl = this.props.users[author].avatarURL;
        const canVote = !optionOne.votes.includes(authedUser) && !optionTwo.votes.includes(authedUser);

        return (
            <li>
                <div>
                    <p>Would you rather...</p>
                    {!canVote && (
                        <ul>
                            <li className={this.getVoteClass(optionOne.votes, authedUser)}>
                                {optionOne.text} {(optionOne.votes.length/(optionOne.votes.length + optionTwo.votes.length))*100}% ({optionOne.votes.length || 0})
                            </li>
                            <li className={this.getVoteClass(optionTwo.votes, authedUser)}>
                                {optionTwo.text} {(optionTwo.votes.length/(optionOne.votes.length + optionTwo.votes.length))*100}% ({optionTwo.votes.length || 0})
                            </li>
                        </ul>
                    )}
                    {canVote && (
                        <ul>
                            <li><input type='radio' id={this.getOptionId(id, 1)} name={id} /><label for={this.getOptionId(id, 1)}>{optionOne.text}</label></li>
                            <li><input type='radio' id={this.getOptionId(id, 2)} name={id} /><label for={this.getOptionId(id, 2)}>{optionTwo.text}</label></li>
                        </ul>
                    )}
                    <img alt={author} src={avatarUrl} />
                    <p>{id}</p>
                </div>
            </li>
        );
    }
}

function mapStateToProps( { authedUser, users, questions } ) {
    return {
        authedUser,
        questions: Object.values(questions),
        users
    };
}

export default connect(mapStateToProps)(Question);
