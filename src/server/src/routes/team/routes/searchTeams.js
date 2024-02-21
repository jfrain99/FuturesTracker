import axios from "axios"
import errorHandler from "../../../utils/errorHandler.js"
import { prisma } from "../../../../prismaConnection.js"

const searchTeams = async (req, res) => {
  try {
    const { search } = req.query
    const apiKey = process.env.API_KEY
    if (search === "") {
      return res.json({
        message: "Successfully searched teams",
        data: [],
      })
    }
    let teams = []
    teams = await prisma.team.findMany({
      where: {
        name: {
          contains: search,
        },
      },
    })
    if (teams.length === 0) {
      const options = {
        method: "GET",
        url: "https://api-american-football.p.rapidapi.com/teams",
        params: { search },
        headers: {
          "X-RapidAPI-Key": apiKey,
          "X-RapidAPI-Host": "api-american-football.p.rapidapi.com",
        },
      }

      teams = await axios.request(options).then((res) => res.data.response)

      if (teams.length > 0) {
        await Promise.all(
          teams.map(async (team) => {
            if (team?.id && team?.name && team?.id < 35) {
              await prisma.team.create({
                data: {
                  apiId: team.id,
                  apiImage: team.logo,
                  name: team.name,
                },
              })
            }
          })
        )
        teams = await prisma.team.findMany({
          where: {
            name: {
              contains: search,
            },
            id: {
              lt: 35,
            },
          },
        })
      }
    }
    return res.json({
      message: "Successfully searched teams",
      data: teams,
    })
  } catch (err) {
    return errorHandler(res, err, "Error fetching chat counts")
  }
}

export default searchTeams
