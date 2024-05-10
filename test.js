const content = require('./func/messRandom')
const mess = require('./axios/sendMessage')
// type  ---- message/type.js название функции
// label  ---- message/label.json название переменой
// position --- позуция рандомная или конкретная
// params ---- message/type.js параметры которые хочешь передать

const MESSAGE_CONSISTENCY = [
    {
        type: "oembed", label: "content", position: 'random', params: { user: 12345 }
    },
    {
        type: "string", label: "lastMsg", position: 0, params: null
    },
    {
        type: "string", label: "lastMsg", position: 'random', params: null
    },
    {
        type: "string", label: "lastMsg", position: 2, params: null
    },
    {
        type: "test", label: "content", position: 0, params: { test_1: "TEST_1", test_2: "TEST_2"}
    },
    {
        type: "test", label: "content", position: 'random', params: { test_1: "TEST_1", test_2: "TEST_2"}
    },
]

const Start = () => {

    MESSAGE_CONSISTENCY.forEach((v) => {
        const result = content.getMessage(v)
        console.log(result)
    })

}
Start()
