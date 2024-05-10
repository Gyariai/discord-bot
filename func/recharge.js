module.exports.re = async (time = 1000) => {
    await new Promise((res) =>{
        setTimeout(() => {
            res(true)
        }, time)
    })
    return true
}