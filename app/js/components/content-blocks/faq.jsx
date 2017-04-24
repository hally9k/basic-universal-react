import React from 'react';

class Faq extends React.Component {
    constructor(props) {
        super(props);
    }

    get heading() {
        if (this.props.items.length && this.props.items[0].heading !== '') {
            return (
                <h2>{this.props.items[0].heading}</h2>
            );
        }

        return null;
    }

    render() {
        return (
            <section className="section || content-block">
                <div className="constrain-width">

                    {this.heading}

                    <div className="accordion">
                        {this.props.items.map((item, index) => {
                            let className = 'item';

                            if (this.props.open === true && index === 0) { // eslint-disable-line no-magic-numbers
                                className += ' is-active';
                            }

                            return (
                                <div key={index} className={className} data-hook="accordion">
                                    <h4 className="heading">
                                        <span className="title-text">{item.title}</span>
                                        <svg width="17" height="12"><use xlinkHref="/assets/images/ui-icons.svg#chevron"></use></svg>
                                    </h4>
                                    <div className="content" dangerouslySetInnerHTML={{ __html:item.content }}></div>
                                </div>
                            );
                        })}
                    </div>

                </div>
            </section>
        );
    }
}

Faq.propTypes = {
    items: React.PropTypes.array.isRequired,
    open: React.PropTypes.bool
};

export default Faq;
