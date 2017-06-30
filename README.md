# TweetThreat

###For future reference
An SQL query to select number of tweets sent out in each hour
select hour(date_time) as hour, count(*) as quantity from tweets group by hour