import { createSelector } from 'reselect';
import { UIReducer } from 'store/modules/ui/@types';
import { Redux } from 'typings';

const selectUISubstate = (state: Redux) => state.ui;

export const selectCurrentPage = createSelector(selectUISubstate, (subState: UIReducer) => subState.page);
export const selectFlipAnimation = createSelector(selectUISubstate, (subState: UIReducer) => subState.flipAnimation);
