import * as pingActions from 'actions/root/ping/ping-actions';

const {
    PING,
    PONG
} = pingActions;

describe('ping actions', () => {
    it('should create a ping action', () => {
        const expectedAction = {
            type: PING
        };
        expect(pingActions.ping()).toEqual(expectedAction);
    });
});

describe('pong actions', () => {
    it('should create a pong action', () => {
        const expectedAction = {
            type: PONG
        };
        expect(pingActions.pong()).toEqual(expectedAction);
    });
});
