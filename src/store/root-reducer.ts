import { combineReducers } from 'redux';

import termsReducer from '../features/terms/reducer';

const rootReducer = combineReducers({
    terms: termsReducer,
});

export default rootReducer;
