import * as rootActions from '../../actions/root/root-actions';
import { connect } from 'react-redux';
import Root from './root-module';
import selectGitHubError from '../../selectors/github-error-selector';
import selectGitHubUser from '../../selectors/github-user-selector';
import selectPage from '../../selectors/select-page';
import { withRouter } from 'react-router';

function mapStateToProps(state) {
    return {
        page: selectPage(state),
        user: selectGitHubUser(state),
        error: selectGitHubError(state)
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchPage: () => {
            dispatch(rootActions.getPageData('otter'));
        },
        getGitHubUser: (reply) => {
            dispatch(rootActions.getGitHubUser(reply));
        }
    };
}

const VisibleRoot = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Root));

export default VisibleRoot;
