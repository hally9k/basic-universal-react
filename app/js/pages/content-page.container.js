import * as rootActions from '../actions/root/root-actions';
import { connect } from 'react-redux';
import ContentPage from './content-page';
import selectPage from '../selectors/page-selector';
import { withRouter } from 'react-router';

function mapStateToProps(state) {
    return {
        pageobject: selectPage(state)
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchPage: () => {
            dispatch(rootActions.getPageData('otter'));
        },
    };
}

const VisibleContentPage = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(ContentPage));

export default VisibleContentPage;
