const nameSet = require("../axios/setNameAvatar")
const axios = require('../axios/init')

const func = require('../func/token')

module.exports.switchNameAvatar = async (token) => {
    const proxy = require('../store/app').getProxy()

    const { tokenProxy, pass } = func.getToken(token)

    ////// смена имени //////
    const cookiesName = await axios.cookies(proxy)
    const fingerName = await axios.finger(proxy)

    if(cookiesName && fingerName) {
        const result = await nameSet.set(tokenProxy, pass, cookiesName, fingerName)

        if(result.status === false) {
            //Для выполнения этого действия вам необходимо подтвердить свою учетную запись.
            // и за жэтого не дает отправлять сообщения
            if(result.error.message === "You need to verify your account in order to perform this action.") {
                console.log("You need to verify your account")
                return false // активировать для удаления токена при этой ошибке

            }
        }

        if(result.status === false) {
            // когда часто меняешь ник
            if(result.error.message === "Invalid Form Body") {
                console.log("Invalid Form Body")
                // return false // активировать для удаления токена при этой ошибке
            }
        }

        if(result.status === false) {
            // бан акаунта
            if(result.error.message === "401: Unauthorized") {
                console.log("Ban account")
                return false // активировать для удаления токена при этой ошибке

            }

            if(result.error.message === "403: Unauthorized") { // ? вот эта ошибка под вопросом 
                // по идее когда у токена срок истекает и он становится не дейстывителен
                console.log("Tiken no active")
                //return false // активировать для удаления токена при этой ошибке

            }
        }
    }

    const cookiesAvatar = await axios.cookies(proxy)
    await nameSet.setAvatar(tokenProxy, cookiesAvatar)

    return tokenProxy
}