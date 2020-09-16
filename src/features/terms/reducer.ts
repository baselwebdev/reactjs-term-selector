import { Term } from 'MyModels';
import { combineReducers } from 'redux';
import { createReducer } from 'typesafe-actions';

import { loadTermsAsync } from './actions';

export const terms = createReducer([
    {
        id: '0001',
        name: 'My term',
    },
] as Term[])
    .handleAction(
        loadTermsAsync.success,
        (state: any, action: any) => action.payload,
    );
    // .handleAction(addTerm, (state: any, action: any) => [
    //     ...state,
    //     action.payload,
    // ])
    // .handleAction(removeTerm, (state: any, action: any) =>
    //     state.filter((i: any) => i.id !== action.payload),
    // );

const termsReducer = combineReducers({
    terms,
});

export default termsReducer;
export type TermsState = ReturnType<typeof termsReducer>;
