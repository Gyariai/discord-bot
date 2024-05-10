const message = require("./axios/sendMessage")
const database = require("./db/database")

module.exports.reaction = (user_id , username, channel_id, guild_id, bot) => {
    if(database.isUserExistInDB(user_id) === false) {
        message.send(user_id , username, channel_id, guild_id, bot)
        database.setUser(user_id)
    } else {
        console.log("User exist")
    }
}