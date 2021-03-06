var routes = require('express').Router();
var Maria = require('mariasql');
var TweetGetter = require('../twitter/twitterApi.js');
var worker = new TweetGetter();

var m = Maria({
        host: 'localHost',
        user: 'root',
        db: 'tweetThreat'
});

routes.get('/realDonaldTrump/risk', function(req, res) {
    const daysFromFirstTweetQuery = 
    `SELECT DATEDIFF(UTC_DATE, date(date_time)) as total_days FROM tweets ORDER BY tweet_id LIMIT 1`;

    const atLeastOneTweetByHourQuery = 
    `SELECT hour, COUNT(*) AS quantity FROM 
    (SELECT DISTINCT HOUR(date_time) AS hour, DATE(date_time) AS date FROM tweets) AS distinct_hour_and_day
    GROUP BY hour`;

    const nearNowQuery = 
    `SELECT count(distinct DATE(date_time)) as quantity FROM tweets 
    where ABS(TIME_TO_SEC(TIMEDIFF(TIME(:iso), TIME(date_time)))) < 30 * 60`

    m.query(daysFromFirstTweetQuery, null, (error, rows) => {
        let totalDays = parseInt(rows[0].total_days);
        let now = new Date();
        if (req.query.hour){
            now.setUTCHours(req.query.hour);
        }
        let iso = now.toISOString();
        m.query(nearNowQuery, {iso}, (error, rows) => {  
            let daysWhenTweetedNearNow = rows[0].quantity
            let risk = daysWhenTweetedNearNow / totalDays;          
            let percentRisk = Math.round(risk * 10000) /100;
            res.json({risk: percentRisk, time: now.toLocaleTimeString()});
        });
    });
});

routes.get('/realDonaldTrump/latestTweet', function (req, res) {
    worker.getLatestTweet(info => res.json(JSON.parse(info)[0]) );
});

module.exports = routes;