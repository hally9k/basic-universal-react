import { createSelector } from 'reselect';

const getGitHubUser = (state) => {
    const user = state.root.get('user');
    return user ? user.toJS() : null;
};

const githubUserSelector = createSelector(
    [getGitHubUser],
    (githubUser) => {
        return githubUser;
    }
);

export default githubUserSelector;
