import * as APP from '../../config/app';
import React from 'react';

class Share extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="share || ssk-group" data-hook="share-dialog">
                <div className="links">
                    <a className="icon || ssk ssk-twitter" tabIndex="-1" href={`https://twitter.com/intent/tweet/?text=${this.props.subject}&url=${this.props.url}&via=${APP.TWITTER_USER.replace('@', '')}`} target="_blank">
                        <svg width="20" height="19"><use xlinkHref="/assets/images/social-icons.svg#twitter"></use></svg>
                    </a>

                    <a className="icon || ssk ssk-facebook" tabIndex="-1" href={`https://facebook.com/dialog/share?app_id=${APP.FACEBOOK_APP_ID}&display=popup&href=${this.props.url}`} target="_blank">
                        <svg width="10" height="19"><use xlinkHref="/assets/images/social-icons.svg#facebook-alt"></use></svg>
                    </a>

                    <a className="icon || ssk ssk-pinterest" tabIndex="-1" href={`https://pinterest.com/pin/create/button/?url=${this.props.url}&description=${this.props.subject}&media=${this.props.media}`} target="_blank">
                        <svg width="15" height="18"><use xlinkHref="/assets/images/social-icons.svg#pinterest"></use></svg>
                    </a>

                    <a className="icon || ssk ssk-tumbler" tabIndex="-1" href={`https://www.tumblr.com/widgets/share/tool?posttype=link&canonicalUrl=${this.props.url}&title=${this.props.subject}&caption=&content=&shareSource=${APP.TUMBLR_USER}`} target="_blank">
                        <svg width="12" height="18"><use xlinkHref="/assets/images/social-icons.svg#tumbler"></use></svg>
                    </a>

                    <a className="icon" tabIndex="-1" href={`mailto:?subject=${this.props.subject}&body=${this.props.text}%0A%0A${this.props.name}%0A%0A${this.props.url}`}>
                        <svg width="20" height="13"><use xlinkHref="/assets/images/social-icons.svg#email"></use></svg>
                    </a>
                </div>

                <span className="toggle" role="button">
                    <svg className="icon" width="13" height="14"><use xlinkHref="/assets/images/ui-icons.svg#share"></use></svg>
                    <span>Share</span>
                </span>
            </div>
        );
    }
}

Share.propTypes = {
    name: React.PropTypes.string.isRequired,
    media: React.PropTypes.string.isRequired,
    subject: React.PropTypes.string.isRequired,
    text: React.PropTypes.string.isRequired,
    url: React.PropTypes.string.isRequired
};

export default Share;
