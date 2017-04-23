import deepFreeze from 'deepfreeze';
import {
    GET_GITHUB_USER_SUCCESS
    } from 'actions/root/root-actions';
import rootReducers from 'reducers/root/root-reducers';

const INITIAL_STATE = deepFreeze(rootReducers.INITIAL_STATE);

describe('Root reducer getGitHubUser()', () => {
    it('should set the given user in the app state', () => {
        const user = {
            avatar_url: '', // eslint-disable-line camelcase
            login: 'pf',
            id: 12345
        };
        const action = {
            type: GET_GITHUB_USER_SUCCESS,
            payload: user
        };
        const newState = rootReducers(INITIAL_STATE, action);
        expect(newState.get('user').toJS()).toEqual(user);
    });
});
