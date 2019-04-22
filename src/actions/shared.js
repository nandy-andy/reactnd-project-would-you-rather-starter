import { _getUsers, _getQuestions } from '../utils/_DATA';

import { receiveUsers } from './users';
import { receiveQuestions } from './questions';
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
    console.log('user: ', user);

    return (dispatch) => {
        return Promise.all([_getUsers(), _getQuestions()])
            .then( (values) => {
                console.log('users: ', values[0]);
                console.log('questions: ', values[1]);

                dispatch(receiveUsers(values[0]));
                dispatch(receiveQuestions(values[1]));
                dispatch(setAuthedUser(user));
            })
    };
}
