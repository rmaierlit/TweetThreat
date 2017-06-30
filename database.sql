/*schema for TweetThreat database*/

CREATE OR REPLACE DATABASE tweetThreat;

USE tweetThreat;

CREATE TABLE tweets(
    tweet_id BIGINT NOT NULL PRIMARY KEY,
    date_time DATETIME DEFAULT NULL,
    user_id BIGINT DEFAULT NULL
);