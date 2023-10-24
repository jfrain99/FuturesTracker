import express from "express"
import cors from "cors"
import morgan from "morgan"
import bodyParser from "body-parser"

const app = express()
const PORT = 5004

// Middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())
app.use(morgan("dev"))

// Routers
app.listen(PORT, () => {
  console.info(`Server running on port ${PORT}.`)
})
