import errorHandler from "../../../utils/errorHandler.js"
import { prisma } from "../../../../prismaConnection.js"

const createBet = async (req, res) => {
  try {
    const { stat: _stat, ...rest } = req.body
    const bet = await prisma.bet.create({
      data: {
        typeId: req.body.stat.id,
        ...rest,
      },
    })
    return res.json({
      message: "Successfully created bet",
      data: bet,
    })
  } catch (err) {
    return errorHandler(res, err, "Error fetching chat counts")
  }
}

export default createBet
