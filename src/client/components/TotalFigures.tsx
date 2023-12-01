import React from "react"
import { Box, Stack, Typography } from "@mui/material"
import { BetType } from "../types/Bet"
import { sum } from "lodash"
const TotalFigures = ({ bets }: { bets: BetType[] }) => {
  const ifSeasonEnded = sum(
    bets?.map((bet) => {
      return bet.betAlreadyWon ? Number(bet.win) : -1 * Number(bet.risk)
    })
  )
  const atThisPace = sum(
    bets?.map((bet) => {
      return bet.betWinning ? Number(bet.win) : -1 * Number(bet.risk)
    })
  )
  return (
    <Box
      display="flex"
      flexDirection={"column"}
      justifyContent={"center"}
      width="100%"
    >
      <Typography variant="h4" textAlign={"center"}>
        Totals
      </Typography>
      <Stack>
        <Box display="flex" gap={1}>
          <Typography>If Season Ended Today: </Typography>
          <Typography>{ifSeasonEnded}</Typography>
        </Box>
        <Box display="flex" gap={1}>
          <Typography>At This Pace: </Typography>
          <Typography>{atThisPace}</Typography>
        </Box>
      </Stack>
    </Box>
  )
}

export default TotalFigures
