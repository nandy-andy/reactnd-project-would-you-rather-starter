export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const SAVE_QUESTION_ANSWER = 'SAVE_QUESTION_ANSWER';
export const SAVE_QUESTION = 'SAVE_QUESTION';

export function receiveQuestions(questions) {
    return {
        type: RECEIVE_QUESTIONS,
        questions
    };
}

export function saveQuestionAnswer({ authedUser, qid, answer, hasVoted }) {
    return {
        type: SAVE_QUESTION_ANSWER,
        qid,
        authedUser,
        answer,
        hasVoted
    };
}

export function saveQuestion(question) {
    return {
        type: SAVE_QUESTION,
        question
    }
}
