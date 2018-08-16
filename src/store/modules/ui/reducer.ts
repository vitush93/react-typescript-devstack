import { Pages } from 'store/modules/ui/constants';
import createReducer from 'utils/createReducer';

import { ChangePageAction, UIReducer } from 'store/modules/ui/@types';
import { Types } from 'store/modules/ui/actions';

export const initialState: UIReducer = {
    page: Pages.INTRODUCTION,
    flipAnimation: false,
};

export default createReducer(initialState, {
    [Types.CHANGE_PAGE]: (state: UIReducer, action: ChangePageAction): UIReducer => {
        return {
            ...state,
            flipAnimation: action.payload.flipAnimation,
            page: action.payload.pageName,
        };
    },
});
