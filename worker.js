var tracker = new Array(24).fill(0); //will track number of tweets posted during each hour in day

var error = function (err, response, body) {
    	console.log('ERROR:', err);
	};
var success = function (data) {
    addTimes( JSON.parse(data), tracker);
	console.log(tracker);
};

var addTimes = function (tweets, tracker) {
	tweets.forEach( (tweet) => tracker[timeFromTweet(tweet)]++);
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

twitter.getUserTimeline({ screen_name: 'realDonaldTrump', count: '1000'}, error, success);