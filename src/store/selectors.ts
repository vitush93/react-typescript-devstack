import { FormReducer } from 'redux-form';
import { createSelector } from 'reselect';
import { Redux } from 'typings';

const subState = (state: Redux) => state.form;

export const selectForm = (formName: string) => createSelector(subState, (subState: FormReducer) => subState[formName]);
