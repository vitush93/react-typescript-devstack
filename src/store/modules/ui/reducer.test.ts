import expect from 'expect';

import { changePage } from 'store/modules/ui/actions';
import { Pages } from 'store/modules/ui/constants';
import reducer, { initialState } from 'store/modules/ui/reducer';

describe('ui reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, { type: '' })).toEqual(initialState);
    });

    it('should change page', () => {
        expect(reducer(initialState, changePage(Pages.INTRODUCTION))).toEqual({ ...initialState, page: Pages.INTRODUCTION });
    });
});
