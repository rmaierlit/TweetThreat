import React from 'react';

function Level(props) {
    var big = '';
    if (props.min === null || props.risk >= props.min){
        if (props.max === null || props.risk < props.max){
            big = 'big';
        }
    }

    const levelClasses = [big, props.color, 'threat-level'].join(' ');

    return(
        <div className={levelClasses}>
            <div>
                <h1>{props.threatName}</h1>
            </div>
            <div>
                <h4>{props.description}</h4>
            </div>
        </div>
    );
}

export default Level;

