import * as rootActions from 'actions/root/root-actions';

describe('getGitHubUser() actions', () => {
    it('should create an action to with the given userId as the payload.', () => {
        const userId = 'pixel-fusion';
        const expectedAction = {
            type: rootActions.GET_GITHUB_USER,
            payload: userId
        };
        expect(rootActions.getGitHubUser('pixel-fusion')).toEqual(expectedAction);
    });
});
