declare module 'MyModels' {
    export type Term = {
        id: string;
        name: string;
    };

    export type TermAction = {
        type: 'ADD_TERM' | 'REMOVE_TERM';
        payload: Term[];
    };
}
