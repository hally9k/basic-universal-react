import Grid from '../grid/grid';
import React from 'react';

class ContentSet extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.data.length) {
            /*
             * Detecting if this is the "What's new" content set.
             * TODO: add the isNews flag to the content set configuration in the database and expose it in the API output
             * OR keep detecting if this is the "What's new" content set but also make sure we are on the home page
             */
            let { isNews } = this.props;

            if (this.props.title === 'What\'s new') {
                isNews = true;
            }

            return (
                <section className="section contentset">
                    <Grid content={this.props.data} heading={this.props.title} isLarge={this.props.isLarge} isNews={isNews}/>
                    { this.renderCallToAction() }
                </section>
            );
        }

        return null;
    }

    renderCallToAction() {
        const { cta } = this.props;

        if (cta.query === undefined) {
            return null;
        }

        let query = cta.query,
            url;

        /*
         * At the moment there's only one scenario where there are call to actions, should we need to expand this
         * the below url mounting logic has to be replaced for something more generic
         */
        url = `/search/events?genre=${query.genre}&venue=${query.venue}&date=${query.date}`;

        return (
            <a href={ url } className="button primary dynamic-eventset">{ cta.label }</a>
        );
    }
}

ContentSet.propTypes = {
    cta: React.PropTypes.object,
    data: React.PropTypes.array.isRequired,
    isLarge: React.PropTypes.bool,
    isNews: React.PropTypes.bool,
    title: React.PropTypes.string.isRequired
};

ContentSet.defaultProps = {
    isLarge: false,
    isNews: false
};

export default ContentSet;
