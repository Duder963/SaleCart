import express from "express"
import cors from "cors"
import dotenv from "dotenv"
dotenv.config()
import router from "./router.js"
const PORT = process.env.PORT || 3000
const app = express()


app.use(express.json())
app.use(cors())
app.use("/api", router)

app.listen(PORT, () => {
    console.log("Server started at http://localhost:"+PORT)
})
