module.exports.getToken = (data)=> {
    const split = data.split(":")
    const tokenProxy = split[2]
    const pass = split[1]

    return {
        tokenProxy, pass
    }
}