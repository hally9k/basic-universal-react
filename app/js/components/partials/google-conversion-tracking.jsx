import React, { Component } from 'react';

class GoogleConversionTracking extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.trackId) {
            let markup = {
                __html: `<script type="text/javascript">
                    /* <![CDATA[ */
                    var google_conversion_id = ${this.props.trackId};
                    var google_conversion_language = "en";
                    var google_conversion_format = "3";
                    var google_conversion_color = "ffffff";
                    var google_conversion_label = "6Tz9CNrVgGIQx8-L0QM";
                    var google_remarketing_only = false;
                    /* ]]> */
                </script>
                <script type="text/javascript" src="//www.googleadservices.com/pagead/conversion.js"></script>
                <noscript>
                    <div style="display:inline;">
                        <img height="1" width="1" style="border-style:none;" alt="" src="//www.googleadservices.com/pagead/conversion/975366087/?value=187.00&…"/>
                    </div>
                </noscript>
                </div>`
            };

            return <div dangerouslySetInnerHTML={ markup } />;
        }

        return null;
    }
}

GoogleConversionTracking.propTypes = {
    trackId: React.PropTypes.string
};

export default GoogleConversionTracking;
