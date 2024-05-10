module.exports.message = (direct_message) => {
    if(direct_message === "send") {
        return {
            status: true
        }
    }

    if(direct_message === "ratelimited") {
        return {
            status: false, error: false, ratelimit: 1000 * 30
        }
    }

    return {
        status: false, error: true
    }
}