import * as pingActions from '../../../actions/root/ping/ping-actions';
import { connect } from 'react-redux';
import Ping from './ping-module';
import selectPong from '../../../selectors/pong-selector';
import { withRouter } from 'react-router';

function mapStateToProps(state) {
    return {
        pong: selectPong(state)
    };
}

function mapDispatchToProps(dispatch) {
    return {
        ping: () => {
            dispatch(pingActions.ping());
        }
    };
}

const VisiblePing = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Ping));

export default VisiblePing;
