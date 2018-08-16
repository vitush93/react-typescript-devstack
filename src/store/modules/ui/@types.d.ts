import { AnyAction } from 'redux';

import { Pages } from 'store/modules/ui/constants';

export interface UIReducer {
    page: Pages;
    flipAnimation: boolean;
}

export interface ChangePageAction extends AnyAction {
    payload: {
        pageName: Pages;
        flipAnimation: boolean;
    };
}
