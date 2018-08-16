import { TranslationFunction } from 'react-i18next';
import { AnyAction } from 'redux';
import { FormReducer } from 'redux-form';
import { UIReducer } from 'store/modules/ui/@types';

export interface Redux {
    form: FormReducer;
    ui: UIReducer;
}

export interface Action extends AnyAction {
    payload?: any;
}

export type ITranslator = {
    t?: TranslationFunction;
};
