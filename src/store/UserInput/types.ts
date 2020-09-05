// Use `enum`s for better autocompletion of action type names. These will
// be compiled away leaving only the final value in your compiled code.
//
// Define however naming conventions you'd like for your action types, but
// personally, I use the `@@context/ACTION_TYPE` convention, to follow the convention
// of Redux's `@@INIT` action.
export enum UserInputActionTypes {
    SET_USER_INPUT = 'UserInput/SET_USER_INPUT',
    GET_USER_INPUT = 'UserInput/GET_USER_INPUT',
}

export interface UserInputState {
    readonly searchText: string;
}
