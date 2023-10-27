import express from "express"
import searchPlayers from "./routes/searchPlayers.js"

const playerRouter = express.Router({ mergeParams: true })

// GET
playerRouter.get("/", searchPlayers)

export default playerRouter
