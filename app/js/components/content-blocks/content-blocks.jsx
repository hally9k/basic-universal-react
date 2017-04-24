import ContentSet from './contentset';
import Faq from './faq';
import FileDownload from './file-download';
import Gallery from './gallery';
import HeroImageGallery from './hero-image-gallery';
import PagebreakQuote from './pagebreak-quote';
import React from 'react';
import TextContent from './text';
import Video from './video';

class ContentBlocks extends React.Component {
    constructor(props) {
        super(props);
    }

    /**
     * Map block data types to a block compoenent
     *
     * @param  {object} data Block data
     *
     * @return {Reat.Component}
     */
    renderBlock(data, index) {
        switch (data.type) {
            case 'heroimagegallery':
                return <HeroImageGallery key={index} {...data}/>;
            case 'video':
                return <Video key={index} {...data}/>;
            case 'contentset':
                return <ContentSet key={index} isLarge={this.props.isLarge} isNews={this.props.isNews} {...data} />;
            case 'gallery':
                return <Gallery key={index} {...data}/>;
            case 'faq':
                return <Faq key={index} items={data.data}/>;
            case 'pagebreakquote':
                return <PagebreakQuote key={index} {...data.data}/>;
            case 'file':
                return <FileDownload key={index} { ...data.data } />;
            case 'content':
            case 'contentaside':
            case 'contentquote':
                return <TextContent key={index} {...data}/>;
            default:
                return null;
        }
    }

    render() { // TODO: Refactor this whole class
        if (this.props.data.length) {
            return (
                <article>
                    {this.props.data.map((data, index) => {
                        return this.renderBlock(data, index);
                    })}
                </article>
            );
        }

        return null;
    }
}

ContentBlocks.propTypes = {
    data: React.PropTypes.array.isRequired,
    isLarge: React.PropTypes.bool,
    isNews: React.PropTypes.bool
};

ContentBlocks.defaultProps = {
    isLarge: false,
    isNews: false
};

export default ContentBlocks;
