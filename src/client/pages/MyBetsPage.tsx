import { Box, Button, Stack, TextField, Typography } from "@mui/material"
import React, { useState } from "react"
import useGetBets from "../hooks/useGetBets"
import MyBets from "../components/MyBets"
import { BetType } from "../types/Bet"
const MyBetsPage = () => {
  const [code, setCode] = useState("")
  const [enabled, setEnabled] = useState(false)
  const { data: bets } = useGetBets({ code, enabled })
  const handleCode = () => {
    setEnabled(true)
  }
  return (
    <Box>
      {!enabled && (
        <Stack>
          <Typography>Enter Code: </Typography>
          <TextField value={code} onChange={(e) => setCode(e.target.value)} />
          <Button onClick={handleCode}>Submit</Button>
        </Stack>
      )}
      {bets && enabled && <MyBets bets={bets as BetType[]} />}
    </Box>
  )
}

export default MyBetsPage
