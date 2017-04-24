import React, { Component } from 'react';

class Gallery extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div data-hook="image-gallery" data-images={JSON.stringify(this.props.data)}></div>
        );
    }
}

Gallery.propTypes = {
    data: React.PropTypes.array.isRequired
};

export default Gallery;
