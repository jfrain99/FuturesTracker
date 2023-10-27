import React from "react"
import { Stack } from "@mui/material"
import Bet from "./Bet"
import { BetType } from "../types/Bet"

const MyBets = ({ bets }: { bets: BetType[] }) => {
  return (
    <Stack spacing={2}>
      {bets?.map((bet) => {
        return <Bet bet={bet} />
      })}
    </Stack>
  )
}

export default MyBets
