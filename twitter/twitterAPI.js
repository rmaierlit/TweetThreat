/*var Maria = require ('mariasql');
var maria = Maria({
        host: '127.0.0.1',
        user: 'root',
        db: 'tweetThreat'
});*/

var Twitter = require('twitter-node-client').Twitter;

//create a file with your own twitter api key to run this project yourself
var config = require('./twitter.secret.js');

var twitter = new Twitter(config);

var TweetGetter = function() {
	this.twitter = twitter;
	//this.m = maria;
	this.sinceId = null;
	this.maxId = null;
	this.latest = null;

	//bind any functions that will be passed as callbacks so that reference to the value 'this' is not lost
	this.addTimes = this.addTimes.bind(this); 
	this.addSingleTime = this.addSingleTime.bind(this);
}

//generic error logging function
var error = function (err) {
	if (err){
    	console.log('ERROR:', err);
	}
};

/*TweetGetter.prototype.addTimes = function (data) {
	var tweets = JSON.parse(data);

	//abort if api call repsonds with no tweets
	if (tweets.length === 0){
		this.m.end();
		return;
	}

	let lastTweetId = tweets[tweets.length - 1].id.toString();

	//abort if api call responds a single tweet which was already processed
	if (tweets.length === 1 && lastTweetId === this.maxId){
		this.m.end();
		return;
	}

	//if this is the first batch, update the most recent tracked tweet id for this user
	if (this.latest === null){
		this.latest = tweets[0].id;
		this.m.query('UPDATE users SET most_recent_tracked_tweet = :latest where screen_name = "realDonaldTrump"', {latest: this.latest}, error);
	}

	//for each tweet in the array, insert tweet.id and tweet.created_at into the tweets table
	tweets.forEach(this.addSingleTime);

	//get the next page of tweets after this one
	this.maxId = lastTweetId;
	this.getTimes();
};

TweetGetter.prototype.addSingleTime = function (tweet) {
	let id = tweet.id;
	let date = new Date(tweet.created_at);
	date = date.toISOString();
	this.m.query('INSERT IGNORE INTO tweets (tweet_id, date_time) VALUES (:id, :date)', {id, date}, error);
}

TweetGetter.prototype.alreadyProcessed = function (id) {
	if (typeof id !== 'string'){
		id = id.toString();
	}
	return this.sinceId === id || this.maxId === id;
}

//since maxId is inclusive, subsequent batches will return one already processed tweet (the last tweet from previous batch)
TweetGetter.prototype.getTimes = function () {
	let options = { 
		screen_name: 'realDonaldTrump',
		count: '200',
		trim_user: true
	};
	
	if (this.maxId){
		options.max_id = this.maxId;
	}

	if (this.sinceId){
		options.since_id = this.sinceId;
	}
	
	this.twitter.getUserTimeline(options, error, this.addTimes);
};

TweetGetter.prototype.startGettingTweets = function () {
	this.m.query('SELECT most_recent_tracked_tweet from users where screen_name = "realDonaldTrump"', null, (error, success) => {
		if (error){
			console.log(error);
		} else {
			//will ensure we don't request any tweets before the most recent tweet in the database
			this.sinceId = success[0].most_recent_tracked_tweet;

			this.getTimes();
		}
	});
}*/

TweetGetter.prototype.getLatestTweet = function (callback) {
	let options = { 
		screen_name: 'realDonaldTrump',
		count: '1',
	};
	this.twitter.getUserTimeline(options, error, callback)
};

module.exports = TweetGetter;