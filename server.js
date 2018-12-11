var request = require('request');
var express = require('express');
var rp = require('request-promise')

var leagueRouter = require('./routes/LeagueRouter')()
var schduelingRouter = require('./routes/FixturesRouter')()
var playerRouter = require('./routes/PlayersRouter')()

var app = new express();

app.use('/leagues', leagueRouter)
app.use('/schedules', schduelingRouter)
app.use('/players', playerRouter)

app.listen(3000, () => {
    console.log('server running at port 3000')
})