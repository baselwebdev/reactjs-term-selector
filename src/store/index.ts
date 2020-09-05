import { combineReducers } from 'redux';
import { UserInputState } from './UserInput/types';
import { userInputReducer } from './UserInput/reducer';

// The top-level state object
export interface ApplicationState {
    userInput: UserInputState;
}

// Whenever an action is dispatched, Redux will update each top-level application state property
// using the reducer with the matching name. It's important that the names match exactly, and that
// the reducer acts on the corresponding ApplicationState property type.
export const createRootReducer = () =>
    combineReducers({
        userInput: userInputReducer,
    });
