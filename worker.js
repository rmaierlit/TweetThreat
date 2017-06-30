var Maria = require ('mariasql');
var m = Maria({
        host: 'localHost',
        user: 'root',
        db: 'tweetThreat'
});


var Twitter = require('twitter-node-client').Twitter;

var config = {
    "consumerKey": "gOpaxDx9KB7EHhucQbpICHTYK",
	"consumerSecret": "QuDGs1ogoEAF2O4T9Wf4vtMOVQuMo4ZFvy8ub4Wh6F38qgRIAG",
	"accessToken": "2577156107-Cis4tS6o9IyN5I9VHjzNs5PPrEtv7Fy2tyV6xPx",
	"accessTokenSecret": "OMiOdz5Vzl0py33y9inu6cwTxVMoL1o4AagqFN4pUwJLd"
};

var twitter = new Twitter(config);

var error = function (err) {
	if (err){
    	console.log('ERROR:', err);
	}
};

var TweetGetter = function(sinceId) {
	this.sinceId = sinceId;
	this.maxId = null;
	this.latest = null;
}

TweetGetter.prototype.addTimes = function (data) {
	var tweets = JSON.parse(data);

	if (tweets.length === 0 ){
		m.end();
		return;
	}

	if (this.latest === null){
		this.latest = tweets[0].id;
		m.query('UPDATE users SET most_recent_tracked_tweet = :latest where screen_name = "realDonaldTrump"', {latest: this.latest}, error);
	}

	//for each tweet in the array, insert tweet.id and tweet.created_at into the tweets table
	tweets.forEach( (tweet) => {
		let id = tweet.id;
		let date = new Date(tweet.created_at);
		date = date.toISOString();
		m.query('INSERT IGNORE INTO tweets (tweet_id, date_time) VALUES (:id, :date)', {id, date}, error);
	});

	//get the next page of tweets after this one
	this.maxId = tweets[tweets.length - 1].id;
	this.getTimes();
};

TweetGetter.prototype.getTimes = function () {
	let options = { 
		screen_name: 'realDonaldTrump',
		count: '200',
		trim_user: true
	};
	
	if (this.maxId){
		options.max_id = this.maxId;
	}

	options.since_id = this.sinceId;
	
	twitter.getUserTimeline(options, error, this.addTimes.bind(this));
};

m.query('SELECT most_recent_tracked_tweet from users where screen_name = "realDonaldTrump"', null, function(error, success){
	if (error){
		console.log(error);
	} else {
		let sinceId = success[0].most_recent_tracked_tweet;
		let worker = new TweetGetter(sinceId);
		worker.getTimes();
	}
});