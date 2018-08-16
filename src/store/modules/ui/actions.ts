import { ChangePageAction } from 'store/modules/ui/@types';
import { Pages } from 'store/modules/ui/constants';

export enum Types {
    CHANGE_PAGE = 'ui/CHANGE_PAGE',
}

export function changePage(pageName: Pages, flipAnimation: boolean = false): ChangePageAction {
    return {
        type: Types.CHANGE_PAGE,
        payload: {
            pageName,
            flipAnimation,
        },
    };
}
