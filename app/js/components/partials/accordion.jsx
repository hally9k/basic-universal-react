import React from 'react';

class Accordion extends React.Component {
    constructor(props) {
        super(props);
    }

    information(group) {
        if (group.content) return (<div className="information" dangerouslySetInnerHTML={{ __html: group.content }}></div>);
    }

    renderSections(sections) {
        return (
            <table className="ticket-prices">
                <tbody>
                    {sections.map((section, index) => {
                        return (
                            <tr key={index}>
                                <td>
                                    <h5 className="heading">{section.title}</h5>
                                    <div className="blurb" dangerouslySetInnerHTML={{ __html:section.description }}></div>
                                </td>
                                <td className="price">{section.price}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        );
    }

    render() {
        return (
            <div className="accordion">
                {Array.prototype.slice.call(this.props.items).map((group, index) => {
                    let className = 'item';

                    if (this.props.open === true && index === 0) { // eslint-disable-line no-magic-numbers
                        className += ' is-active';
                    }

                    return (
                        <div key={index} className={className} data-hook="accordion">
                            <h4 className="heading">
                                <span>{group.title}</span>
                                <svg width="17" height="12"><use xlinkHref="/assets/images/ui-icons.svg#chevron"></use></svg>
                            </h4>
                            {this.information(group)}
                            <div className="content">
                                {this.renderSections(group.sections)}
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }
}

Accordion.propTypes = {
    open: React.PropTypes.bool,
    items: React.PropTypes.array.isRequired
};

export default Accordion;
