import React from 'react';

class TextContent extends React.Component {
    constructor(props) {
        super(props);
    }

    get aside() {
        if (this.props.data.aside) {
            return (
                <aside className="aside">
                    <div className="callout" dangerouslySetInnerHTML={{ __html: this.props.data.aside }}></div>
                </aside>
            );
        }
    }

    get citation() {
        if (this.props.data.citation) return (<cite>{this.props.data.citation}</cite>);
    }

    get quote() {
        if (this.props.data.quote) {
            return (
                <aside className="aside">
                    <blockquote dangerouslySetInnerHTML={{ __html: this.props.data.quote }}></blockquote>
                    {this.citation}
                </aside>
            );
        }
    }

    render() {
        if (this.props.data.content) {
            return (
                <section className="section || content-block">
                    <div className="constrain-width">
                        <div className="columns">
                            <div className="primary" dangerouslySetInnerHTML={{ __html:this.props.data.content }}></div>
                            {this.aside}
                            {this.quote}
                        </div>
                    </div>
                </section>
            );
        }

        return null;
    }
}

TextContent.propTypes = {
    data: React.PropTypes.object.isRequired,
    type: React.PropTypes.string.isRequired
};

export default TextContent;
