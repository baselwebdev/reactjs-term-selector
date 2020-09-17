import { Term } from 'MyModels';
import { createAction } from 'typesafe-actions';

export const addTerm = createAction('ADD_TERM', (id: string, name: string) => ({
    id,
    name,
}))<Term>();

export const removeTerm = createAction('REMOVE_TERM')<string>();
