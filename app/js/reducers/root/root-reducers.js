import { Map } from 'immutable';
import {
    GET_GITHUB_USER_FAILURE,
    GET_GITHUB_USER_SUCCESS,
    GET_PAGE_DATA_SUCCESS
} from '../../actions/root/root-actions';

export const INITIAL_STATE = new Map({
    user: null,
    error: null,
    page: null
});

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_PAGE_DATA_SUCCESS:
            return getPageDataSuccess(state, action);
        case GET_GITHUB_USER_SUCCESS:
            return getGitHubUserSuccess(state, action);
        case GET_GITHUB_USER_FAILURE:
            return getGitHubUserFailure(state, action);
        default:
            return state;
    }
};

function getPageDataSuccess(state, action) {
    return state
            .set('page', new Map(action.payload))
            .set('error', null);
}

function getGitHubUserSuccess(state, action) {
    return state
            .set('user', new Map(action.payload))
            .set('error', null);
}

function getGitHubUserFailure(state, action) {
    return state
            .set('error', new Map(action.payload))
            .set('user', null);
}
