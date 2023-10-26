import axios from "axios"
import errorHandler from "../../../utils/errorHandler.js"
import { prisma } from "../../../../prismaConnection.js"

const searchTeams = async (req, res) => {
  try {
    const { search } = req.query
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
          "X-RapidAPI-Key":
            "46f0fdf551msh9094c4f085a134ep184946jsn689833af3b3e",
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
          },
        })
      }
    }
    return res.json({
      message: "Successfully searched teams",
      data: teams.filter((team) => team.id < 35),
    })
  } catch (err) {
    return errorHandler(res, err, "Error fetching chat counts")
  }
}

export default searchTeams
