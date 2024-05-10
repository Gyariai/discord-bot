const fs = require("fs")
const path = require('path');
const appDir = path.resolve(__dirname, '../img')

module.exports.base64_encode = () => {
    const files = fs.readdirSync(appDir)
    const bitmap = fs.readFileSync(`${appDir}/${files[Math.floor(Math.random() * files.length)]}`)

    return "data:image/png;base64," + new Buffer(bitmap).toString('base64')
}