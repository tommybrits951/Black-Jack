const db = require("./dbConfig")


async function getMoney() {
    return await db("money").first()
}


async function setMoney(value) {
    return await db("money").insert(value).returning("*")
}

module.exports = {
    getMoney,
    setMoney
}