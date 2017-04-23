import { PING, pong } from '../../../actions/root/ping/ping-actions';

export default (action$) =>
      action$.ofType(PING)
        .delay(1000) // eslint-disable-line
        .mapTo(pong());
