const enmap = require('enmap');

class database {
    constructor() {
        this.database = new enmap({
            dataDir: `${__dirname}\\sql`,
            name: 'guilds',
            fetchAll: true,
            autoFetch: true,
        });
    }
    isUserExistInDB(id) {
        if (this.database.get(id))
            return true
        return false
    }
    
    setUser(id) {
        if (!this.isUserExistInDB(id))
            this.database.ensure(id, 1)
    }

    getUsers() {
        let i = 0
        this.database.forEach(element => {
            i = i + 1
        });
        return i
    }
}

module.exports = new database