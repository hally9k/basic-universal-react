import React from 'react';

class Video extends React.Component {
    constructor(props) {
        super(props);

        // Get the video ID from the url
        let id = this.props.data.video_url.replace(/.+\/?v(?:=|\/)([^&]+)/gi, '$1');

        // Build the embed url with the new
        this.props.data.videoUrl = `https://www.youtube.com/embed/${id}?rel=0&controls=0&showinfo=0`;
    }

    get credit() {
        if (this.props.data.credit) return (<h6 className="credit">{this.props.data.credit}</h6>);
    }

    get title() {
        if (this.props.data.title) return (<h5 className="title">{this.props.data.title}</h5>);
    }

    render() {
        if (!this.props.data.video_url) {
            return null;
        }

        let videoClass = `section || video theme-${this.props.data.theme_colour}`;

        return (
            <section className={videoClass}>
                <div className="constrain-width medium || inner">
                    <div className="meta">
                        {this.title}
                        {this.credit}
                    </div>
                    <iframe className="player" src={this.props.data.videoUrl} allowFullScreen></iframe>
                </div>
            </section>
        );
    }
}

Video.propTypes = {
    data: React.PropTypes.object.isRequired,
    type: React.PropTypes.string.isRequired
};

export default Video;
