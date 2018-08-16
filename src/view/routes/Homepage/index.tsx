import * as React from 'react';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { compose } from 'redux';
import { selectCurrentPage, selectFlipAnimation } from 'store/modules/ui/selectors';
import { ITranslator, Redux } from 'typings';
import DefaultTemplate from 'view/templates/DefaultTemplate';

interface Props extends ITranslator {}

interface State {}

class Homepage extends React.Component<Props, State> {
    render() {
        return <DefaultTemplate>Homepage</DefaultTemplate>;
    }
}

export default compose(
    connect(
        (state: Redux) => ({
            currentPage: selectCurrentPage(state),
            flipAnimation: selectFlipAnimation(state),
        }),
        {},
    ),
    translate(),
    withRouter,
)(Homepage);
