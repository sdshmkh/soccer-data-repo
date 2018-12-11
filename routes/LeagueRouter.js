var request = require('request');
var express = require('express');
var cheerio = require('cheerio')
var jc = require('json2csv').parse
var fs = require('fs')


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
                    switch(i) {
                        case 0 : team = new Object(); team.position = Number($(elem).text())
                        case 1 : fName = ($(elem).text().split('\n')[2])
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
                fName = fName.trim()
                
                if (fName.split(" ").length === 1) {
                    team.code = fName.substring(0, 3).toUpperCase()
                } else if(fName.split(" ").length === 2) {
                    name = fName.split(" ")
                    team.code = name[0].substring(0, 1) + name[1].substring(0, 2).toUpperCase()
                } else if (fName.split(" ").length === 3) {
                    name = fName.split(" ")
                    team.code = name[0].substring(0, 1) + name[1].substring(0, 1) + name[2].substring(0, 1).toUpperCase()
                }
                team.name = fName.trim()
                teams.push(team)
                opts = ['position', 'played', 'won', 'drew', 'lost', 'goalsFor', 'goalsAgainst', 'goalDiffrence', 'points', 'code', 'name']
            f = {opts}
            csv = jc(teams, f)
            console.log(csv)
            fs.writeFile('teams.csv', csv, (err) => console.log(err))
            })
            //res.send(teams)
        })
    })
    return leagueRouter
}

module.exports = routes