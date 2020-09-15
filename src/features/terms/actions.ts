import { Term } from 'MyModels';
import { createAction, createAsyncAction } from 'typesafe-actions';

export const addTerm = createAction('ADD_TERM', (id: string, name: string) => ({
    id,
    name,
}))<Term>();

export const removeTerm = createAction('REMOVE_TERM')<string>();

export const loadTermsAsync = createAsyncAction(
    'LOAD_TERMS_REQUEST',
    'LOAD_TERMS_SUCCESS',
    'LOAD_TERMS_FAILURE',
)<undefined, Term[], string>();

export const saveTermsAsync = createAsyncAction(
    'SAVE_TERMS_REQUEST',
    'SAVE_TERMS_SUCCESS',
    'SAVE_TERMS_FAILURE',
)<undefined, undefined, string>();
