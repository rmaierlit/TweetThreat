/*schema for TweetThreat database*/

DROP DATABASE IF EXISTS tweetThreat
CREATE DATABASE tweetThreat;

USE tweetThreat;

CREATE TABLE tweets(
    tweet_id BIGINT UNSIGNED NOT NULL PRIMARY KEY,
    date_time DATETIME DEFAULT NULL,
    user_id BIGINT DEFAULT NULL
);

CREATE TABLE users(
    user_id BIGINT UNSIGNED NOT NULL PRIMARY KEY,
    screen_name VARCHAR(30) NOT NULL,
    most_recent_tracked_tweet BIGINT UNSIGNED
);

INSERT INTO users (user_id, screen_name, most_recent_tracked_tweet) VALUES(25073877, 'realDonaldTrump', null);