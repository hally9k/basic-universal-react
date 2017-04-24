import { createSelector } from 'reselect';

const getPage = (state) => {
    return state.root.get('page');
};

const pageSelector = createSelector(
    [getPage],
    (page) => {
        return page;
    }
);

export default pageSelector;
