const express = require("express")
const { connection } = require("./db")
const app = express()
const cors = require("cors")
const { userRouter } = require("./routes/user.routes")
const { productRouter } = require("./routes/products.routes")
app.use(express.json())
app.use(cors())

app.use("/api", userRouter)
app.use("/api", productRouter)

app.listen(8080, async () => {
    try {
        await connection
        console.log("connected to db")
        console.log("running in port 8080")
    }
    catch (err) {
        console.log(err)
    }
})