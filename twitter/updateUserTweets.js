var TweetGetter = require('./twitterAPI.js');

var worker = new TweetGetter();
worker.startGettingTweets();