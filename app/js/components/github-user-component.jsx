import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Root extends Component {

    getUser() {
        this.props.getGitHubUser(this.textInput.value);
    }

    render() {
        const { error, user } = this.props;
        return (
            <div>
                <label>GitHub User: <input ref={(input) => { this.textInput = input; }} /></label>
                <button onClick={this.getUser.bind(this)}>Get User</button>
                { user &&
                    <div className="github-user">
                        <img src={user.avatar_url} />
                        <h2>{user.login}</h2>
                        <h4>ID: {user.id}</h4>
                    </div>
                }
                { error &&
                    <div className="github-error" style={{ width: 200, textAlign: 'center' }}>
                        <h1 style={{ fontSize: '7em' }}>😢</h1>
                        <h2 className="error-message">{error.message}</h2>
                    </div>
                }
            </div>
        );
    }
}

Root.propTypes = {
    getGitHubUser: PropTypes.func.isRequired,
    user: PropTypes.object,
    error: PropTypes.object
};

export default Root;
