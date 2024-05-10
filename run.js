const start = require("./setting/start.json")
const bot = require("./index")
const app = require("./axios/init")
const store = require("./store/app")
const re = require("./func/reData")

const data = re.get(start)
const activeAcc = []

let maxBotsRun = data.maxBotsRun

const Run = async () => {
    await app.init()
    await new Promise((res, rej) => {
        setTimeout(() => {
            res(true)
        },5000)
    })
        const AccLen = data.accounts.length

        const max = AccLen - maxBotsRun >= 0 ? maxBotsRun : AccLen
        for(let i = 0; i < max; i++ ) {
            activeAcc.push(data.accounts[i])
        }
    
        for(let i = 0; i < max; i++ ) {
            data.accounts.splice(0, 1)
        }
    
        let i = 0
    
        maxBotsRun = max
        while(max) {
            if(i === max) break
           
            bot.Start(activeAcc[i])
            i = i + 1
        }
}

Run()