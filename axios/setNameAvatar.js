const HttpsProxyAgent = require("https-proxy-agent")
const axios = require("axios")

const img = require('../func/img')
const acc = require('../setting/name.json')
const e = require("express")

module.exports.set = async (tokenProxy, pass, cookies, finger) => {
    const proxy = require('../store/app').getProxy()

    let data = JSON.stringify({
        "username": acc.names[Math.floor(Math.random() * acc.names.length)],
        "password": pass,
    }); 



    const result = await axios({
        url: "https://discord.com/api/v9/users/@me",
        method: "PATCH",
        agent: new HttpsProxyAgent(proxy),
        headers: {
            "accept": "*/*",
            "accept-encoding": "gzip, deflate",
            "accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
            "Authorization": tokenProxy,
            "Content-Type": "application/json",
            "cookie":
            `__dcfduid = ${cookies[0]}; __sdcfduid = ${cookies[1]}; locale = en - US`,
            "origin": "https://discord.com",
            "referer": `https://discord.com/channels/@me`,
            "sec-ch-ua": ` Not;A Brand";v="99", "Google Chrome";v="97", "Chromium";v="97`,
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "Windows",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "user-agent": `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.99 Safari/537.36`,
            "x-debug-options": "bugReporterEnabled",
            "x-discord-locale": "en-US",
            "x-super-properties": "eyJvcyI6IldpbmRvd3MiLCJicm93c2VyIjoiRGlzY29yZCBDbGllbnQiLCJyZWxlYXNlX2NoYW5uZWwiOiJzdGFibGUiLCJjbGllbnRfdmVyc2lvbiI6IjEuMC45MDAzIiwib3NfdmVyc2lvbiI6IjEwLjAuMTkwNDIiLCJvc19hcmNoIjoieDY0Iiwic3lzdGVtX2xvY2FsZSI6ImVuIiwiY2xpZW50X2J1aWxkX251bWJlciI6MTA4OTI0LCJjbGllbnRfZXZlbnRfc291cmNlIjpudWxsfQ==",
            "x-fingerprint": finger,
        },
        data: data
    })
    .then(() => {
        return {
            status: true
        }
    })
    .catch((e) =>{
        return {
            status: false, error: e.response.data
        }
    })
   
    return result
}

module.exports.setAvatar = async (tokenProxy, cookies) => {
    const proxy = require('../store/app').getProxy()
    const imgBase = await img.base64_encode()
    
    let data = JSON.stringify({
        "avatar": imgBase
    }); 

    const result = await axios({
        url: "https://discord.com/api/v9/users/@me",
        method: "PATCH",
        agent: new HttpsProxyAgent(proxy),
        headers: {
            "accept": "*/*",
            "accept-encoding": "gzip, deflate",
            "accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
            "Authorization": tokenProxy,
            "Content-Type": "application/json",
            "cookie":
            `__dcfduid = ${cookies[0]}; __sdcfduid = ${cookies[1]}; locale = en - US`,
            "origin": "https://discord.com",
            "referer": `https://discord.com/channels/@me`,
            "sec-ch-ua": ` Not;A Brand";v="99", "Google Chrome";v="97", "Chromium";v="97`,
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "Windows",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "user-agent": `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.99 Safari/537.36`,
            "x-debug-options": "bugReporterEnabled",
            "x-discord-locale": "en-US",
            "x-super-properties": "eyJvcyI6IldpbmRvd3MiLCJicm93c2VyIjoiRGlzY29yZCBDbGllbnQiLCJyZWxlYXNlX2NoYW5uZWwiOiJzdGFibGUiLCJjbGllbnRfdmVyc2lvbiI6IjEuMC45MDAzIiwib3NfdmVyc2lvbiI6IjEwLjAuMTkwNDIiLCJvc19hcmNoIjoieDY0Iiwic3lzdGVtX2xvY2FsZSI6ImVuIiwiY2xpZW50X2J1aWxkX251bWJlciI6MTA4OTI0LCJjbGllbnRfZXZlbnRfc291cmNlIjpudWxsfQ==",
        },
        data: data
    })
    .then(() => {
        return {
            status: true
        }
    })
    .catch((e) =>{
        return {
            status: false, error: e.response.data
        }
    })
   
    return result
}