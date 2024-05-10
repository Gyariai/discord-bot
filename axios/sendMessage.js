const app = require('../store/app')
const token = require("./checkToken")
const guild = require("./checkGuild")
const axios = require('../axios/init')

const check = require('../func/mesStatus')

const recharge = require('../func/recharge')
const content = require('../func/messRandom')

module.exports.send = async (user_id, username, channel_id, guild_id, bot) => {
    let proxy = app.getProxy()

    let tokenProxy = false
    let status = true

    while(true) {
        tokenProxy = await token.getTokenActive(guild_id, proxy)

        if(tokenProxy === false) {

            if(axios.tokenNoRasp() === 0) {
                console.log("-------------------")
                console.log("Рабочих токенов нет")
                console.log("-------------------")
                bot.close(4000, "session_close")
                status = false
                break
            }
           
        } else {
            const check_guild = await guild.checkGuildActive(tokenProxy, guild_id, proxy)
            if(check_guild) {
                break
            } else {
                console.log("token switch")
            }
        }

        await recharge.re(1000)
    }
    

    if(status) {
        const cookies = await axios.cookies(proxy)
        const finger = await axios.finger(proxy)
        const is_mutal = await axios.is_mutal(user_id, proxy, tokenProxy, cookies, finger)
        const create_dm = await axios.create_dm(user_id, proxy, tokenProxy, cookies, finger, channel_id, guild_id)

        const MESSAGE_CONSISTENCY = [
            {
                type: "oembed", label: "content", position: 'random', params: { user: user_id }
            },
            {
                type: "string", label: "lastMsg", position: 0, params: null
            },
            {
                type: "string", label: "lastMsg", position: 'random', params: null
            },
            {
                type: "string", label: "lastMsg", position: 2, params: null
            }
        ]

        let interval = 0
        const length = MESSAGE_CONSISTENCY.length - 1

        if(!!cookies && !!finger && !!is_mutal && create_dm) {
            while(status) {
                /// content ///
               
                const direct_message = await axios.direct_message(create_dm, proxy, tokenProxy, cookies, finger, message = content.getMessage(MESSAGE_CONSISTENCY[interval]))

                const statusMessage = check.message(direct_message)
                if(statusMessage.status) {
                    console.log(`${username} message send from ${tokenProxy} ----- index ${interval}`)

                    interval = interval + 1

                    console.log(" ------- restart ------- ")
                    await recharge.re(15000) // тут время для отправки повторных сообщений
                } else {
                    if(statusMessage?.error) {
                        break
                    }
                }

                if(statusMessage?.ratelimit) {
                    console.log(" ------- restart ------- ")
                    await recharge.re(statusMessage.ratelimit)
                }

                if(interval === length) break
            }
        }
    }
}