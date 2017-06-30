var routes = require('express').Router();

routes.get('/realDonaldTrump', function(req, res) {
    res.send('FAKE NEWS!!!!');
})

module.exports = routes;