var routes = require('express').Router();
var Maria = require('mariasql');

var m = Maria({
        host: 'localHost',
        user: 'root',
        db: 'tweetThreat'
});

routes.get('/realDonaldTrump', function(req, res) {
    const daysFromFirstTweetQuery = 
    `SELECT DATEDIFF(UTC_DATE, date(date_time)) as total_days FROM tweets ORDER BY tweet_id LIMIT 1`;

    const atLeastOneTweetByHourQuery = 
    `SELECT hour, COUNT(*) AS quantity FROM 
    (SELECT DISTINCT HOUR(date_time) AS hour, DATE(date_time) AS date FROM tweets) AS distinct_hour_and_day
    GROUP BY hour`;

    m.query(daysFromFirstTweetQuery, null, (error, rows) => {
        var days = parseInt(rows[0].total_days);
        console.log(days);
        m.query(atLeastOneTweetByHourQuery, null, (error, rows) => {  
            let threatByHour = Array(24).fill(0);
            rows.forEach( (row) => threatByHour[row.hour] = parseInt(row.quantity) / days);

            console.log(rows);
            console.log(threatByHour);

            let now = new Date();

            // use ?hour=23 (or any other hour) to test for different times of day
            var hour = parseInt(now.getUTCHours());
            if (req.query.hour){
                hour=parseInt(req.query.hour);
            }
            console.log('hour: ', hour);

            let minutes = parseInt(now.getUTCMinutes());


            //derive the approximate threat of a new tweet in the next 60 minutes
            let currentHourThreat = threatByHour[hour];
            let nextHourThreat = threatByHour[(hour + 1) % 24];
            console.log(currentHourThreat, nextHourThreat);
            let currentHourIncluded = (60 - minutes) / 60;
            let nextHourIncluded = minutes / 60;
            let rightNowThreat = ( currentHourThreat * currentHourIncluded ) + (nextHourThreat * nextHourIncluded);
            
            let percentRisk = Math.round(rightNowThreat * 10000) /100;
            res.send(`${percentRisk}% risk of this user tweeting in the next hour`);
        });
    });
})

module.exports = routes;