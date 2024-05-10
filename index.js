const params = require("./ws/connfig")

const src = require("./app")

const store = require('./store/app')

const time = require("./func/date")

let active = 0

module.exports.active = () => active

module.exports.Start = async (setting) => {
    active = active + 1
    console.log("Активных процесов =======>   ", active)
    LoadWS(setting)
}

const LoadWS = (setting) => {
    const WebSocket = require('ws');
    const bot = new WebSocket("wss://gateway.discord.gg/?encoding=json")

    let numeration = 0
    let st = true
    
    bot.on("open", function open() {
        bot.send(JSON.stringify(
            params.payloadOne(setting.token)
        ))
    })
   
    bot.on("message", function open(data) {
        const msg = JSON.parse(data)
        if(msg.t === "READY_SUPPLEMENTAL" || st) {
            st = false
            console.log("Socket is running")
            bot.send(JSON.stringify(
                params.payloadTwo(setting)
            ))
        }
        ////////////////// тут ////////////////////
        if(msg.t === "MESSAGE_REACTION_ADD") {
            try {
                if(
                    setting.guild === msg.d.guild_id &&
                    setting.channel === msg.d.channel_id &&
                    setting.message === msg.d.message_id &&
                    !!time.isDate(setting.data, msg.d.member.user.id)
                ) {
                    setTimeout(() => {
                        src.reaction(msg.d.member.user.id, msg.d.member.user.username, msg.d.channel_id, msg.d.guild_id, bot) // в app.js
                    }, 5000)
                }
            }
            catch (e) {
                console.log(e)
            }
        }
        ///////////////////////////////////////////
        ////////////////// тут ////////////////////
        if(msg.t === "MESSAGE_CREATE") {
            try {
                if(
                    setting.guild === msg.d.guild_id &&
                    setting.msgchannel === msg.d.channel_id &&
                    !!time.isDate(setting.data, msg.d.author.id)
                ) {
                    setTimeout(() => {
                        src.reaction(msg.d.author.id, msg.d.author.username, msg.d.channel_id, msg.d.guild_id, bot) // в app.js
                    }, 5000)
                }
            }
            catch (e) {
                console.log(e)
            }
        }
        ///////////////////////////////////////////
        if(msg?.s) {
            numeration = msg.s
        }
       
        if(numeration %  137 === 0) {
            bot.send(JSON.stringify({
                op: 1, d: numeration + 137
            }))
        }
        
    })

    bot.on("close", (msg) => {
        console.log("Socket close", msg)
        const token = store.getTokenProxy()

        if(token && msg < 4000) { // < 4000 бан
            LoadWS(setting)
        } else {
            active =  active - 1
            console.log("Активных процесов =======>   ", active)
        }
        
    })
    bot.on("disconect", (msg) => {
        console.log("Socket disconect")
        const token = store.getTokenProxy()

        if(token && msg < 4000) { // < 4000 бан
            LoadWS(setting)
        } else {
            active =  active - 1
            console.log("Активных процесов =======>   ", active)
        }
    })
}