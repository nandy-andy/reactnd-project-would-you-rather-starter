import { _getUsers } from '../utils/_DATA';

import { receiveUsers } from './users';
import { setAuthedUser} from "./authedUser";

export function handleInitialData () {
    return (dispatch) => {
        return _getUsers()
            .then( (users) => {
                dispatch(receiveUsers(users));
                dispatch(setAuthedUser(null));
            });
    }
}
