import * as actionTypes from './actionTypes';
import { TermsState, ITerm, TermAction } from '../react-app-env';

const initialState: TermsState = {
    Terms: [
        {
            TermId: '1',
            Name: 'Basel',
        },
        {
            TermId: '2',
            Name: 'Test',
        },
    ],
};

const reducer = (state: TermsState = initialState, action: TermAction): TermsState => {
    switch (action.type) {
        case actionTypes.ADD_TERM: {
            const newTerm: ITerm = {
                TermId: Math.random().toString(),
                Name: action.term.Name,
            };
            return {
                ...state,
                Terms: state.Terms.concat(newTerm),
            };
        }
        case actionTypes.REMOVE_TERM: {
            const updateTerms: ITerm[] = state.Terms.filter((term) => term.TermId !== action.term.TermId);
            return {
                ...state,
                Terms: updateTerms,
            };
        }
    }
    return state;
};

export default reducer;
