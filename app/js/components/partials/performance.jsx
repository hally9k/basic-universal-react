import classNames from 'classnames';
import moment from 'moment';
import React from 'react';

class Performance extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            bookingLink: this.props.performance.bookingLink,
            date: this.props.performance.date,
            isFree: this.props.isFree,
            isPast: this.props.performance.isPast,
            isSellingFast: this.props.performance.isSellingFast,
            isSoldOut: this.props.performance.isSoldOut,
            priceRange: this.props.performance.priceRange,
            venue: this.props.performance.venue
        };
    }

    get pastEventText() {
        if (this.state.isPast) return (<div className="past-event"><span>No longer available</span></div>);
    }

    get price() {
        if (this.state.isFree) {
            return 'Free';
        }

        return this.state.priceRange;
    }

    get weekDay() {
        return moment(this.state.date.full).format('ddd');
    }

    render() {
        let containerClass = classNames({
            'performance': true,
            'past-performance': this.state.isPast,
            'not-available': this.state.isSoldOut
        });

        return (
            <div className={containerClass}>
                <div className="date">
                    <time dateTime={this.state.date.full}>
                        <span className="month">{this.weekDay}</span>
                        <span>{this.state.date.day}</span>
                        <span className="month">{this.state.date.month}</span>
                    </time>
                </div>

                <div className="details">
                    <time className="time" dateTime={this.state.date.full}>
                        <span>{this.state.date.time}</span>
                    </time>
                    <span className="price">{this.price}</span>
                </div>

                <div className="info">
                    <strong className="heading">{this.state.venue}</strong>
                </div>

                {this.pastEventText}
                {this.renderbutton()}
            </div>
        );
    }

    renderbutton() {
        let bookingLinkLabel = 'Buy Now';

        if (this.state.isPast) {
            return false;
        }

        if (!this.state.bookingLink) {
            return false;
        }

        if (this.state.isFree) {
            bookingLinkLabel = 'Book Now';
        }

        if (this.state.isSoldOut) {
            return (
                <div className="buy">
                    <a className="button primary">Sold out</a>
                </div>
            );
        }

        if (this.state.isSellingFast) {
            return (
                <div className="buy">
                    <a className="button primary || with-label" href={this.state.bookingLink} target="_blank">
                        <small className="label">
                            <svg width="20" height="20" viewBox="0 0 20 20">
                                <use xlinkHref="/assets/images/icon/sprite.svg#selling-fast"></use>
                            </svg>
                            <span>Selling fast</span>
                        </small>
                        <span className="text">{bookingLinkLabel}</span>
                    </a>
                </div>);
        }

        return (
            <div className="buy">
                <a className="button primary" href={this.state.bookingLink} target="_blank">{bookingLinkLabel}</a>
            </div>
        );
    }
}

Performance.propTypes = {
    isFree: React.PropTypes.bool,
    performance: React.PropTypes.object.isRequired
};

Performance.defaultProps = {
    isFree: false
};

export default Performance;
