const xlsx = require('node-xlsx').default
const fs = require('fs')

let input = '/Users/wolf_tungsten/Documents/就业办微信小程序/2018.xls'
let rawData = xlsx.parse(input)[0].data
let output = '/Users/wolf_tungsten/Documents/就业办微信小程序/2018.json'

let title = rawData[0]
let buf = []
rawData.slice(1).forEach( (l) => {
    let data = {}
    l.forEach((v, i) => {
        data[title[i]] = ''+v
    })
    buf.push(JSON.stringify(data))
})

buf = buf.join('\n')

fs.writeFileSync(output, buf)

