import classNames from 'classnames';
import React from 'react';
import truncate from '../../utilities/truncate';

class Tile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            truncateCompanyLength: 36,
            truncateLocationLength: 27,
            truncateNewsTitleLength: 48,
            truncatePageTitleLength: 23,
            displaying: false
        };
    }

    componentDidMount() {
        // Onload display
        this.display();
    }

    get date() {
        if (this.props.isPast) {
            return (<p className="date past">Past Event</p>);
        }

        if (this.props.date) {
            return (<time className="date">{this.props.date}</time>);
        }
    }

    display() {
        // Timeout makes sure there is a delay
        setTimeout(() => {
            this.setState({
                displaying: true
            });
        }, 1); // eslint-disable-line
    }

    get genre() {
        if (this.props.genre) return (<h5 className="genre">{this.props.genre}</h5>);
    }

    get location() {
        if (this.props.venue) {
            return (<p className="location">{truncate(this.props.venue, this.state.truncateLocationLength)}</p>);
        } else if (this.props.location) {
            return (<p className="location">{truncate(this.props.location, this.state.truncateLocationLength)}</p>);
        }
    }

    get company() {
        if (this.props.company) return (<h5 className="presenter">{truncate(this.props.company, this.state.truncateCompanyLength)}</h5>);
    }

    get companyIfHighlighted() {
        if (this.props.isHighlighted) return this.company;
    }

    get companyIfNotHighlighted() {
        if (!this.props.isHighlighted) return this.company;
    }

    get price() {
        if (this.props.isPast) {
            return (<p className="price">No longer available</p>);
        }

        if (this.props.price) {
            return (<p className="price">{this.props.price}</p>);
        }
    }

    get subVenues() {
        if (this.props.subVenueNames) return (<p className="sub-venues">{this.props.subVenueNames}</p>);
    }

    get thumbnail() {
        let desktopImage = this.props.thumbnail.landscape;

        // If page, simplify to a single tag
        if (this.props.type === 'page') {
            if (this.props.thumbnail.square !== null) {
                return (<img className="thumbnail-page" src={this.props.thumbnail.square} alt={this.props.name}/>);
            }

            return '';
        }

        // If highlighted, use square image on larger screens
        if (this.props.isHighlighted) {
            desktopImage = this.props.thumbnail.square;
        }

        return (
            <picture className="thumbnail">
                <source srcSet={this.props.thumbnail.square} media="(max-width: 440px)"/>
                <img src={desktopImage} alt={this.props.name}/>
            </picture>
        );
    }

    get title() {
        if (this.props.name) return (<h4 className="title">{this.props.name}</h4>);
    }

    get type() {
        if (this.props.type === 'venue') {
            return (<h5 className="type">Venue</h5>);
        }
    }

    renderInformation() {
        if (this.props.type === 'page') {
            let title;

            // Truncate based on page vs. news
            if (this.props.isNews) {
                title = truncate(this.props.name, this.state.truncateNewsTitleLength);
            } else {
                title = truncate(this.props.name, this.state.truncatePageTitleLength);
            }

            return (
                <h3 className="title-page">{title}</h3>
            );
        }

        return (
            <div className="information">
                {this.companyIfNotHighlighted}
                {this.type}
                {this.title}
                {this.subVenues}
                {this.date}
                <div className="further">
                    {this.price}
                    {this.location}
                </div>
                {this.genre}
            </div>
        );
    }

    render() {
        let tileClass = classNames({
            'tile': true,
            'has-presenter': this.props.company,
            'is-highlighted': this.props.isHighlighted,
            'is-hidden': this.state.displaying === false,
            'is-news': this.props.isNews
        });

        return (
            <a href={this.props.url} className={tileClass} data-theme={this.props.theme}>
                {this.companyIfHighlighted}
                {this.thumbnail}
                {this.renderInformation()}
            </a>
        );
    }
}

Tile.propTypes = {
    company:  React.PropTypes.string,
    date:  React.PropTypes.oneOfType([
        React.PropTypes.bool,
        React.PropTypes.string
    ]),
    genre:  React.PropTypes.string,
    isHighlighted: React.PropTypes.bool,
    isNews: React.PropTypes.bool,
    isPast: React.PropTypes.bool,
    location:  React.PropTypes.string,
    name:  React.PropTypes.string.isRequired,
    price:  React.PropTypes.oneOfType([
        React.PropTypes.bool,
        React.PropTypes.string,
    ]),
    subVenueNames: React.PropTypes.string,
    theme:  React.PropTypes.string,
    thumbnail:  React.PropTypes.object.isRequired,
    type:  React.PropTypes.string.isRequired,
    url: React.PropTypes.string.isRequired,
    venue:  React.PropTypes.string
};

Tile.defaultProps = {
    isHighlighted: false,
    isNews: false
};

export default Tile;
