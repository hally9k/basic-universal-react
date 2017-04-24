import classnames from 'classnames';
import { ITEM_LIMIT } from '../../config/carousel';
import React from 'react';
import truncate from '../../helpers/truncate';
import wrapHyphens from '../../helpers/wrap-hyphens';

const TITLE_LIMIT = 44;

class Hero extends React.Component {
    constructor(props) {
        super(props);
    }

    handleVenuesClick(event) {
        event.preventDefault();

        /* TODO
         * Making two URL changes because we have to make sure
         * the "About the event" tab is opened.
         */

        window.location.href = '#about-the-event';

        setTimeout(() => {
            window.location.href = '#venues';
        }, 0);
    }

    generateActionButton(link, label, external = false) {
        let buttonClass,
            hook;

        buttonClass = classnames({
            'button': true,
            'default': true,
            'light': this.props.theme !== 'yellow',
            'inverse': this.props.theme === 'yellow'
        });

        hook = 'tab-action-button';

        if (external) {
            return (<a className={buttonClass} href={link} data-hook={hook} target="_blank">{label}</a>);
        }

        return (<a className={buttonClass} href={link} data-hook={hook}>{label}</a>);
    }

    get actionButton() {
        if (this.props.isPast) {
            return false;
        }

        if (this.props.facingsUrl) {
            return this.generateActionButton(this.props.facingsUrl, 'Get Directions', true);
        } else if (this.props.hasButtonTickets && !this.props.isFree) {
            return this.generateActionButton('#tickets-times', 'Buy Tickets');
        }
    }

    get date() {
        if (this.props.date) {
            return (
                <p className="date">
                    {this.props.isPast ? <span className="past-label">{'Past Event'}</span> : ''}
                    <span>{this.props.date}</span>
                </p>
            );
        }
    }

    get genre() {
        if (this.props.genre) return (<h5 className="genre">{this.props.genre}</h5>);
    }

    get image() {
        if (this.props.hasImageCarousel && this.props.images && this.props.images.length > 1) { // eslint-disable-line no-magic-numbers
            // Limit carousel images
            let images = this.props.images.slice(0, ITEM_LIMIT); // eslint-disable-line no-magic-numbers

            return (
                <div className="images multiple" data-hook="hero-image-carousel">
                    {images.map((image, index) => {
                        return (
                            <img className="image" src={image} alt={this.props.name} key={index}/>
                        );
                    })}
                </div>
            );
        }

        return (
            <picture className="images">
                <source className="image" srcSet={this.props.image.mobile} media="(max-width: 440px)"/>
                <img className="image" src={this.props.image.desktop} alt={this.props.name}/>
            </picture>
        );
    }

    get location() {
        if (this.props.facingsUrl) {
            return (<p className="location"><a href={this.props.facingsUrl} target="_blank">{this.props.location}</a></p>);
        }

        if (this.props.venuesExist) {
            return (
                <p className="location">
                    <a href="#venues" onClick={this.handleVenuesClick}>{this.props.location}</a>
                </p>
            );
        }

        return (<p className="location">{this.props.location}</p>);
    }

    get price() {
        if (this.props.isPast) {
            return (<p className="price">No longer available</p>);
        }

        if (this.props.price) {
            return (<p className="price">{this.props.price}</p>);
        }
    }

    get phone() {
        if (this.props.phone) return (<p className="phone"><a href={`tel:${this.props.phone}`}>{this.props.phone}</a></p>);
    }

    get info() {
        return (
            <div className="information">
                {this.date}
                <h1 className="heading" dangerouslySetInnerHTML={{ __html: wrapHyphens(truncate(this.props.name, TITLE_LIMIT)) }}></h1>
                {this.price}
                {this.location}
                {this.phone}
                {this.genre}
                {this.actionButton}
            </div>
        );
    }

    renderLinkOrSection() {
        if (this.props.hasLink && this.props.url) {
            return (
                <a className="item" href={this.props.url}>
                    {this.image}
                    {this.info}
                </a>
            );
        }

        return (
            <div className="item">
                {this.image}
                {this.info}
            </div>
        );
    }

    render() {
        return (
            <section className="hero" data-theme={this.props.theme}>
                <div className="inner || constrain-width large">
                    {this.renderLinkOrSection()}
                </div>
            </section>
        );
    }
}

Hero.propTypes = {
    hasButtonTickets: React.PropTypes.bool,
    hasImageCarousel: React.PropTypes.bool,
    hasLink: React.PropTypes.bool,
    facingsUrl: React.PropTypes.string,
    date: React.PropTypes.string,
    genre: React.PropTypes.string,
    image: React.PropTypes.object.isRequired,
    images: React.PropTypes.array,
    isFree: React.PropTypes.bool,
    isPast: React.PropTypes.bool,
    location: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
    phone: React.PropTypes.string,
    price: React.PropTypes.string,
    theme: React.PropTypes.string,
    url: React.PropTypes.string,
    venuesExist: React.PropTypes.bool
};

Hero.defaultProps = {
    hasImageCarousel: true,
    hasLink: false,
    isFree: false
};

export default Hero;
