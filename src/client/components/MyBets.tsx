import React from "react"
import { Box, CircularProgress, Stack, Typography } from "@mui/material"
import Bet from "./Bet"
import { BetType } from "../types/Bet"
import TotalFigures from "./TotalFigures"
import dayjs from "dayjs"
import weekday from "dayjs/plugin/weekday"
import Countdown from "react-countdown"
const MyBets = ({ bets }: { bets: BetType[] }) => {
  dayjs.extend(weekday)
  const TOTAL_WEEKS = 18
  const WEEK = 604800000
  const CURRENT_WEEK =
    Math.floor(dayjs().diff(dayjs("2023-10-31 03:00 AM")) / WEEK) + 9
  const betsWithValues = bets.map((bet) => {
    console.log({ bet })
    const currValue = parseInt(bet?.stat?.replace(/,/g, ""))
    const goal = Math.ceil(Number(bet.amount))
    const seasonProgress = (CURRENT_WEEK / TOTAL_WEEKS) * 100
    const progress = (Number(currValue) / goal) * 100

    const expectedValue = ((seasonProgress / 100) * goal).toFixed(2)
    const expectedPace = Number(expectedValue) / goal

    const betWinning = progress >= seasonProgress
    const betAlreadyWon = Number(currValue) >= goal
    return {
      ...bet,
      currValue,
      seasonProgress,
      progress,
      expectedValue,
      expectedPace,
      betWinning,
      betAlreadyWon,
    }
  })

  if (!betsWithValues) {
    return <CircularProgress />
  }

  const countdownRenderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return <Typography>Refresh to update</Typography>
    }
    return (
      <Typography textAlign={"right"}>
        {days} days, {hours} hours, {minutes} minutes, {seconds} seconds
      </Typography>
    )
  }
  return (
    <Stack spacing={2} px={2}>
      <Box
        display="flex"
        justifyContent={"space-between"}
        alignItems={"flex-end"}
      >
        <Stack>
          <Typography>
            Current Week: {CURRENT_WEEK} / {TOTAL_WEEKS}
          </Typography>
          <Typography>Code: {bets[0].code.name} </Typography>
        </Stack>
        <Stack>
          <Typography>Stats update every Wednesday at 3:00 AM EST</Typography>
          <Countdown
            date={dayjs().weekday(10).hour(3).minute(0).second(0).toDate()}
            renderer={countdownRenderer}
          />
        </Stack>
      </Box>
      {betsWithValues?.map((bet) => {
        return <Bet bet={bet} />
      })}
      <TotalFigures bets={betsWithValues} />
    </Stack>
  )
}

export default MyBets
