import { _getUsers, _getQuestions, _saveQuestionAnswer } from '../utils/_DATA';

import { receiveUsers, saveUserAnswer } from './users';
import { receiveQuestions, saveQuestionAnswer } from './questions';
import { setAuthedUser} from './authedUser';

export function handleInitialData () {
    return (dispatch) => {
        return _getUsers()
            .then( (users) => {
                dispatch(receiveUsers(users));
                dispatch(setAuthedUser(null));
            });
    };
}

export function handleInitialAfterLoggedInData (user) {
    return (dispatch) => {
        return Promise.all([_getUsers(), _getQuestions()])
            .then( (values) => {
                dispatch(receiveUsers(values[0]));
                dispatch(receiveQuestions(values[1]));
                dispatch(setAuthedUser(user));
            })
    };
}

export function handleQuestionAnswer(info) {
    return (dispatch) => {
        dispatch(saveQuestionAnswer(info));
        dispatch(saveUserAnswer(info));

        return _saveQuestionAnswer(info)
            .catch((e) => {
                console.warn('Error in handleQuestionAnswer: ' + e);
                dispatch(saveQuestionAnswer(info));
                dispatch(saveUserAnswer(info));
                alert('There was an error saving the answer. Try again.');
            })
    }
}
