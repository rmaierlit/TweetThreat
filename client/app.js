import React, {Component} from 'react';
import {render} from 'react-dom';
import LevelList from './LevelList.js';
import axios from 'axios';
import Details from './Details.js';
import LatestTweet from './LatestTweet.js';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {user: 'realDonaldTrump', risk: null, time: null, latest: null};
    }

    getRisk() {
        axios.get(`http://localhost:2525/api/${this.state.user}/risk`)
            .then( res => this.setState(res.data));
    }

    getLatestTweet() {
        axios.get(`http://localhost:2525/api/${this.state.user}/latestTweet`)
            .then( res => this.setState({latest: res.data}) );
    }

    componentWillMount() {
        this.getRisk();
        this.getLatestTweet();
    }

    render() {
        return (
            <div className='display'>
                <div className='title'>Tweet Threat Advisory System</div>
                <div className='wrapper'>
                    <div className='profile'>
                        <div className='overview'>
                            <img className='portrait' src='https://pbs.twimg.com/profile_images/874276197357596672/kUuht00m_400x400.jpg' />
                            <Details risk={this.state.risk} 
                                 time={this.state.time}
                                 latest={this.state.latest} />
                        </div>
                        <LatestTweet data={this.state.latest} />
                    </div>
                    <LevelList user={this.state.user} risk={this.state.risk}/>
                </div>
            </div>
        );
    }
}

render(React.createElement(App), document.getElementById('app'));