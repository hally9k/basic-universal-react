import React from 'react';

class HeroImageGallery extends React.Component {
    constructor(props) {
        super(props);
    }

    renderImages() {
        if (this.props.data.length) {
            return this.props.data.map((data, index) => {
                return (<img key={index} src={data.file} />);
            });
        }
    }

    render() {
        return (
            <section className="section">
                {this.renderImages()}
            </section>
        );
    }
}

HeroImageGallery.propTypes = {
    data: React.PropTypes.array.isRequired,
    type: React.PropTypes.string.isRequired
};

export default HeroImageGallery;
