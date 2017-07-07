import React from 'react';
import Tweet from 'react-tweet';

function LatestTweet(props) {
    if (props.data === null) {
        return null;
    } else {
        return (
            <Tweet data={props.data} />
        );
    }
}

export default LatestTweet;