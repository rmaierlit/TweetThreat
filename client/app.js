import React, {Component} from 'react';
import {render} from 'react-dom';
import LevelList from './LevelList.js';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {user: 'realDonaldTrump', risk: 45, time: '4:20am'};
    }

    render() {
        return (
            <div>
                <p>{`${this.state.risk}% risk of user ${this.state.user} tweeting in the next hour (from ${this.state.time})`}</p>
                <LevelList user={this.state.user} risk={this.state.risk}/>
            </div>
        );
    }
}

render(React.createElement(App), document.getElementById('app'));