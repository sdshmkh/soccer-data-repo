var express = require('express')
var rp = require('request-promise')
var cheerio = require('cheerio')
var jc = require('json2csv').parse
var fs = require('fs')

var routes = () => {
    let playersRouter = express.Router()
    playersRouter.get('/:team', (req, res) => {
        let players = Array()
        let teammms = ['arsenal', 'liverpool', 'chelsea', 'tottenham', 'manchester-united', 'everton', 'bournemouth', 'leicester-city', 'wolverhampton-wanderers', 'west-ham-united', 'watford', 'brighton-and-hove-albion', 'cardiff-city', 'newcastle-united', 'crystal-palace', 'burnley', 'huddersfield-town', 'southampton', 'fulham']
        try{
        teammms.forEach(team => {
            url = 'https://www.foxsports.com/soccer/'+ team +'-team-stats?competition=1&season=20180&category=STANDARD'
            rp.get(url)
        .then((response) => {
            var $ = cheerio.load(response)
            $('tbody').children().each((index, tr) => {
                let playerName, gamesPlayed, goals, assists, yc, rc
                $(tr).children().each((index1, playerData) => {
                    if (index1 === 0) {
                        name = $(playerData).children().children().toArray()[1]
                        position = $($(playerData).children().children().toArray()[2]).text().trim()
                        playerName = $(name).children().first().text().trim()
                    }
                    index1 === 1 ? gamesPlayed = $(playerData).text().trim() : null
                    index1 === 4 ? goals = $(playerData).text().trim() : null
                    index1 === 5 ? assists = $(playerData).text().trim() : null
                    index1 === 8 ? yc = $(playerData).text().trim() : null
                    index1 === 9 ? rc = $(playerData).text().trim() : null
                })
                let player = new Object()
                player.Fname = playerName.split(',')[1]
                player.lName = playerName.split(',')[0]
                player.position = position
                player.gamesPlayed = gamesPlayed
                player.goals = goals
                player.assists = assists
                player.yc = yc
                player.rc = rc
                fName = team
                if (fName.split(" ").length === 1) {
                    player.code = fName.substring(0, 3).toUpperCase()
                } else if(fName.split(" ").length === 2) {
                    name = fName.split(" ")
                    player.code = name[0].substring(0, 1) + name[1].substring(0, 2).toUpperCase()
                } else if (fName.split(" ").length === 3) {
                    name = fName.split(" ")
                    player.code = name[0].substring(0, 1) + name[1].substring(0, 1) + name[2].substring(0, 1).toUpperCase()
                }
                player.id = (players.length + 1)
                players.push(player)
            })
            console.log(players.length)
            
            opts = ['fName', 'lName', 'position', 'gp', 'goals', 'assists', 'yc', 'rc', 'code', 'id']
            f = {opts}
            csv = jc(players, f)
            console.log(csv)
            fs.writeFile('players.csv', csv, (err) => console.log(err))
        }).catch(err => console.log('-------------------'+players.length+'---------------------------------'))
        //console.log(team)
        })
    } catch(err) {
        console.log(players)
    }
        //console.log('exited----------------------------------------------')
    })
    return playersRouter
}

module.exports = routes