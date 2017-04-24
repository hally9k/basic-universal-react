// import Banner from '../components/partials/banner.jsx';
import canUseDom from '../utilities/dom';
import ContentBlocks from '../components/content-blocks/content-blocks.jsx';
import PropTypes from 'prop-types';
import React from 'react';

class ContentPage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        if (canUseDom() && !this.props.pageobject) {
            this.props.fetchPage('otter');
        }
    }
    //
    // get hero() {
    //     if (this.state.hero) return (<Banner image={this.state.hero} name={this.state.name}/>);
    // }

    render() {
        const { blocks } = this.props.pageobject.attributes;
        return (
            <main className="main" role="main">
                {/* {this.hero} */}
                <ContentBlocks data={blocks} />
            </main>
        );
    }
}

ContentPage.propTypes = {
    fetchPage: PropTypes.func.isRequired,
    pageobject:  PropTypes.object.isRequired
};

export default ContentPage;
