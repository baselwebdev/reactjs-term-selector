import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { RootAction, RootState } from 'typesafe-actions';
import rootReducer from './root-reducer';
import { composeWithDevTools } from 'redux-devtools-extension';

export const epicMiddleware = createEpicMiddleware<
    RootAction,
    RootAction,
    RootState
>();

// configure middlewares
const middlewares = [epicMiddleware];
// compose enhancers

// rehydrate state on app start
const initialState = {};

// create store
const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middlewares)),
);

// export store singleton instance
export default store;
