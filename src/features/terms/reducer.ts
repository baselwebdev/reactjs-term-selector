import { Term } from 'MyModels';
import { combineReducers } from 'redux';

const initialState: Term[] =  [{
    id: '0001',
    name: 'My term',
}];

const termsActionHandler = (state = initialState, action: any) => {
    switch (action.type) {
        case 'ADD_TERM':
            return [...state, action.payload];
        case 'REMOVE_TERM':
            return state.filter((i: any) => i.id !== action.payload);
        default:
            return state;
    }
}
const termsReducer = combineReducers({
    terms: termsActionHandler,
});

export default termsReducer;
export type TermsState = ReturnType<typeof termsReducer>;
