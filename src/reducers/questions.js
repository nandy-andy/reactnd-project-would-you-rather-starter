import { RECEIVE_QUESTIONS, SAVE_QUESTION_ANSWER } from "../actions/questions";

export default function users (state = {}, action) {
    switch (action.type) {
        case RECEIVE_QUESTIONS:
            return {
                ...state,
                ...action.questions
            };
        case SAVE_QUESTION_ANSWER:
            return {
                ...state,
                [action.qid]: {
                    ...state[action.qid],
                    [action.answer]: {
                        ...state[action.qid][action.answer],
                        votes: action.hasVoted === true
                            ? state[action.qid][action.answer].votes.concat([action.authedUser])
                            : state[action.qid][action.answer].votes.filter((uid) => uid !== action.authedUser)
                    }
                }
            };
        default:
            return state;
    };
}
