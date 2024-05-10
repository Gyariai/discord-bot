const HttpsProxyAgent = require("https-proxy-agent")
const app = require('../store/app')
const axios = require("axios")

module.exports.checkGuildActive = async (token, guild, proxy) => {
    const result = await axios({
        url: "https://discord.com/api/v9/users/@me/affinities/guilds",
        method: "GET",
        agent: new HttpsProxyAgent(proxy),
        headers: {
            "Authorization": token
        }
    })
    .then((e) => {
        if(e.status === 200 || e.status === 204 || code != 429) {
            return true
        } else {
            console.log("Not in guild")
            console.log("token delete: ", tokenProxy)
            app.deleteToken(tokenProxy)
            return false
        }
    })
    .catch((e) => {
        return false
    })

    return result
}