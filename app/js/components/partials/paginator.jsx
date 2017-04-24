import classNames from 'classnames';
import getURIValueFromKey from '../../helpers/get-uri-value-from-key';
import Grid from '../grid/grid';
import InternalServerErrorException from '../../exceptions/internal-server-error';
import React from 'react';
import { STATUS_CODE } from '../../config/http';
import 'whatwg-fetch';

class Paginator extends React.Component {
    constructor(props) { // eslint-disable-line no-magic-numbers
        super(props);

        this._animationDelay = 800;
        this._limit = this.props.limit;
        this._total = this.props.total;
        this._type = this.props.type;

        this.state = {
            currentPage: 1,
            displaying: false,
            items: this.props.items,
            itemsLastLength: this._limit,
            links: this.props.links,
            loading: false
        };
    }

    componentWillMount() {
        this.calculateDisplayAmount();
    }

    get currentPage() {
        return this.state.currentPage;
    }

    get displaying() {
        return this.state.displaying;
    }

    get items() {
        return this.state.items;
    }

    get links() {
        return this.state.links;
    }

    get limit() {
        return this._limit;
    }

    get loading() {
        return this.state.loading;
    }

    get pages() {
        return Math.ceil(this.total / this.limit);
    }

    get isShowingPagination() {
        return this.total > this.limit;
    }

    get itemsLastLength() {
        return this.state.itemsLastLength;
    }

    get total() {
        return this._total;
    }

    get type() {
        return this._type;
    }

    calculateDisplayAmount() {
        let displaying = false;

        if (this.isShowingPagination && this.currentPage !== this.pages) {
            let currentlyDisplayingAmount = this.limit * this.currentPage;

            displaying = `${currentlyDisplayingAmount} of ${this.total}`;
        }

        this.setState({
            displaying: displaying
        });
    }

    fetchMoreItems() {
        let nextLink = this.links.next;

        if (nextLink) {
            let date = getURIValueFromKey('date', nextLink),
                endpoint,
                genre = getURIValueFromKey('genre', nextLink),
                keywords = getURIValueFromKey('keywords', nextLink),
                nextPage = getURIValueFromKey('page', nextLink),
                price = getURIValueFromKey('price', price);

            // Set endpoint based on type of Paginator
            switch (this.type) {
                case 'show-search':
                    endpoint = `api/event/search?date=${date}&genre=${genre}&price=${price}`;
                    break;

                case 'search':
                default:
                    endpoint = `api/search?keywords=${keywords}`;
                    break;
            }

            fetch(`/${endpoint}&page=${nextPage}`, {
                method: 'GET',
                mode: 'cors',
                credentials: 'include', // Send cookies, required for basic-auth on non PROD environments
                cache: 'no-cache',
                redirect: 'follow',
                headers: {
                    Accept: 'application/json'
                }
            })
            .then((response) => {
                if (response.status >= STATUS_CODE.INTERNAL_SERVER_ERROR.status) {
                    throw new InternalServerErrorException();
                }

                return response.json();
            })
            .then((json) => {
                this.updateResults(json);
            })
            .catch((error) => {
                console.error(error); // eslint-disable-line
            });
        }
    }

    next() {
        if (this.currentPage < this.pages) {
            this.setState({
                currentPage: ++this.state.currentPage,
                loading: true
            });

            this.fetchMoreItems();
            this.calculateDisplayAmount();
        }
    }

    updateResults(json) {
        let jsonData = json;

        // Delay show with animation in
        setTimeout(() => {
            this.setState({
                items: this.state.items.concat(jsonData.results),
                itemsLastLength: jsonData.results.length,
                links: jsonData.links,
                loading: false
            });
        }, this._animationDelay); // eslint-disable-line no-magic-numbers
    }

    renderActions() {
        if (this.displaying && this.loading === false) {
            return (
                <div className="actions">
                    <p className="amount">Showing {this.displaying} results</p>
                    <button className="button default" type="button" onClick={() => this.next()}>Load More</button>
                </div>
            );
        }
    }

    renderLoadingBar() {
        if (this.itemsLastLength === this.limit) {
            return (
                <div className="loading-bar">
                    <object className="loader" width="200" height="200" data="/assets/images/loader.svg"></object>
                </div>
            );
        }
    }

    renderPaginationLinks() {
        let loadMoreClass = classNames({
            'load-more': true,
            'is-loading': this.state.loading,
            'is-empty': this.itemsLastLength !== this.limit
        });

        return (
            <div className={loadMoreClass}>
                {this.renderActions()}
                {this.renderLoadingBar()}
            </div>
        );
    }

    render() {
        return (
            <div className="pagination">
                <Grid content={this.items}/>
                {this.renderPaginationLinks()}
            </div>
        );
    }
}

Paginator.propTypes = {
    items: React.PropTypes.array.isRequired,
    limit: React.PropTypes.number,
    links: React.PropTypes.object.isRequired,
    total: React.PropTypes.number.isRequired,
    type: React.PropTypes.string.isRequired
};

Paginator.defaultProps = {
    limit: 12
};

export default Paginator;
