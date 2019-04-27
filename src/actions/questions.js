import { _saveQuestionAnswer } from "../utils/_DATA";

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const SAVE_QUESTION_ANSWER = 'SAVE_QUESTION_ANSWER';

export function receiveQuestions(questions) {
    return {
        type: RECEIVE_QUESTIONS,
        questions
    };
}

function saveQuestionAnswer({ authedUser, qid, answer, hasVoted }) {
    return {
        type: SAVE_QUESTION_ANSWER,
        qid,
        authedUser,
        answer,
        hasVoted
    };
}

export function handleQuestionAnswer(info) {
    return (dispatch) => {
        dispatch(saveQuestionAnswer(info));

        return _saveQuestionAnswer(info)
            .catch((e) => {
                console.warn('Error in handleQuestionAnswer: ' + e);
                dispatch(saveQuestionAnswer(info));
                alert('There was an error saving the answer. Try again.');
            })
    }
}
