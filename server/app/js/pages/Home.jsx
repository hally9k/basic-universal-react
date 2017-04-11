import React from 'react';

class Home extends React.Component {
    render() {
        return (<div>
                    <h1>Serverside Home</h1>
                    <div id="root"></div>
                    <script src="app.js"></script>
                </div>);
    }
}

export default Home;
