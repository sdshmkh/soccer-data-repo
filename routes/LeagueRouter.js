var request = require('request');
var express = require('express');
var cheerio = require('cheerio')

var routes = function () {
    let leagueRouter = express.Router()
    leagueRouter.get('/epl', (req, res) => {
        request('http://www.skysports.com//premier-league-table/2018', (err, respomse, body) => {
            var $ = cheerio.load(body)
            var data = []
            let teams = []
            let team
            $('tbody').children('tr').each((i, elem) => {
                $(elem).children('td').each((i, elem) => {
                    // console.log(`${i} is the index and this is the data = ${$(elem).text()}`)
                    switch(i) {
                        case 0 : team = new Object(); team.position = Number($(elem).text())
                        case 1 : team.name = $(elem).text().split('\n')[2]
                        case 2 : team.played = Number($(elem).text())
                        case 3 : team.won = Number($(elem).text())
                        case 4 : team.drew = Number($(elem).text())
                        case 5 : team.lost = Number($(elem).text())
                        case 6 : team.goalsFor = Number($(elem).text())
                        case 7 : team.goalsAgainst = Number($(elem).text())
                        case 8 : team.goalDiffrence = Number($(elem).text())
                        case 9 : team.points = Number($(elem).text())
                    }
                })
                teams.push(team)  
            })
            res.send(JSON.stringify(teams))
        })
    })
    return leagueRouter
}

module.exports = routes