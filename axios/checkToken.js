const HttpsProxyAgent = require("https-proxy-agent")
const app = require('../store/app')
const axios = require("axios")

module.exports.getTokenActive = async (guild_id, proxy) => {
    let tokenProxy = false

    while(true) {
        tokenProxy = app.getTokenProxy()
      
        if(tokenProxy === false) {
            break
        } else {
            const result = await axios({
                url: "https://discord.com/api/v9/guilds/" + guild_id,
                method: "GET",
                agent: new HttpsProxyAgent(proxy),
                headers: {
                    "Authorization": tokenProxy
                }
            })
            .then(r => {
                return !!r.data.id
            })
            .catch(async(data) => {
                let code = data.response.status
                if (code != 200 || code != 204 || code != 429) {
                    console.log("code: ", code)
                    console.log("token delete: ", tokenProxy)
                    app.deleteToken(tokenProxy)
                }
                return false
            })

            if(result) break
        }
    }
    return tokenProxy
}