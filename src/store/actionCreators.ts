import * as actionTypes from './actionTypes';
import { TermAction, DispatchType, ITerm } from '../react-app-env';

export function addTerm(term: ITerm): (dispatch: DispatchType) => void {
    const action: TermAction = {
        type: actionTypes.ADD_TERM,
        term,
    };

    return simulateHttpRequest(action);
}

export function removeTerm(term: ITerm): (dispatch: DispatchType) => void {
    const action: TermAction = {
        type: actionTypes.REMOVE_TERM,
        term,
    };
    return simulateHttpRequest(action);
}

export function simulateHttpRequest(action: TermAction) {
    return (dispatch: DispatchType) => {
        setTimeout(() => {
            dispatch(action);
        }, 500);
    };
}
