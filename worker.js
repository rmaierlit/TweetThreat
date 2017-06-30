var tracker = new Array(24).fill(0); //will track number of tweets posted during each hour in day

var error = function (err, response, body) {
    	console.log('ERROR:', err);
	};
var success = function (data) {
    addTimes( JSON.parse(data), tracker);
	console.log(tracker);
};

var addTimes = function (tweets, tracker) {
	if (tweets.length === 0 ){
		return;
	}
	let lastId = tweets[tweets.length - 1].id;
	console.log(tweets[tweets.length - 1]);
	tweets.forEach( (tweet) => tracker[timeFromTweet(tweet)]++);

	getTimes(lastId);
}

var timeFromTweet = function (tweet) {
	let date = new Date(tweet.created_at);
	return date.getHours();
}

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
					count: '100',
					trim_user: true,
					since_id: 822421390125043713}
	
	if (maxId !== undefined){
		options.max_id = maxId;
	}
	
	twitter.getUserTimeline(options, error, success);
}

getTimes();