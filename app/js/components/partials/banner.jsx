import React from 'react';

class Banner extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <section className="banner">
                <img className="image" src={this.props.image} alt={this.props.name}/>
            </section>
        );
    }
}

Banner.propTypes = {
    image: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired
};

export default Banner;
