import React, {Component} from 'react';
import {render} from 'react-dom';
import LevelList from './LevelList.js';
import axios from 'axios';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {user: 'realDonaldTrump', risk: 25, time: '4:20am'};
    }

    componentWillMount() {
        axios.get(`http://localhost:2525/api/${this.state.user}`)
            .then( res => this.setState(res.data));
    }

    render() {
        return (
            <div className='display'>
                <div className='title'>Tweet Threat Advisory System</div>
                <div className='wrapper'>
                    <LevelList user={this.state.user} risk={this.state.risk}/>
                    <div className='profile'>
                        <img className='portrait' src='https://pbs.twimg.com/profile_images/874276197357596672/kUuht00m_400x400.jpg' />
                        <div className='details'>
                            <p>{`${this.state.risk}% risk of user @${this.state.user} tweeting in the next hour (as of ${this.state.time})`}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

render(React.createElement(App), document.getElementById('app'));