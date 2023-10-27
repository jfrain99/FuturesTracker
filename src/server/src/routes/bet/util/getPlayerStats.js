import axios from "axios"
import errorHandler from "../../../utils/errorHandler.js"

const getPlayerStats = async (req, res, bets) => {
  try {
    console.log("Get Stats", { bets })
    const betsWithStats = await Promise.all(
      bets.map(async (bet) => {
        console.log({ bet })
        const options = {
          method: "GET",
          url: "https://api-american-football.p.rapidapi.com/players/statistics",
          params: {
            id: bet.Player.apiId,
            team: bet.Team.apiId,
            season: "2023",
          },
          headers: {
            "X-RapidAPI-Key":
              "46f0fdf551msh9094c4f085a134ep184946jsn689833af3b3e",
            "X-RapidAPI-Host": "api-american-football.p.rapidapi.com",
          },
        }
        const stats = await axios
          .request(options)
          .then((res) => res.data.response)
        return { ...bet, stats }
      })
    )
    return betsWithStats
  } catch (err) {
    return errorHandler(res, err, "Error fetching chat counts")
  }
}

export default getPlayerStats
