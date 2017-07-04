import React from 'react';

function Level(props) {
    var big = '';
    if (props.min === null || props.risk >= props.min){
        if (props.max === null || props.risk < props.min){
            big = 'big';
        }
    }

    const levelClasses = [big, props.color, 'threat-level'].join(' ');

    return(
        <div className={levelClasses}>
            <h1>{props.threatName}</h1>
            <h4>{props.description}</h4>
        </div>
    );
}

export default Level;

