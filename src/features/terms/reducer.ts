import { Term, TermAction } from 'MyModels';
import { combineReducers } from 'redux';

const initialState: Term[] = [
    {
        id: '0001',
        name: 'My term',
    },
];

const termsActionHandler = (state = initialState, action: TermAction) => {
    switch (action.type) {
        case 'ADD_TERM':
            return [...state, action.payload];
        case 'REMOVE_TERM':
            return state.filter((term: Term) => term.id !== action.payload);
        default:
            return state;
    }
};
const termsReducer = combineReducers({
    terms: termsActionHandler,
});

export default termsReducer;
export type TermsState = ReturnType<typeof termsReducer>;
