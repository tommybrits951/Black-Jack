require("dotenv").config()
const express = require("express")
const PORT = process.env.PORT
const app = express()

app.use("/", express.static("public"))


app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
})