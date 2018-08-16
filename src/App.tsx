import i18n from 'lib/i18n';
import * as React from 'react';
import { hot } from 'react-hot-loader';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import { HashRouter, Route, Switch } from 'react-router-dom';
import store from 'store/configStore';
import Homepage from 'view/routes/Homepage';

class App extends React.Component<{}, {}> {
    render() {
        return (
            <I18nextProvider i18n={i18n}>
                <Provider store={store}>
                    <HashRouter>
                        <Switch>
                            <Route path="/" exact component={Homepage} />
                        </Switch>
                    </HashRouter>
                </Provider>
            </I18nextProvider>
        );
    }
}

export default hot(module)(App);
