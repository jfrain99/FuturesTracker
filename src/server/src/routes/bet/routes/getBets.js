import errorHandler from "../../../utils/errorHandler.js"
import { prisma } from "../../../../prismaConnection.js"
import getPlayerStats from "../util/getPlayerStats.js"

const getBets = async (req, res) => {
  try {
    const bets = await prisma.bet.findMany({
      include: {
        Team: true,
        Player: true,
        BetType: true,
      },
    })
    const betWithStats = await getPlayerStats(req, res, bets)
    console.log({ betWithStats })
    return res.json({
      message: "Successfully got bet",
      data: betWithStats,
    })
  } catch (err) {
    return errorHandler(res, err, "Error fetching chat counts")
  }
}

export default getBets
