import { action } from 'typesafe-actions';
import { UserInputActionTypes } from './types';

export const getUserInput = () => action(UserInputActionTypes.GET_USER_INPUT);
export const setUserInput = (searchString: string) => action(UserInputActionTypes.SET_USER_INPUT, searchString);
