import React from 'react';
import Tweet from 'react-tweet-embed';

function LatestTweet(props) {
    if (props.data === null) {
        return null;
    } else {
        return (
            <Tweet id={props.data.id_str} options={{cards:'hidden', conversation:'none'}} />
        );
    }
}

export default LatestTweet;