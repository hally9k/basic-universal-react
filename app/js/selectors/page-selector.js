import { createSelector } from 'reselect';

const getPage = (state) => state.root.getIn(['page', 'data', 0]);

const pageSelector = createSelector(
    [getPage],
    (page) => {
        return page.toJS();
    }
);

export default pageSelector;
