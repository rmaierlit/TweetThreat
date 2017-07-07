import React from 'react';
import Level from './Level.js';

function LevelList(props) {
    const threatLevels = [
        {color: 'red', threatName: 'SEVERE', descriptor: 'Severe'},
        {color: 'orange', threatName: 'HIGH', descriptor: 'High'},
        {color: 'yellow', threatName: 'ELEVATED', descriptor: 'Significant'},
        {color: 'blue', threatName: 'GUARDED', descriptor: 'General'},
        {color: 'green', threatName: 'LOW', descriptor: 'Low'}
    ]
    const classes = props.risk === null? 'threat-level-list hidden': 'threat-level-list';

    const levelComponents = threatLevels.map((level, index, array) => (
        <Level key={index}
               risk={props.risk} 
               color={level.color}
               threatName={level.threatName}
               description={`${level.descriptor} risk of @${props.user} tweets`}
               min={32 - index*8} /* categories are 0-7, 8-15, 16-23, 24-31, and 32+ */
               max={index === 0? null: 32 - (index-1)*8} /* first threat category is uncapped for maximum hysteria */
        />
    ));

    return (
        <div className={classes}>{levelComponents}</div>
    );
};

export default LevelList;