import React from 'react';

class PagebreakQuote extends React.Component {
    constructor(props) {
        super(props);
    }

    get citation() {
        if (this.props.cite) return (<cite>{this.props.cite}</cite>);
    }

    render() {
        let className = `pagebreak-quote ${this.props.theme}`,
            style = {
                backgroundImage: `url(${this.props.file})`
            };

        if (this.props.quote) {
            return (
                <section className="section">
                    <div className="constrain-width">

                        <div className={className} style={style}>
                            <div className="inner">
                                <blockquote>
                                    <svg className="open" width="56" height="48"><use xlinkHref="/assets/images/ui-icons.svg#quote-marks"></use></svg>
                                    <span>{this.props.quote}</span>
                                    <svg className="close" width="56" height="48"><use xlinkHref="/assets/images/ui-icons.svg#quote-marks"></use></svg>
                                </blockquote>
                                {this.citation}
                            </div>
                        </div>

                    </div>
                </section>
            );
        }

        return null;
    }
}

PagebreakQuote.propTypes = {
    cite: React.PropTypes.string.isRequired,
    file: React.PropTypes.string.isRequired,
    quote: React.PropTypes.string.isRequired,
    theme: React.PropTypes.string.isRequired
};

PagebreakQuote.defaultProps = {
    theme: 'blue'
};

export default PagebreakQuote;
