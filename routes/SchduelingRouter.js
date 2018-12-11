var request = require('request');
var rp = require('request-promise');
var cheerio = require('cheerio');
var express = require('express');

var Routes = () => {
    let SchduelingRouter = express.Router()
    SchduelingRouter.get('/results/:team', (req, res) => {
            let team = req.params.team
            let results = Array()
            let uri = 'http://www.skysports.com/'+team+'-results/'
            rp.get(uri).then((response) => {
                let $ = cheerio.load(response)
                let fixtures = $('.fixres__body').children()
                let month, date, comp, jsDate
                $(fixtures).each((index, ele) => {
                    $(ele).attr('class') === 'fixres__header1' ? month = $(ele).text() : null
                    $(ele).attr('class') === 'fixres__header2' ? date = $(ele).text() : null
                    $(ele).attr('class') === 'fixres__header3' ? comp = $(ele).text() : null
                    if ($(ele).attr('class') === 'fixres__item' && comp === 'Premier League') {
                        fDay = (date.split(" ")[1]).length === 4 ? (date.split(" ")[1]).substring(0, 2) : (date.split(" ")[1]).substring(0, 1)
                        fullDate = month.split(" ")[0] + " " + fDay  + ", " + month.split(" ")[1]
                        jsDate = new Date(fullDate)
                        matchData = $(ele).children().children()
                        home = $(matchData).find('.swap-text__target').first().text()
                        away = $(matchData).find('.swap-text__target').last().text()
                        homescore = parseInt($(matchData).find('.matches__teamscores-side').first().text().trimLeft().trimRight())
                        awayscore = parseInt($(matchData).find('.matches__teamscores-side').last().text().trimLeft().trimRight())
                        result = new Object()
                        if (home.split(" ").length === 1) {
                            result.homeTeam = home.substring(0, 3).toUpperCase()
                        } else if(home.split(" ").length === 2) {
                            name = home.split(" ")
                            result.homeTeam = name[0].substring(0, 1) + name[1].substring(0, 2).toUpperCase()
                        } else if (home.split(" ").length === 3) {
                            name = home.split(" ")
                            result.homeTeam = name[0].substring(0, 1) + name[1].substring(0, 1) + name[2].substring(0, 1).toUpperCase()
                        }
                        fName = away
                        if (away.split(" ").length === 1) {
                            result.awayTeam = away.substring(0, 3).toUpperCase()
                        } else if(fName.split(" ").length === 2) {
                            name = fName.split(" ")
                            result.awayTeam = name[0].substring(0, 1) + name[1].substring(0, 2).toUpperCase()
                        } else if (fName.split(" ").length === 3) {
                            name = fName.split(" ")
                            result.awayTeam = name[0].substring(0, 1) + name[1].substring(0, 1) + name[2].substring(0, 1).toUpperCase()
                        }
                        result.date = jsDate
                        result.homeScore = homescore
                        result.awayscore = awayscore
                        result.homeTeamVictory = homescore < awayscore ? false : true
                        result.id = (results.length + 1)
                        results.push(result)
                    }
                    res.send(results)
                })
            })
        })
        SchduelingRouter.get('/fixtures/:team', (req, res) => {
            let team = req.params.team
            let results = Array()
            let uri = 'http://www.skysports.com/'+team+'-fixtures/'
            rp.get(uri).then((response) => {
                let $ = cheerio.load(response)
                let fixtures = $('.fixres__body').children()
                let month, date, comp, jsDate
                $(fixtures).each((index, ele) => {
                    $(ele).attr('class') === 'fixres__header1' ? month = $(ele).text() : null
                    $(ele).attr('class') === 'fixres__header2' ? date = $(ele).text() : null
                    $(ele).attr('class') === 'fixres__header3' ? comp = $(ele).text() : null
                    if ($(ele).attr('class') === 'fixres__item' && comp === 'Premier League') {
                        fDay = (date.split(" ")[1]).length === 4 ? (date.split(" ")[1]).substring(0, 2) : (date.split(" ")[1]).substring(0, 1)
                        fullDate = month.split(" ")[0] + " " + fDay  + ", " + month.split(" ")[1]
                        jsDate = new Date(fullDate)
                        matchData = $(ele).children().children()
                        home = $(matchData).find('.swap-text__target').first().text()
                        away = $(matchData).find('.swap-text__target').last().text()
                        homescore = parseInt($(matchData).find('.matches__teamscores-side').first().text().trimLeft().trimRight())
                        awayscore = parseInt($(matchData).find('.matches__teamscores-side').last().text().trimLeft().trimRight())
                        result = new Object()
                        if (home.split(" ").length === 1) {
                            result.homeTeam = home.substring(0, 3).toUpperCase()
                        } else if(home.split(" ").length === 2) {
                            name = home.split(" ")
                            result.homeTeam = name[0].substring(0, 1) + name[1].substring(0, 2).toUpperCase()
                        } else if (home.split(" ").length === 3) {
                            name = home.split(" ")
                            result.homeTeam = name[0].substring(0, 1) + name[1].substring(0, 1) + name[2].substring(0, 1).toUpperCase()
                        }
                        fName = away
                        if (away.split(" ").length === 1) {
                            result.awayTeam = away.substring(0, 3).toUpperCase()
                        } else if(fName.split(" ").length === 2) {
                            name = fName.split(" ")
                            result.awayTeam = name[0].substring(0, 1) + name[1].substring(0, 2).toUpperCase()
                        } else if (fName.split(" ").length === 3) {
                            name = fName.split(" ")
                            result.awayTeam = name[0].substring(0, 1) + name[1].substring(0, 1) + name[2].substring(0, 1).toUpperCase()
                        }
                        result.date = jsDate
                        result.homeScore = homescore
                        result.awayscore = awayscore
                        result.homeTeamVictory = homescore < awayscore ? false : true
                        result.id = (results.length + 1)
                        results.push(result)
                    }
                    res.send(results)
                })
            })
        })
    return SchduelingRouter
}

module.exports = Routes