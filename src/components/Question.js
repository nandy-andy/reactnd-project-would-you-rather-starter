import React, { Component } from 'react';
import {connect} from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';

import { handleQuestionAnswer } from '../actions/shared';

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

    onVote = (event, id, option) => {
        const { dispatch, authedUser } = this.props;

        dispatch(handleQuestionAnswer({
            authedUser,
            qid: id,
            answer: option,
            hasVoted: true
        }));
    };

    render() {
        const {authedUser, question, users, isHomepage} = this.props;

        if (question === null) {
            return (
                <li>The question you're looking for does not exist. Sorry.</li>
            );
        }

        const {id, author, optionOne, optionTwo} = question;
        const avatarUrl = users[author].avatarURL;
        const canVote = !optionOne.votes.includes(authedUser) && !optionTwo.votes.includes(authedUser);

        return (
            <li>
                <div>
                    <img alt={author} src={avatarUrl} />
                    <p>Would you rather...</p>
                    {isHomepage && (
                        <ul>
                            <li className={this.getVoteClass(optionOne.votes, authedUser)}>
                                ...{optionOne.text}?
                            </li>
                            <li className={this.getVoteClass(optionTwo.votes, authedUser)}>
                                ...{optionTwo.text}?
                            </li>
                            <p><NavLink to={`/question/${id}`}>Open the poll</NavLink></p>
                        </ul>
                    )}
                    {!isHomepage && !canVote && (
                        <ul>
                            <li className={this.getVoteClass(optionOne.votes, authedUser)}>
                                {optionOne.text} {(optionOne.votes.length/(optionOne.votes.length + optionTwo.votes.length))*100}% ({optionOne.votes.length || 0})
                            </li>
                            <li className={this.getVoteClass(optionTwo.votes, authedUser)}>
                                {optionTwo.text} {(optionTwo.votes.length/(optionOne.votes.length + optionTwo.votes.length))*100}% ({optionTwo.votes.length || 0})
                            </li>
                        </ul>
                    )}
                    {!isHomepage && canVote && (
                        <ul>
                            <li><input type='radio' id={this.getOptionId(id, 1)} name={id} onClick={(event) => this.onVote(event, id, 'optionOne')} /><label htmlFor={this.getOptionId(id, 1)}>{optionOne.text}</label></li>
                            <li><input type='radio' id={this.getOptionId(id, 2)} name={id} onClick={(event) => this.onVote(event, id, 'optionTwo')} /><label htmlFor={this.getOptionId(id, 2)}>{optionTwo.text}</label></li>
                        </ul>
                    )}
                </div>
            </li>
        );
    }
}

function mapStateToProps( { authedUser, users, questions }, { id, match } ) {
    const question = questions[id] || questions[match.params.id] || null;

    return {
        authedUser,
        question,
        users,
        isHomepage: !match.params.id
    };
}

export default withRouter(connect(mapStateToProps)(Question));
