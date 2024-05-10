module.exports.get = (token, cookies, finger) => {
    return {
        "accept":
            "*/*",
        "accept-encoding":
            "gzip, deflate",
        "accept-language":
            "en-US",
        "authorization":
            token,
        "cookie":
            `__dcfduid=${cookies[0]}; __sdcfduid=${cookies[1]}; locale=en-US`,
        "referer":
            `https://discord.com/channels/@me`,
        "sec-fetch-dest":
            "empty",
        "sec-fetch-mode":
            "cors",
        "sec-fetch-site":
            "same-origin",
        "user-agent":
            "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) discord/1.0.9003 Chrome/91.0.4472.164 Electron/13.4.0 Safari/537.36",
        "x-debug-options":
            "bugReporterEnabled",
        "x-discord-locale":
            "en-US",
        "x-super-properties":
            "eyJvcyI6IldpbmRvd3MiLCJicm93c2VyIjoiRGlzY29yZCBDbGllbnQiLCJyZWxlYXNlX2NoYW5uZWwiOiJzdGFibGUiLCJjbGllbnRfdmVyc2lvbiI6IjEuMC45MDAzIiwib3NfdmVyc2lvbiI6IjEwLjAuMTkwNDIiLCJvc19hcmNoIjoieDY0Iiwic3lzdGVtX2xvY2FsZSI6ImVuIiwiY2xpZW50X2J1aWxkX251bWJlciI6MTA4OTI0LCJjbGllbnRfZXZlbnRfc291cmNlIjpudWxsfQ==",
        "x-fingerprint": 
            finger,
    }
}

module.exports.getEmbed = (token, cookies, finger, channel) => {
    return {
        "accept":
            "*/*",
        "accept-encoding":
            "gzip, deflate",
        "accept-language":
            "en-US",
        "authorization":
            token,
        "content-type":
            "application/json",
        "cookie":
            `__dcfduid=${cookies[0]}; __sdcfduid=${cookies[1]}; locale=en-US`,
        "origin":
            "https://discord.com",
        "referer":
            `https://discord.com/channels/@me/${channel}`,
        "sec-fetch-dest":
            "empty",
        "sec-fetch-mode":
            "cors",
        "sec-fetch-site":
            "same-origin",
        "user-agent":
            "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) discord/1.0.9003 Chrome/91.0.4472.164 Electron/13.4.0 Safari/537.36",
        "x-debug-options":
            "bugReporterEnabled",
        "x-discord-locale":
            "en-US",
        "x-super-properties":
            "eyJvcyI6IldpbmRvd3MiLCJicm93c2VyIjoiRGlzY29yZCBDbGllbnQiLCJyZWxlYXNlX2NoYW5uZWwiOiJzdGFibGUiLCJjbGllbnRfdmVyc2lvbiI6IjEuMC45MDAzIiwib3NfdmVyc2lvbiI6IjEwLjAuMTkwNDIiLCJvc19hcmNoIjoieDY0Iiwic3lzdGVtX2xvY2FsZSI6ImVuIiwiY2xpZW50X2J1aWxkX251bWJlciI6MTA4OTI0LCJjbGllbnRfZXZlbnRfc291cmNlIjpudWxsfQ==",
        "x-fingerprint": 
            finger
    }
}

module.exports.getDm = (token, cookies, finger, channel_id, guild_id) => {
    return  {
        "accept":
            "*/*",
        "accept-encoding":
            "gzip, deflate",
        "accept-language":
            "en-US",
        "authorization":
            token,
        "content-type":
            "application/json",
        "cookie":
            `__dcfduid = ${cookies[0]}; __sdcfduid = ${cookies[1]}; locale = en - US`,
        "origin":
            "https://discord.com",
        "referer":
            `https://discord.com/channels/${guild_id}/${channel_id}`,
        "sec-fetch-dest":
            "empty",
        "sec-fetch-mode":
            "cors",
        "sec-fetch-site":
            "same-origin",
        "user-agent":
            "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) discord/1.0.9003 Chrome/91.0.4472.164 Electron/13.4.0 Safari/537.36",
        "x-context-properties":
            "e30=",
        "x-debug-options":
            "bugReporterEnabled",
        "x-discord-locale":
            "en-US",
        "x-super-properties":
            "eyJvcyI6IldpbmRvd3MiLCJicm93c2VyIjoiRGlzY29yZCBDbGllbnQiLCJyZWxlYXNlX2NoYW5uZWwiOiJzdGFibGUiLCJjbGllbnRfdmVyc2lvbiI6IjEuMC45MDAzIiwib3NfdmVyc2lvbiI6IjEwLjAuMTkwNDIiLCJvc19hcmNoIjoieDY0Iiwic3lzdGVtX2xvY2FsZSI6ImVuIiwiY2xpZW50X2J1aWxkX251bWJlciI6MTA4OTI0LCJjbGllbnRfZXZlbnRfc291cmNlIjpudWxsfQ==",
        "x-fingerprint": 
            finger,
        "Content-Type": "multipart/form-data"
    }
}