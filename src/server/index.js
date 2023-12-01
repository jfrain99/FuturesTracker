import express from "express"
import cors from "cors"
import morgan from "morgan"
import bodyParser from "body-parser"
import teamRouter from "./src/routes/team/teamRouter.js"
import playerRouter from "./src/routes/player/playerRouter.js"
import betRouter from "./src/routes/bet/betRouter.js"
import cron from "node-cron"
import { prisma } from "./prismaConnection.js"
const app = express()
const PORT = 5004

// Middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())
app.use(morgan("dev"))

// Routers
app.use("/players", playerRouter)
app.use("/teams", teamRouter)
app.use("/bets", betRouter)

// Crons
cron.schedule("0 3 * * WED", () => {
  console.log("Deleting stats...")
  try {
    prisma.stat.deleteMany({}).catch((e) => console.error(e))
  } catch (e) {
    console.error(e)
  }
})
app.listen(PORT, () => {
  console.info(`Server running on port ${PORT}.`)
})
