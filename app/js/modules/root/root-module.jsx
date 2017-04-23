import GitHubUser from '../../components/github-user-component';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

class Root extends Component {

    render() {
        return (
            <div>
                <GitHubUser
                    user={this.props.user}
                    error={this.props.error}
                    getGitHubUser={this.props.getGitHubUser} />
            </div>
        );
    }
}

Root.propTypes = {
    location: PropTypes.object,
    history: PropTypes.object,
    user: PropTypes.object,
    error: PropTypes.object,
    getGitHubUser: PropTypes.func.isRequired
};

export default Root;
