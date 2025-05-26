const router = require("express").Router()
const Money = require("./model")

async function retreiveMoney(req, res, next) {
    try {
        const money = await Money.getMoney()
        res.status(200).json(money)
    } catch (err) {
        return res.status(500).json({message: err.message || "You broke!"})
    }
}


async function depositMoney(req, res, next) {
    try {
        console.log(req.body)
    } catch (err) {
        return res.status(500).json({message: err.message || "We broke!"})
    }
}

router.get("/", retreiveMoney)
router.post("/", depositMoney)

module.exports = router