import React from 'react';

function Details(props) {
    console.log(props.latest);
    return (
        <div className='details'>
            <p>Name: Donald J. Trump</p>
            <p>Alias: @realDonaldTrump</p>
            <p>Followers: 33.4M</p>
            <p>{`${props.risk}% risk of tweeting in next hour (as of ${props.time})`}</p>
            <p>{`Last Known Tweet: ${props.latest? props.latest.created_at: 'Acquiring...'}`}</p>
        </div>
    );
}

export default Details;