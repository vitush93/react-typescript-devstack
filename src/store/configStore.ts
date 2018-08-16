import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import createSagaMiddleware from 'redux-saga';
import rootReducers from 'store/reducers';
import rootSagas from 'store/sagas';

export const sagaMiddleware = createSagaMiddleware();

export const initStore = () => {
    return { type: 'init' };
};

export const configureStore = () => {
    if (process.env.NODE_ENV === 'production') {
        return createStore(
            combineReducers({
                ...rootReducers,
            }),
            applyMiddleware(sagaMiddleware),
        );
    } else {
        return createStore(
            combineReducers({
                ...rootReducers,
            }),
            composeWithDevTools(applyMiddleware(sagaMiddleware)),
        );
    }
};

const store = configureStore();

rootSagas.map((saga: any) => sagaMiddleware.run(saga, store.dispatch));

export default store;
