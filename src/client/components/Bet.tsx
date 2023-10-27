import { Box, LinearProgress, Stack, Typography } from "@mui/material"
import React from "react"
import { BetType } from "../types/Bet"

const Bet = ({ bet }: { bet: BetType }) => {
  console.log(bet)
  const currValue = bet?.stats?.[0]?.teams?.[0]?.groups
    ?.find((group) => {
      return (
        group.name.toLocaleUpperCase() === bet.BetType.category.toLocaleString()
      )
    })
    ?.statistics?.find(
      (stat) => stat.name === bet.BetType.name.toLowerCase()
    )?.value

  const progress = (Number(currValue) / Number(bet.amount)) * 100
  return (
    <Box display="flex" border="1px solid black" borderRadius={4} px={2}>
      <img
        alt={`${bet.Player.id}-${bet.Player.name}`}
        width={100}
        src={bet.Player.apiImage}
      />
      <Stack>
        <Typography>{bet?.Player?.name}</Typography>
        <Typography>
          {bet?.overUnder === "over" ? "Over" : "Under"} {bet?.amount}{" "}
          {bet?.BetType?.name}
        </Typography>
        <Typography>
          ${bet?.risk} to win ${bet?.win}
        </Typography>
      </Stack>
      <Box
        display="flex"
        flex={1}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{ width: "100%", height: 10 }}
        />
      </Box>
      <Typography textAlign={"right"}>{currValue}</Typography>
    </Box>
  )
}

export default Bet
