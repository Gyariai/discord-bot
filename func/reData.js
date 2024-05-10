module.exports.get = (data) => {
    const result = []
    const copy = {...data}
    const token = []
    
    copy.accounts.forEach(element => {
        const dt = element.user.split(":")
        element.token = dt[2]
        element.pass = dt[1]
        element.email = dt[0]

        if(token.includes(element.token) === false) {
            token.push(element.token)
            result.push(element)
        }
    });
    
    copy.accounts = result

    return copy
}