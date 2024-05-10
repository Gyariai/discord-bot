const minR = 999
const maxR = 6999

module.exports.oembed = (msg, params) => {
    const { user } = params

    return JSON.stringify({
        "content":
            msg.replace("@user", `<@!${user}>`).replace("@rng", String(Math.floor(Math.random() * (maxR - minR)) + minR)),
        "nonce":
            (Date.now() - 1420070400000) * 4194304,
        "tts":
            false
    })
}

module.exports.string = (config) => {
    return JSON.stringify({
        "content":
            config,
        "nonce":
            (Date.now() - 1420070400000) * 4194304,
        "tts":
            false
    })
}

module.exports.test = (msg, params) => {
    const { test_1, test_2 } = params

    return JSON.stringify({
        "content":
            msg.replace("@user", `<@!${test_1}>`).replace("@rng", test_2),
        "nonce":
            (Date.now() - 1420070400000) * 4194304,
        "tts":
            false
    })
}
