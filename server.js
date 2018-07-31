var request = require('request');
var express = require('express');
var cheerio = require('cheerio');

var leagueRouter = require('./routes/LeagueRouter')()
var fixtureRouter = require('./routes/FixturesRouter')()

var app = new express();

app.use('/leagues', leagueRouter)
app.use('/fixtures', fixtureRouter)

app.listen(3000, () => {
    console.log('server running at port 3000')
})