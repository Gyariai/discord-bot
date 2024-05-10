const store = {
    dms: 0,
    proxy: [],
    tokenProxy: []
}

module.exports.get = () => {
    return store
}

module.exports.set = (value, data) => {
    data.forEach(v => {
        store[value].push(v)
    })
    
}

module.exports.setDMS = () => {
    store.dms = store.dms + 1
}


module.exports.getTokenProxy = () => {
    if(store.tokenProxy.length === 0) {
        return false
    }
    return store.tokenProxy[Math.floor(Math.random() * store.tokenProxy.length)]
}

module.exports.getProxy = () => {
    return store.proxy[Math.floor(Math.random() * store.proxy.length)]
}

module.exports.deleteToken = (token) => {
    console.log(store.tokenProxy.splice(store.tokenProxy.indexOf(token), 1))
    store.tokenProxy.splice(store.tokenProxy.indexOf(token), 1)
}