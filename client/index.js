import React from 'react';
import ReactDOM from 'react-dom';

class ClientApp extends React.Component{
    render() {
        return <h1>Clientside app</h1>;
    }
}

ReactDOM.render(<ClientApp />, document.getElementById('root'));
