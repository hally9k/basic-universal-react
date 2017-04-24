import React from 'react';

class VenueBlock extends React.Component {
    constructor(props) {
        super(props);
    }

    renderVirtualTourBlock() {
        let venue = this.props.venue;

        if (venue.tourLink) {
            return (
                <a className="block" href={venue.tourLink}>
                    <h5 className="link-label">Take a Virtual Tour</h5>
                    <img className="image" src="/assets/images/show/background-virtual-tours.jpg" alt="Rows of cinema seating"/>
                </a>
            );
        }

        return null;
    }

    render() {
        let venue = this.props.venue,
            venueMapImage;

        venueMapImage = {
            backgroundImage: `url(${venue.map})`
        };

        return (
            <section className="section">
                <div className="constrain-width">
                    <div className="venue-blocks">
                        <a className="block text" href={venue.url}>
                            <h5 className="pre-heading">On at</h5>
                            <h4 className="title">{venue.name}</h4>
                            <p className="address">{venue.location.raw}</p>
                        </a>

                        <a className="block" href={venue.facingsUrl} style={venueMapImage} target="_blank">
                            <h5 className="link-label">Get Directions</h5>
                        </a>

                        {this.renderVirtualTourBlock()}
                    </div>
                </div>
            </section>
        );
    }
}

VenueBlock.propTypes = {
    venue: React.PropTypes.object.isRequired
};

export default VenueBlock;
