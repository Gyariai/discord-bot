const HttpsProxyAgent = require("https-proxy-agent")
const headers = require("./headers")
const axios = require('axios')
const db = require('../db/database')

const token = require("../setting/tokenProxy.json")
const proxy = require("../setting/proxy.json")

const store = require("../store/app")

const nameSet = require("../data/name")
const tokens = token.tokens

var countMsgs = 0;

module.exports.tokenNoRasp = () => {
    return tokens.length
}

module.exports.init = async (num) => {
    await gatherProxies_general()
    gatherTokens_general(num)
}

const gatherTokens_general = async () => {
    const maximum = token.max

    while(true) {
        const tokenStore = store.get().tokenProxy

        if(tokenStore.length < maximum) {
            let token = tokens[0]
            tokens.splice(tokens.indexOf(token), 1)

            if(token) {
                const res = await nameSet.switchNameAvatar(token)  // изменение имени
                console.log(1111111, res)
                if(res) {
                    store.set("tokenProxy", [res])
                }
            }
        }

        await new Promise((res) => {
            setTimeout(() => {
                res(true)
            }, 500)
        })

        if (countMsgs%10 == 0) {
            console.log("=========== Активных токенов =============")
            console.log("==========================================")
            console.log("незадействованых токенов ===========> ", tokens.length)
            console.log("активных токенов ===========> ", store.get().tokenProxy.length)
            console.log("активные токены ===========> ", store.get().tokenProxy)
            console.log("проспамлено ===========> ", db.getUsers())
            console.log("==========================================")
        }

        countMsgs = countMsgs + 1;
        if(tokens.length === 0) break
    }
}

const gatherProxies_general = () => {
    let lines = proxy.tokens
    for (let i = 0; i < lines.length; i++) {
        lines[i] = "http://" + lines[i].replace("http://", "")
    };

    store.set("proxy", lines)
}

module.exports.cookies = async (proxy) => {
    const result = await axios({
        url: "https://discord.com/app",
        method: "GET",
        agent: new HttpsProxyAgent(proxy),
        withCredentials: true
    })
    .then((res) => {
        const cookie = res.headers['set-cookie']
      
        return [cookie[0].split("dcfduid=")[1].split(";")[0], cookie[1].split("dcfduid=")[1].split(";")[0]]
    })
    .catch(() => {
        return false
    })

    return result
}

module.exports.finger = async (proxy) => {
    const result = await axios({
        url: "https://discord.com/api/v9/experiments",
        method: "GET",
        agent: new HttpsProxyAgent(proxy),
    })
    .then((res) => {
        return res.data.fingerprint
    })
    .catch(() => {
        return false
    })

    return result
}

module.exports.is_mutal = async (user, proxy, token, cookies, finger) => {
    const result = await axios({
        url: `https://discord.com/api/v9/users/${user}/profile?with_mutual_guilds=true`,
        method: "GET",
        agent: new HttpsProxyAgent(proxy),
        headers: headers.get(token, cookies, finger)
    })
    .then((response) => {
        if(response.data.mutual_guilds.length) {
            return true
        } else {
            return false 
        }
    })
    .catch(() => {
        return false
    })

    return result
}

module.exports.create_dm = async (user, proxy, token, cookies, finger, channel_id, guild_id) => {
    const result = await axios({
        url: "https://discord.com/api/v9/users/@me/channels",
        method: "POST",
        agent: new HttpsProxyAgent(proxy),
        headers: headers.getDm(token, cookies, finger, channel_id, guild_id),
        data: JSON.stringify({"recipients": [user]}),
    })
    .then((response) =>{
        return response.data.id
    })
    .catch(() => {
        return false
    })

    return result
}

module.exports.direct_message = async (channel, proxy, token, cookies, finger, message) => {
    const result = await axios({
        url: `https://discord.com/api/v9/channels/${channel}/messages`,
        method: "POST",
        agent: new HttpsProxyAgent(proxy),
        headers: headers.getEmbed(token, cookies, finger),
        data: message,
    })
    .then(async () => {
        store.setDMS()
        return "send" 
    }).catch(e => {
        console.log(111, e?.response?.data)
        if(e?.response?.status === 429) {
            return "manyrequest"
        }

        if(e?.response?.data?.code === 50007) {
            return "messagenone"
        }
        if (e?.response?.data?.code == 40003) {
            return "ratelimited"
        }

        return false
    })

    return result
}