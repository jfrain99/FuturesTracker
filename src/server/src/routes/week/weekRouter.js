import express from "express"
import searchPlayers from "./routes/searchPlayers.js"

const weekRouter = express.Router({ mergeParams: true })

// GET
weekRouter.get("/", searchPlayers)

export default weekRouter
