var request = require('request');
var cheerio = require('cheerio');
var express = require('express');

var Routes = () => {
    let fixtureRouter = express.Router()
    fixtureRouter.get('/:team', (req, res) => {
                let team = req.params.team
                let uri = 'http://www.skysports.com/'+team+'-fixtures'
                request(uri, (err, response, body) => {
                var $ = cheerio.load(body)
                let year
                let month
                let day
                let time
                let comp
                $('.fixres__body').children().each((i, elem) => {
                    if($(elem).hasClass('fixres__header1')){
                        month = $(elem).text().split(' ')[0]
                        year = $(elem).text().split(' ')[1]
                    } else if ($(elem).hasClass('fixres__header2')) {
                        day = $(elem).text().split()[1].substring(0, 3)
                    } else if ($(elem).hasClass('fixres__header3')) {
                        comp = $(elem).text()
                    } else if ($(elem).hasClass('fixres__item')) {
                        //teams, time
                    }
                })
            })
        })
    return fixtureRouter
}

module.exports = Routes