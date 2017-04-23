import { Map } from 'immutable';
import { PONG } from '../../../actions/root/ping/ping-actions';

export const INITIAL_STATE = new Map({
    pong: ''
});

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case PONG:
            return pong(state);
        default:
            return state;
    }
};

function pong(state) {
    return state.set('pong', 'PONG');
}
