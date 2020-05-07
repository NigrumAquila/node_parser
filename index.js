const request = require('request')
const cheerio = require('cheerio')
const fs = require('fs')

request('http://www.nat-geo.ru/', (error, response, body) => {
    if(!error && response.statusCode === 200) {
        const $ = cheerio.load(body)
        const srcs = []
        $('.grid-cell img', '.grid-cell-wrapper')
            .each((idx, pic) => {
                const src = $(pic).attr('src')
                srcs.push(src)
            })
        srcs.forEach((s, i) => {
            request(s).pipe(fs.createWriteStream(`pictures/${i}.jpg`))
        })
    }
})