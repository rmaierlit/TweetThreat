var error = function (err, response, body) {
    	console.log('ERROR [%s]', err);
	};
var success = function (data) {
    addTimes( JSON.parse(data) );
};

var addTimes = function (tweets) {
	tweets.forEach( (tweet) => console.log(tweet.created_at) );
}

var Twitter = require('twitter-node-client').Twitter;

var config = {
    	"consumerKey": "gOpaxDx9KB7EHhucQbpICHTYK",
    	"consumerSecret": "QuDGs1ogoEAF2O4T9Wf4vtMOVQuMo4ZFvy8ub4Wh6F38qgRIAG",
    	"accessToken": "2577156107-Cis4tS6o9IyN5I9VHjzNs5PPrEtv7Fy2tyV6xPx",
    	"accessTokenSecret": "OMiOdz5Vzl0py33y9inu6cwTxVMoL1o4AagqFN4pUwJLd",
    }

var twitter = new Twitter(config);

twitter.getUserTimeline({ screen_name: 'realDonaldTrump', count: '10'}, error, success);