import axios from "axios"
import errorHandler from "../../../utils/errorHandler.js"
import { prisma } from "../../../../prismaConnection.js"

const searchPlayers = async (req, res) => {
  try {
    const { search, teamId } = req.query
    let players = []
    players = await prisma.player.findMany({
      where: {
        name: {
          contains: search,
        },
      },
    })
    if (players.length === 0) {
      const options = {
        method: "GET",
        url: "https://api-american-football.p.rapidapi.com/players",
        params: { search, team: teamId, season: "2023" },
        headers: {
          "X-RapidAPI-Key":
            "46f0fdf551msh9094c4f085a134ep184946jsn689833af3b3e",
          "X-RapidAPI-Host": "api-american-football.p.rapidapi.com",
        },
      }

      players = await axios.request(options).then((res) => res.data.response)

      if (players.length > 0) {
        await Promise.all(
          players.map(async (player) => {
            if (player?.id && player?.name) {
              await prisma.player.create({
                data: {
                  apiId: player.id,
                  apiImage: player.image,
                  name: player.name,
                },
              })
            }
          })
        )
        players = await prisma.player.findMany({
          where: {
            name: {
              contains: search,
            },
          },
        })
      }
    }
    return res.json({
      message: "Successfully searched players",
      data: players,
    })
  } catch (err) {
    return errorHandler(res, err, "Error fetching chat counts")
  }
}

export default searchPlayers
