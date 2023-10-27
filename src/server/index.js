import express from "express"
import cors from "cors"
import morgan from "morgan"
import bodyParser from "body-parser"
import teamRouter from "./src/routes/team/teamRouter.js"
import playerRouter from "./src/routes/player/playerRouter.js"
import betRouter from "./src/routes/bet/betRouter.js"

const app = express()
const PORT = 5004

// Middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())
app.use(morgan("dev"))

app.use("/players", playerRouter)
app.use("/teams", teamRouter)
app.use("/bets", betRouter)
// Routers
app.listen(PORT, () => {
  console.info(`Server running on port ${PORT}.`)
})
