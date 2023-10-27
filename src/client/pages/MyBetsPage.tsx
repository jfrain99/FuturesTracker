import { Box, Typography } from "@mui/material"
import React from "react"
import useGetBets from "../hooks/useGetBets"
import MyBets from "../components/MyBets"
import { BetType } from "../types/Bet"
const MyBetsPage = () => {
  const { data: bets } = useGetBets()
  return (
    <Box>
      <Typography>My Bets</Typography>
      {bets && <MyBets bets={bets as BetType[]} />}
    </Box>
  )
}

export default MyBetsPage
