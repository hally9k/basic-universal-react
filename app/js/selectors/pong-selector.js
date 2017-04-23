import { createSelector } from 'reselect';

const getPong = (state) => {
    return state.ping.get('pong');
};

const pongSelector = createSelector(
    [getPong],
    (pong) => {
        return pong;
    }
);

export default pongSelector;
