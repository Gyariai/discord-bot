const type = require('../message/type')
const label = require('../message/label.json')
module.exports.getMessage = (config) => {
 
    let position = config.position === "random" ? random(label[config.label]) : config.position

    const message = label[config.label][position]
    
    return type[config.type](message, config.params)
}

const random = (content) => {
    return [Math.floor(Math.random() * Object.keys(content).length)]
}