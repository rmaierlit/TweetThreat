var Maria = require ('mariasql');
var m = Maria({
        host: 'localHost',
        user: 'root',
        db: 'tweetThreat'
});

//var tracker = new Array(24).fill(0); //will track number of tweets posted during each hour in day

var error = function (err, response, body) {
    	console.log('ERROR:', err);
	};
var success = function (data) {
    addTimes( JSON.parse(data) );
};

var addTimes = function (tweets) {
	if (tweets.length === 0 ){
		return;
	}

	//for each tweet in the array, insert tweet.id and tweet.created_at into the tweets table
	tweets.forEach( (tweet) => {
		let id = tweet.id;
		let date = new Date(tweet.created_at);
		date = date.toISOString();
		m.query('INSERT INTO tweets (tweet_id, date_time) VALUES (:id, :date)', {id, date}, function (error, sucess){
			if (error){
				console.log(error, date)
			}
		});
	});

	//get the next page of tweets after this one
	let lastId = tweets[tweets.length - 1].id;
	getTimes(lastId);
}

// var dateFromTweet = function (tweet) {
// 	let date = new Date(tweet.created_at);
// 	return date;
// }

var Twitter = require('twitter-node-client').Twitter;

var config = {
    	"consumerKey": "gOpaxDx9KB7EHhucQbpICHTYK",
    	"consumerSecret": "QuDGs1ogoEAF2O4T9Wf4vtMOVQuMo4ZFvy8ub4Wh6F38qgRIAG",
    	"accessToken": "2577156107-Cis4tS6o9IyN5I9VHjzNs5PPrEtv7Fy2tyV6xPx",
    	"accessTokenSecret": "OMiOdz5Vzl0py33y9inu6cwTxVMoL1o4AagqFN4pUwJLd",
    }

var twitter = new Twitter(config);

var getTimes = function (maxId) {
	let options = { screen_name: 'realDonaldTrump',
					count: '200',
					trim_user: true,
					since_id: 822421390125043713}
	
	if (maxId !== undefined){
		options.max_id = maxId;
	}
	
	twitter.getUserTimeline(options, error, success);
}

getTimes();