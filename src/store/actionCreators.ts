import * as actionTypes from './actionTypes';

export function addArticle(term: ITerm): (dispatch: DispatchType) => void {
    const action: TermAction = {
        type: actionTypes.ADD_TERM,
        term,
    };

    return simulateHttpRequest(action);
}

export function removeArticle(term: ITerm): (dispatch: DispatchType) => void {
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
