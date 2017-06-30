# TweetThreat

### For future reference
An SQL query to obtain the number of tweets sent out in each hour:

select hour(date_time) as hour, count(*) as quantity from tweets group by hour

An SQL query to obtain the number of times at least one tweet was sent out during each hour:

`SELECT hour, COUNT(*) AS quantity

FROM (SELECT DISTINCT HOUR(date_time) AS hour, DATE(date_time) AS date FROM tweets) AS distinct_hour_and_day

GROUP BY hour`