import React from 'react';

function Details(props) {
    if (props.latest === null){
        return null;
    }
    return (
        <div className='details'>
            <p>Name: <b>Donald J. Trump</b></p>
            <p>Alias: <b>@realDonaldTrump</b></p>
            <p>Followers: <b>33.4M</b></p>
            <p><b>{props.risk}%</b> risk of tweeting in next hour (as of {props.time})}</p>
            <p>Last Known Tweet: <b>{props.latest.created_at}</b></p>
        </div>
    );
}

export default Details;