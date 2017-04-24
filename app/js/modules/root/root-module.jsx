import canUseDom from '../../utilities/dom';
import GitHubUser from '../../components/github-user-component';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

class Root extends Component {

    componentWillMount() {
        if (canUseDom()) {
            this.props.fetchPage('otter');
        }
    }

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
    fetchPage: PropTypes.func.isRequired,
    getGitHubUser: PropTypes.func.isRequired
};

export default Root;
