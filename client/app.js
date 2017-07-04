import React, {Component} from 'react';
import {render} from 'react-dom';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {user: 'realDonaldTrump', risk: null};
    }

    render() {
        return (
            <p>lolwut</p>
        );
    }
}

render(React.createElement(App), document.getElementById('app'));