import express from "express"
import searchTeams from "./routes/searchTeams.js"

const teamRouter = express.Router({ mergeParams: true })

// GET
teamRouter.get("/", searchTeams)

export default teamRouter
