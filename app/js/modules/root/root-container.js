import * as rootActions from '../../actions/root/root-actions';
import { connect } from 'react-redux';
import Root from './root-module';
import selectGitHubError from '../../selectors/github-error-selector';
import selectGitHubUser from '../../selectors/github-user-selector';
import { withRouter } from 'react-router';

function mapStateToProps(state) {
    return {
        user: selectGitHubUser(state),
        error: selectGitHubError(state)
    };
}

function mapDispatchToProps(dispatch) {
    return {
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
