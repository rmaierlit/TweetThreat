import React, {Component} from 'react';
import {render} from 'react-dom';
import axios from 'axios';
import LatestTweet from './LatestTweet.js';
import LevelList from './LevelList.js';
import Details from './Details.js';

const tweetsByHour = [97, 84, 99, 68, 39, 12, 10, 3, 0, 10, 54, 107, 151, 143, 99, 78, 80, 96, 87, 92, 110, 138, 121, 109]
const totalDays = 410;

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {user: 'realDonaldTrump', risk: null, time: null, latest: null};
    }

    getRisk() {
        let now = new Date();
        let hour = parseInt(now.getUTCHours());
        let minute = parseInt(now.getUTCMinutes());
        let currentHourRisk = tweetsByHour[hour]/ totalDays;
        let nextHourRisk = tweetsByHour[ (hour + 1) % 24] / totalDays;
        let estimatedRisk = (currentHourRisk * (60 - minute) / 60) + (nextHourRisk * minute / 60);
        let percentRisk = Math.round(estimatedRisk * 100);

        this.setState({risk: percentRisk, time: now.toLocaleTimeString()});
    }

    getLatestTweet() {
        axios.get(`api/${this.state.user}/latestTweet`)
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