import deepFreeze from 'deepfreeze';
import pingReducers from 'reducers/root/ping/ping-reducers';
import {
    PONG
} from 'actions/root/ping/ping-actions';

const INITIAL_STATE = deepFreeze(pingReducers.INITIAL_STATE);

describe('Ping reducer pong()', () => {
    it('should set the pong property in the ping app state to "PONG"', () => {
        const action = {
            type: PONG
        };
        const newState = pingReducers(INITIAL_STATE, action);
        expect(newState.get('pong')).toBe('PONG');
    });
});
